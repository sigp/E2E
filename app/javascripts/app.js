/* JS for E2E - Encrypted Ethereum Messaging App
*/

// Truffle Fake Live account
var account;
var accounts;
var e2e = E2E.deployed(); // This is our contract object. Trufle handles addresses and ABI's etc.

// Functions Implemented in Crypto.js
/*
* encryptMessage(_publicKey, _msg);
* decryptMessage(_privateKey, _cipherText);
*
*
*
*/

// Need to find public key from block chain. If none-exists, send plain text. Or Ask User for public key
function encryptMessageHandler(_recipient, _msg){
  console.log("We are encrypting things....");
  // Search of public Key
  // Ethereum Doesn't Allow Searching For Transactions. Have to use etherscan appendChild
  //var blockNumber = getTransactionBlock(_recipient);
  console.log(blockNumber);
  //var searchChain = web3.filter()



// TODO: Ask user for public key if none is found. If no, send plain text
// var publicKey =
// return encryptMessage(publicKey, _msg);

  return _msg;
}

function decryptMessageHandler(_msg){
// TODO: Ask user for private key. i.e file in keystore/

// TODO: Check its not plaintext

// var jsonInput = LoadFile("");
// var privateKey = privateFromFile(JSONInput, password);
// return decryptMessage(privateKey, _msg);

    return _msg
}

// Looks up the tokens (which are mappings from address to uint64).
// We look up for our account. (I've used "balanceOf" to be compatible with mist)
// TODO: Test this implementation with mist browser.
function refreshMessages() {
  // Get balance for this account
  e2e.balanceOf.call({from: account}).then(function(messages) {
    // Display the number of messages we have
    document.getElementById("msgs").innerHTML = messages;
    var sel = document.getElementById("msgNo")

    // Fill the selection with number of messages the user can choose to read.
    for(var i =0; i <= messages; i++){
      var opt = document.createElement('option');
      if (i == 0){
        opt.innerHTML = "All Messages";
        opt.value = i;
      }
      else{
        opt.innerHTML = "Message " + i;
        opt.value = i;
      }
      sel.appendChild(opt);
    }
  });
}

// Send a message -> Costs eth as it goes on the blockchain
function sendMessage(_recepient, _msg){
  //TODO: Validate inputs.

  // Inputs from document for simplicity
  recepient = document.getElementById("recepient").value;
  msg = document.getElementById("msg").value;
  encrypt = document.getElementById("encryptbox").value;

  if (encrypt)
  var messageE = encryptMessageHandler(recepient, msg);



  // Send the encrypted Message
  e2e.Send(_recepient, messageE, {from: account})
    .then(function(){
      console.log("sent good");
      refreshMessages();
    }).catch(function(e){
      console.log("Message not sent, error:" + e);
    });
}

// Resets the message counter. This also costs ETH as we are changing the ethereum state.
function clearMessages() {
  e2e.MarkRead({from: account})
    .then(function(){
      console.log("Cleared Messages Successfully");
      document.getElementById("msgText").innerHTML = ""; // Clear the msg UI
    }).catch(function(err){
      console.log("Couldn't clear, error:" + err);
    });
}

// Read a message for this user. Its free to run! - No state change :)
function readMessage(_msgNo) {

  _msgNo = document.getElementById("msgNo").value;
  msgText = document.getElementById("msgText");
  msgText.innerHTML = ""; // Reset the text

  if (_msgNo <= 0 || _msgNo === undefined){
    _msgNo = 0; // Just find the latest msg
  }

  /* The following filter works. However on testrpc v2.2.3 the filter doesn't hold.
  *  I've tested this with a geth private chain and logged a bug with testrpc.
  */
  // Loads a filter for all past events. i.e Find events that match our account.
  var messages = e2e.Message({_recepient: account},{fromBlock:0, toBlock: 'latest'});

  // Returns the events (logs) in the callback function
  messages.get(function(err,logs){

    // Simple logic to either get all the messages, or just one
    if (_msgNo == 0){
      // Loop through all the messages
      for (var i=0; i< logs.length; i++){
        var messageD = decryptMessageHandler(logs[i].args._msg);
        msgText.innerHTML += messageD + "<br>"
      }
    }
    else { // Just get a single message
      var messageD = decryptMessage(logs[_msgNo-1].args._msg);
      msgText.innerHTML += messageD + "<br>";
    }
  });

}

// Allow users to find their public key to send to friends
function findMyPublicKey(password){

  //var jsonInput = LoadFile("");
  var privateKey = privateFromFile(jsonInput, password);

  return privateToPublic(privateKey).toString('hex');

}



// Load accounts and setup page.
// If running a testnet, make sure rpccorsdomain is enabled.
// You will also need to create and unlock accounts to test the app
window.onload = function() {
  web3.eth.getAccounts(function(err,accs) {
    if (err != null){
      alert("Account problem!");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    // Listener for changed events
    document.getElementById('wallet-file').addEventListener('change', handleFileSelect, false);



    // List of accounts
    accounts = accs;
    account = accounts[0];
    // Log available accounts
    console.log(accs);
    document.getElementById("account").innerHTML = account;
    // Display current messages in the blockchain
    refreshMessages();
  })
}

// Read File and output PublicKey
var handleFileSelect = function(evt){

  var files = evt.target.files;
  // Assume single file
  var reader = new FileReader();
   reader.onload = function(){
     var privateKey = privateFromFile(reader.result, "test");
     var publicKey = privateToPublic(privateKey).toString('hex');
     console.log(publicKey)

   }
  // Assume single file
  reader.readAsText(files[0]);

}

function getTransactionBlock(address){
  // TODO: Validate Address
  return new Promise(function(resolve,err){
    $http.get("http://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=99999999&sort=asc")
      .then(function(result){
        resolve(parseInt(result.data.result[0].blockNumber));

      })

  })
}
