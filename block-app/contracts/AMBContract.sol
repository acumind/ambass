//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SubTokenContract.sol";

contract AMBContract is ERC20 {
    // struct SubToken {
    //     string camName;
    //     string tokenName;
    //     string tokenTicker;
    //     uint256 maxSupply;
    //     uint256 ambAllocation;
    //     string campStartDate;
    //     string airDropDate;
    //     uint256 airDropAmount;
    //     bool isActive;
    //     address tokenContractAddress;
    //     address ownerAddress;
    //     mapping(address => uint256) tokenHolderBalance;
    // }

    uint256 public constant tokenPrice = 0.001 ether;
    uint256 public constant maxTotalSupply = 10000 * 10**18;

    //mapping(uint256 => bool) public tokenIdsClaimed;
    mapping(string => address) public subTokens;
    ///mapping(string => address[]) subTokensHolders;
    mapping(address => address[]) subTokenOwners;
    mapping(address => string[]) subTokenListByAddress;
    mapping(address => string[]) joinedSubTokens;
    //mapping(address => SubToken[]) public ownerSubTokenMapping;
    //mapping(string => SubToken) public tickerToSubToken;
    string[] subTokenTickers;

    constructor(string memory name, string memory ticker) ERC20(name, ticker) {
        console.log("[contract] AMB Contract Creation: %s [%s]", name, ticker);
    }

    modifier ambHolderOnly() {
        require(balanceOf(msg.sender) > 0, "NOT_AMB_TOKEN_HOLDER");
        _;
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

    function doDistro(string memory stoken_ticker) public returns (bool) {
        address payable tokenAddress = payable(subTokens[stoken_ticker]);
        SubTokenContract(tokenAddress).distributeTokens();
    }

    function doAirDrop(string memory stoken_ticker) public returns (bool) {
        address payable tokenAddress = payable(subTokens[stoken_ticker]);
        SubTokenContract(tokenAddress).airdropTokens();
    }

    function joinAndGetSubToken(
        string memory stoken_name,
        string memory stoken_ticker,
        uint256 tokenAmount,
        address joinerAddress
    ) public ambHolderOnly returns (string memory) {
        address payable tokenAddress = payable(subTokens[stoken_ticker]);
        SubTokenContract(tokenAddress).mintSubToken(joinerAddress, tokenAmount);

        //require(ownedSubTokens[joinerAddress].length == 0, "ALREADY_JOINED");
        joinedSubTokens[joinerAddress].push(stoken_ticker);
        console.log(
            "[contract] joinAndGetSubToken(): %s %s",
            stoken_ticker,
            joinerAddress
        );

        return "joined";
    }

    function getJoinedSubTokens(address joinerAddress)
        public
        view
        returns (string[] memory)
    {
        return joinedSubTokens[joinerAddress];
    }

    function createSubToken(
        string memory campaign_name,
        string memory stoken_name,
        string memory stoken_ticker,
        uint256 maxSupply,
        uint256 amb_allocation,
        string memory camp_start_date,
        string memory airdrop_date,
        uint256 airdrop_amount,
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
        subTokenOwners[owner_address].push(address(subTokenContract));
        subTokenListByAddress[owner_address].push(stoken_ticker);

        return address(subTokenContract);
    }

    function getSubTokens() public view returns (string[] memory) {
        return subTokenTickers;
    }

    function getSubTokensByAddress(address owner)
        public
        view
        returns (string[] memory)
    {
        return subTokenListByAddress[owner];
    }

    // function getSubTokenDetail(string memory ticker)
    //     public
    //     view
    //     returns (
    //         string memory campName,
    //         string memory tokenName,
    //         string memory tokenTicker,
    //         uint256 maxSupply,
    //         uint256 ambAllocaiton,
    //         string memory campDate,
    //         string memory airDropDate,
    //         uint256 airDropAmount,
    //         bool isActive
    //     )
    // {
    //     SubToken storage token = tickerToSubToken[ticker];
    //     console.log(
    //         "[contract] getTokenDetail: %s %s",
    //         ticker,
    //         tickerToSubToken[ticker].tokenTicker
    //     );
    //     return (
    //         token.camName,
    //         token.tokenName,
    //         token.tokenName,
    //         token.maxSupply,
    //         token.ambAllocation,
    //         token.campStartDate,
    //         token.airDropDate,
    //         token.airDropAmount,
    //         token.isActive
    //     );
    // }

    function getAmbContractAddress() public view returns (address) {
        return address(this);
    }
}
