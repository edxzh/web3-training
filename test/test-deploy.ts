import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", () => {
    let simpleStorage: SimpleStorage;
    let simpleStorageFactory: SimpleStorage__factory;

    beforeEach(async () => {
        simpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory;
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async () => {
        let currentValue = await simpleStorage.retrieve();
        expect(currentValue).to.equal(0);
    });

    it("Should update when call store", async () => {
        let expectedValue = 101;
        let transactionResponse = await simpleStorage.store(expectedValue);
        transactionResponse.wait();

        let currentValue = await simpleStorage.retrieve();
        expect(currentValue).to.equal(expectedValue);
    });
});
