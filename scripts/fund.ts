import { ethers, getNamedAccounts } from "hardhat";

const main = async () => {
    const { deployer } = await getNamedAccounts();
    const fundMe = await ethers.getContract("FundMe", deployer);

    console.log(`Got contract Fundme at ${fundMe.address}`);
    console.log("Funding contract");

    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"),
    });

    await transactionResponse.wait();
    console.log("Funded!");
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
