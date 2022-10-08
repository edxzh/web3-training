import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { INITIAL_SUPPLY } from "../helper-hardhat-config";
import { Token } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Token unit test", () => {
    let token: Token;
    let deployer: SignerWithAddress;
    let user1: SignerWithAddress;

    beforeEach(async () => {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        user1 = accounts[1];

        await deployments.fixture("Token");
        token = await ethers.getContract("Token", deployer);
    });

    it("should have correct INITIAL_SUPPLY of token", async () => {
        const totalSupply = token.totalSupply();
        expect(totalSupply).to.equal(INITIAL_SUPPLY);
    });

    it("should be able to transfer token to another account", async () => {
        const tokensToSend = ethers.utils.parseEther("10");
        await token.transfer(user1.address, tokensToSend);

        expect(token.balanceOf(user1.address)).to.equal(tokensToSend);
    });

    it("should approve other address to spend token", async () => {
        const tokenToSpend = ethers.utils.parseEther("10");
        await token.approve(user1.address, tokenToSpend);
        const token1 = await ethers.getContract("token", user1);
        await token1.transferFrom(
            deployer.address,
            user1.address,
            tokenToSpend
        );

        expect(await token.balanceOf(user1.address)).to.equal(tokenToSpend);
    });
});
