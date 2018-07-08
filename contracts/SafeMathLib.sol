pragma solidity ^0.4.24;

/**
 *  @title SafeMath
 *  @dev SafeMath library to protect against over/under flows.
 *  This implements only the trivial mathematical operations defined for fields. 
 */
library SafeMath {
  // Multiplication
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }
  // Division - We keep for consistency
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    return c;
  }
  // Subtraction
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }
  // Addition
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }

}
