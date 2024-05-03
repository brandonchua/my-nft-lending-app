import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import dotenv from 'dotenv';

dotenv.config();

const { LINEA_PROJECT_ID, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    linea: {
      url: `https://linea-mainnet.infura.io/v3/${LINEA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 59144, // Correct chain ID for Linea mainnet
    },
  },
};

export default config;
