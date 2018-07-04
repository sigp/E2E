pragma solidity ^0.4.24;
 /** E2E Basic Contract
  *  Author: Age
  *
  * This is a simple contract designed to announce simple messages on the
  * Ethereum blockchain. It's intended function is to facilitate the transfer
  * of encrypted messages between Ethereum addresses.
  * The encryption is performed in the browser and sent through the app.
  * See https://github.com/Sigp/E2E for further details.
  */

import "SafeMathLib.sol"; // Imports the SigP safemath library.
/**
 * @title E2E - The main contract.
 * @dev This contract behaves like an ERC20 utilizing a balanceOf which
 * represents unread messages. It simply fires an event when a message is sent.
 * No ethereum can be sent to this contracts
 */
contract E2E {
  using SafeMath for uint256;

  // ERC20 Meta-data
  string public name = "E2E Message";
  uint8 public decimals = 0;
  string public symbol = "MSG";
  string public version = "1.0";

  // We keep total supply for ERC20 compatibility
  uint256 public totalSupply = 0;

  /**
   * event Message(). This is the main event representing an encrypted message.
   */
  event Message(
    address indexed _recepient,
    address indexed _sender,
    string _msg
     );

  // mapping indicating sent messages.
  mapping (address => uint256) private messages;

  // Fallback - Prevent ETH being sent
  function () public { revert(); }

  // Implementation of the ERC20 balanceOf
  function balanceOf(address _owner) view public returns (uint256) {
    return messages[_owner];
  }

  /**
   * Send Message function. - This simply lodges an event with
   * the message information
   * @param _recipient  The address to which the message is sent
   * @param _msg        The (encrypted) message being sent
   */
  function send(address _recipient, string _msg) public {
    require(_recipient != address(0));

    messages[_recepient] = messages[_recipient].add(1);
    totalSupply = totalSupply.add(1);
    Message(_recepient, msg.sender, _msg);
  }

  /**
   * MarkRead function. Removes the token balances of the caller and reduces
   * the total token supply (total unread messages)
   */
  function MarkRead() public {
    totalSupply = totalSupply.sub(messages[msg.sender]);
    messages[msg.sender] = 0;
  }

}
