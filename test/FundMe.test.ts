import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
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
        deployer = accounts[0];

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

    describe("fund", () => {
        it("Fails if you don't send enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWithCustomError(
                fundMe,
                "NotEnoughETH"
            );
        });

        it("Updates the amount funded data structure", async () => {
            await fundMe.fund({ value: ethers.utils.parseEther("1") });
            const response = await fundMe.sAddressToAmountFunded(
                deployer.address
            );

            expect(response.toString()).to.equal(
                ethers.utils.parseEther("1").toString()
            );
        });

        it("Add funder to array of funders", async () => {
            await fundMe.fund({ value: ethers.utils.parseEther("1") });
            const response = await fundMe.sFunders(0);

            expect(response).to.equal(deployer.address);
        });
    });

    describe("withdraw", () => {
        beforeEach(async () => {
            await fundMe.fund({ value: ethers.utils.parseEther("1") });
        });

        it("gives a single funder all their ETH back", async () => {
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer.address
            );

            const txResponse = await fundMe.withdraw();
            const txReceipt = await txResponse.wait();
            const { gasUsed, effectiveGasPrice } = txReceipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            );
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer.address
            );

            expect(endingFundMeBalance.toString()).to.equal("0");
            expect(
                startingFundMeBalance.add(startingDeployerBalance).toString()
            ).to.equal(endingDeployerBalance.add(gasCost).toString());
        });
    });
});
