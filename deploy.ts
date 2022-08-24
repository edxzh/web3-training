import ethers from "ethers";
import * as fs from "fs-extra";
import "dotenv/config";

const main = async () => {
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    );
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    );
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying, please wait");
    const contract = await contractFactory.deploy();
    const deploymentReceipt = await contract.deployTransaction.wait();
    console.log(`Contract deployed to ${contract.address}`);

    let currentFavoriteNumber = await contract.retrieve();
    console.log(`current favorite number is`, currentFavoriteNumber);
    console.log("updating favorite number");
    let transactionResponse = await contract.store("7");
    let transactionReiceipt = transactionResponse.wait();
    currentFavoriteNumber = await contract.retrieve();
    console.log("new favorite number is", currentFavoriteNumber);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
