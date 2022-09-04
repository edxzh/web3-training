// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();
error NotEnoughETH();
error WithdrawFailed();

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) private sAddressToAmountFunded;
    address[] private sFunders;

    address public immutable iOwner;
    uint256 public constant MINIMUM_USD = 50 * 10**18;
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
        for (
            uint256 funderIndex = 0;
            funderIndex < sFunders.length;
            funderIndex++
        ) {
            address funder = sFunders[funderIndex];
            sAddressToAmountFunded[funder] = 0;
        }

        sFunders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");

        if (!callSuccess) revert WithdrawFailed();
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}
