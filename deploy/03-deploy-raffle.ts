import {
    raffleNetworkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import verify from "../utils/verify";

const FUND_AMOUNT = "1000000000000000000000";

const deployRaffle: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network, ethers } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const chainId = network.config.chainId;
    // const chainId = 31337;
    let vrfCoordinatorV2Address, subscriptionId;

    if (chainId === 31337) {
        // create VRFV2 Subscription
        const vrfCoordinatorV2Mock = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        );
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
        const transactionResponse =
            await vrfCoordinatorV2Mock.createSubscription();
        const transactionReceipt = await transactionResponse.wait();
        subscriptionId = transactionReceipt.events[0].args.subId;
        // Fund the subscription
        // Our mock makes it so we don't actually have to worry about sending fund
        await vrfCoordinatorV2Mock.fundSubscription(
            subscriptionId,
            FUND_AMOUNT
        );
    } else {
        vrfCoordinatorV2Address =
            raffleNetworkConfig[network.config.chainId!]["vrfCoordinatorV2"];
        subscriptionId =
            raffleNetworkConfig[network.config.chainId!]["subscriptionId"];
    }
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("----------------------------------------------------");
    const args: any[] = [
        vrfCoordinatorV2Address,
        subscriptionId,
        raffleNetworkConfig[network.config.chainId!]["gasLane"],
        raffleNetworkConfig[network.config.chainId!]["keepersUpdateInterval"],
        raffleNetworkConfig[network.config.chainId!]["raffleEntranceFee"],
        raffleNetworkConfig[network.config.chainId!]["callbackGasLimit"],
    ];
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying...");
        await verify(raffle.address, args);
    }

    log("Run Price Feed contract with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run scripts/enterRaffle.js --network ${networkName}`);
    log("----------------------------------------------------");
};

export default deployRaffle;
deployRaffle.tags = ["all", "raffle"];
