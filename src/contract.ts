import ethers from "ethers";
import * as fs from "fs";
import "dotenv/config";

let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const abi = fs.readFileSync(
    "./contracts_SimpleStorage_sol_SimpleStorage.abi",
    "utf8"
);
const address = "0x2DeD62713bc9B9C815C0A62C84175d54f95508a1";
const contract = new ethers.Contract(address, abi, wallet);

let currentFavoriteNumber = await contract.retrieve();

console.log("currentFavoriteNumber is", currentFavoriteNumber);
