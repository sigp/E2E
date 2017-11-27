pragma solidity ^0.4.17;
/*   E2E Contract
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
      revert();
      _;
  }

  // Constructer defining owner (For correcting Bugs/Destorying the contract)
  function mortal() public{
    owner = msg.sender;
  }

  // Kill function -- Clear code and return ETH to owner
  function kill() privleged public {
      selfdestruct(owner);
  }
}

// Main contract
contract E2E is mortal() {

  event Message(
    address indexed _recepient,
    address indexed _sender,
    string _msg
     );

  // mapping indicating sent messages.
  // These can be watched and reset.
  mapping (address => uint256) private messages;


  // Fallback - Prevent ETH being sent
  function () public { revert(); }

  // Get number of messages of sender
  function balanceOf() view public returns (uint256) {
    return messages[msg.sender];
  }

  // Send message function
  function Send(address _recepient, string _msg) public {
    messages[_recepient] ++;
    Message(_recepient, msg.sender, _msg);
  }

  // Mark Read - Removes all tokens
  function MarkRead() public {
    messages[msg.sender] = 0;
  }

}
