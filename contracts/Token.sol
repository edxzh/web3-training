// contracts/Token.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("EdwardToken", "ED") {
        _mint(msg.sender, initialSupply);
    }
}
