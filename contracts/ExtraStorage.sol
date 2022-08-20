// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.6 <0.9.0;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 5;
    }
}
