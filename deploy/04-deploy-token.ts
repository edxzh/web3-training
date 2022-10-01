import { DeployFunction } from "hardhat-deploy/types";
import verify from "../utils/verify";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    networkConfig,
    developmentChains,
    INITIAL_SUPPLY,
} from "../helper-hardhat-config";

const deployToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    // const chainId = network.config.chainId;
    const token = await deploy("token", {
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmation || 1,
    });

    log(`Token is deployed at ${token.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(token.address, [INITIAL_SUPPLY]);
    }
};

export default deployToken;
deployToken.tags = ["all", "token"];
