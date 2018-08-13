// The configuration details for the public key API

var pkCollector =  {
  hostname: "pk-api.sigmaprime.io",
  apiPath: "/address"
}

// returns a promise
export default function lookupPubkey(address) { 
  return fetch('https://' + pkCollector.hostname + pkCollector.apiPath + '/' + address) 
}

