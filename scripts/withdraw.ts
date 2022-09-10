import { ethers, getNamedAccounts } from "hardhat";

const main = async () => {
    const { deployer } = await getNamedAccounts();
    const fundme = await ethers.getContract("FundMe", deployer);

    console.log(`Withdrawing from fundme contract at ${fundme.address}`);
    console.log("withdrawing contract");

    const transactionResponse = await fundme.withdraw();
    await transactionResponse.wait();

    console.log("withdrawed!");
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
