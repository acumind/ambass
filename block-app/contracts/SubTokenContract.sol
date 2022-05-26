//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubTokenContract is ERC20, Ownable {
    uint256 maxSubTokenSupply;
    address subTokenOwnerAddress;
    address payable[] tokenHolders;
    string token_name;
    string token_ticker;

    constructor(
        string memory _token_name,
        string memory _token_ticker,
        uint256 _maxSupply,
        address _owner_address
    ) ERC20(_token_name, _token_ticker) {
        token_name = _token_name;
        token_ticker = _token_ticker;
        maxSubTokenSupply = _maxSupply;
        subTokenOwnerAddress = _owner_address;

        console.log(
            "[contract] SubTokenContract Contract Creation: %s [%s]",
            token_name,
            token_ticker
        );
    }

    function mintSubToken(address joinerAddress, uint256 amount) public {
        uint256 amountWithDecimals = amount * 10**18;

        _mint(joinerAddress, amountWithDecimals);

        tokenHolders.push(payable(joinerAddress));
    }

    function distributeTokens() public {
        uint256 balance = address(this).balance;
        uint256 perUserAmount = balance / tokenHolders.length;
        for (uint256 i = 0; i < tokenHolders.length; i++) {
            tokenHolders[i].transfer(perUserAmount);
        }
    }

    function airdropTokens() public {
        uint256 balance = (10 * address(this).balance) / 100;
        uint256 perUserAmount = balance / tokenHolders.length;
        for (uint256 i = 0; i < tokenHolders.length; i++) {
            tokenHolders[i].transfer(perUserAmount);
        }
    }

    // function getSubTokenDetail(address joiner)
    //     public
    //     view
    //     returns (
    //         string memory,
    //         string memory,
    //         uint256,
    //         uint256,
    //         address[] memory
    //     )
    // {
    //     return (
    //         token_name,
    //         token_ticker,
    //         maxSubTokenSupply,
    //         balanceOf(joiner),
    //         tokenHolders
    //     );
    // }

    receive() external payable {}

    fallback() external payable {}
}
