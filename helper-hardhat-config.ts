export interface networkConfigItem {
    ethUsdPriceFeed?: string;
    blockConfirmation?: number;
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    kovan: {
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
        blockConfirmation: 6,
    },
};

export const developmentChains = ["hardhat", "localhost"];
