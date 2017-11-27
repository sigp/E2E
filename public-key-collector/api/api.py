# E2E - Ethereum Address to Public Key API

from flask import Flask, g
from flask_restful import Resource, Api  # , fields, reqparse
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo import MongoClient
import re
import json

app = Flask(__name__)
api = Api(app)

# Apply Limits
limiter = Limiter(app, key_func=get_remote_address, default_limits=["100 per day", "1 per second"])
limiter = Limiter(app, default_limits=["1000 per day"])


def connect_db():
    """
    Connects to the mongo db database
    """
    db = MongoClient('mongodb', 27017)
    return db

def get_db():
    """
    Opens a new database connection if one currently
    doesn't exist. Otherwise return the current database connection.
    """
    if not hasattr(g,'db'):
        g.db = connect_db()
    return g.db

@app.teardown_appcontext
def close_db(error):
    """
    Closes the database at the end of the app context
    """
    if hasattr(g,'db'):
        g.db.close()

def clean_address(address):
    """
    Remove the 0x from the address, if it exists
    """
    if len(address) == 42:
        return address[2:]
    return address


def validate_address(value):
    """
    Simple Ethereum address validation.
    We don't bother with the check sums
    """
    hexPattern = '[0-9a-fA-F]{40}'
    if len(value) in [40, 42]:
        if re.search(r"[0-9a-fA-F]{40}", value):
            return "0x"+value
    return None

class EthAddress(Resource):
    """
    The main class to handle ethereum address requests
    """
    def get(self, address):
        if validate_address(address) is None:
            return '{Result: Incorrect Address Format}'

        db = get_db()
        address = clean_address(address)
        try:
            value = db.e2e.keys.find_one({'address': '0x' + address})
        except Exception as e:
            return '{Result: Not Found}'
        if(value is None):
            return "{}"
        return json.dumps({'address': value['address'], 'pubkey': value['pubKey']})


# Set up parser for validation
#parser = reqparse.RequestParser()
#parser.add_argument('address', required=True, type=address, help="Address cannot be blank!")


api.add_resource(EthAddress, '/address/<string:address>')

if __name__ == "__main__":
    app.run(host='0.0.0.0')
