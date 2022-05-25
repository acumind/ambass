//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AMBContract is ERC20 {
    uint256 public constant tokenPrice = 0.001 ether;
    uint256 public constant maxTotalSupply = 10000 * 10**18;

    mapping(uint256 => bool) public tokenIdsClaimed;
    mapping(string => address) public subTokens;
    string[] subTokenTickers;

    constructor(string memory name, string memory ticker) ERC20(name, ticker) {
        console.log("AMB Contract Creation: %s [%s]", name, ticker);
    }

    function mint(uint256 amount) public payable {
        uint256 _requiredAmount = tokenPrice * amount;
        require(msg.value >= _requiredAmount, "Insufficient Fund");
        uint256 amountWithDecimals = amount * 10**18;
        require(
            (totalSupply() + amountWithDecimals) <= maxTotalSupply,
            "Exceeds AMB Token Supply"
        );

        _mint(msg.sender, amountWithDecimals);
    }

    receive() external payable {}

    fallback() external payable {}

    function createSubToken(
        string memory stoken_name,
        string memory stoken_ticker,
        uint256 maxSupply,
        address owner_address
    ) public returns (address) {
        SubTokenContract subTokenContract = new SubTokenContract(
            stoken_name,
            stoken_ticker,
            maxSupply,
            owner_address
        );

        subTokenTickers.push(stoken_ticker);
        subTokens[stoken_ticker] = address(subTokenContract);
        return address(subTokenContract);
    }

    function getSubTokens() public view returns (string[] memory) {
        return subTokenTickers;
    }

    function getAmbContractAddress() public view returns (address) {
        return address(this);
    }
}

contract SubTokenContract is ERC20, Ownable {
    uint256 maxSubTokenSupply;
    address subTokenOwnerAddress;

    constructor(
        string memory name,
        string memory ticker,
        uint256 maxSupply,
        address owner_address
    ) ERC20(name, ticker) {
        maxSubTokenSupply = maxSupply;
        subTokenOwnerAddress = owner_address;

        console.log(
            "SubTokenContract Contract Creation: %s [%s]",
            name,
            ticker
        );
    }

    receive() external payable {}

    fallback() external payable {}
}
