import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {},
    // Add other networks like rinkeby or mainnet
  }
};

export default config;
