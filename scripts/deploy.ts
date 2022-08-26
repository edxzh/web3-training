import { ethers, run, network } from "hardhat";

const main = async () => {
    const simpleStorageFactory = ethers.getContractFactory("SimpleStorage");
    console.log("deploying contract");

    const simpleStorage = await (await simpleStorageFactory).deploy();
    await simpleStorage.deployed();

    if (network.config.chainId === 42 && process.env.EHTERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }
    console.log("Simple Storage deployed to:", simpleStorage.address);

    let currentValue = await simpleStorage.retrieve();
    console.log("Current value:", currentValue);

    console.log("Update contract");
    let transactionResponse = await simpleStorage.store(101);
    await transactionResponse.wait();

    currentValue = await simpleStorage.retrieve();
    console.log("Current value:", currentValue);
};

const verify = async (contractAddress: string, args: any[]) => {
    console.log("verifying contract");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified");
        } else {
            console.log(e);
        }
    }
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
