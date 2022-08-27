import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

export default task(
    "block-number",
    "Prints the current block number"
).setAction(async (_taskArgs, { ethers }) => {
    await ethers.provider.getBlockNumber().then((blockNumber: number) => {
        console.log(`Current block number: ${blockNumber}`);
    });
});
