import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { assert } from "console";
import { ethers, network, deployments } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";
import { FundMe, MockV3Aggregator } from "../typechain-types";

describe("FundMe", () => {
    let fundMe: FundMe;
    let mockV3Aggregator: MockV3Aggregator;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
        if (!developmentChains.includes(network.name)) {
            throw "You need be on a development chain to run test!!";
        }

        const accounts = await ethers.getSigners();
        const deployer = accounts[0];

        await deployments.fixture(["all"]);

        fundMe = await ethers.getContract("FundMe");
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator");
    });

    describe("Constructor", () => {
        it("sets the aggregator address correctly", async () => {
            const response = await fundMe.sPriceFeed();
            expect(response).to.equal(mockV3Aggregator.address);
        });
    });
});
