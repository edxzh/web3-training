import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const RINKBY_RPC_URL = process.env.RINKBY_RPC_URL;
const PRIVATE_KEY = process.env.RINKBY_RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        rinkby: {
            url: RINKBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
};

export default config;
