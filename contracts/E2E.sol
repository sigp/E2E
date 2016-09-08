/*    E2E Contract
  *  Written by Age
  *
  * This is a simple contract designed to announce simple messages on the Ethereum blockchain.
  * It's intended function is to facilitate the transfer of encrypted messages between Ethereum addresses.
  * The encryption is down on the browser and sent through the app.
  * See https://github.com/AgeManning/E2E for further details.
  */

// Mortal Contract
contract mortal {
  address private owner;

  // For privleged functions - Destroy/Correct Contract
  modifier privleged {
    if (msg.sender != owner)
      throw;
      _
  }

  // Constructer defining owner (For correcting Bugs/Destorying the contract)
  function mortal(){
    owner = msg.sender;
  }

  // Kill function -- Clear code and return ETH to owner
  function kill() privleged {
      suicide(owner);
  }
}

// Main contract
contract E2E is mortal {

  event Message(
    address indexed _recepient,
    address indexed _sender,
    string _msg
     );

  // mapping indicating sent messages.
  // These can be watched and reset.
  mapping (address => uint64) private messages;


  // Fallback - Prevent ETH being sent
  function () { throw; }

  // Get number of messages of sender
  function balanceOf() returns (uint64) {
    return messages[msg.sender];
  }

  // Send message function
  function Send(address _recepient, string _msg){
    messages[_recepient] ++;
    Message(_recepient, msg.sender, _msg);
  }

  // Mark Read - Removes all tokens
  function MarkRead(){
    messages[msg.sender] = 0;
  }

}
