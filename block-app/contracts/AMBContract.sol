//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract AMBContract {
    constructor() {
        console.log("AMB Contract Creation");
    }

    function getAmbContractAddress() public view returns (address) {
        return address(this);
    }
}
