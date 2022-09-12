// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();
error NotEnoughETH();

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) private sAddressToAmountFunded;
    address[] private sFunders;

    address private immutable iOwner;
    uint256 private constant MINIMUM_USD = 50 * 10**18;
    AggregatorV3Interface private sPriceFeed;

    constructor(address priceFeed) {
        sPriceFeed = AggregatorV3Interface(priceFeed);
        iOwner = msg.sender;
    }

    function fund() public payable {
        if (msg.value.getConversionRate(sPriceFeed) < MINIMUM_USD)
            revert NotEnoughETH();

        sAddressToAmountFunded[msg.sender] += msg.value;
        sFunders.push(msg.sender);
    }

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        );

        return priceFeed.version();
    }

    modifier onlyOwner() {
        if (msg.sender != iOwner) revert NotOwner();
        _;
    }

    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
        address[] memory funders = sFunders;

        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            sAddressToAmountFunded[funder] = 0;
        }

        sFunders = new address[](0);
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

    function getFunder(uint256 index) public view returns (address) {
        return sFunders[index];
    }

    function getAddressToAmountFunded(address fundingAddress)
        public
        view
        returns (uint256)
    {
        return sAddressToAmountFunded[fundingAddress];
    }

    function getOwner() public view returns (address) {
        return iOwner;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return sPriceFeed;
    }
}
