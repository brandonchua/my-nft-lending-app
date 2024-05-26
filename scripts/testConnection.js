require('dotenv').config();
const { ethers } = require("ethers");

const INFURA_PROJECT_ID = process.env.LINEA_PROJECT_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log("Infura Project ID:", INFURA_PROJECT_ID);
console.log("Private Key Length:", PRIVATE_KEY.length);

const provider = new ethers.providers.JsonRpcProvider(`https://linea-mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);

async function testConnection() {
    try {
        const network = await provider.getNetwork();
        console.log("Connected to network:", network);
    } catch (error) {
        console.error("Error connecting to network:", error);
    }
}

testConnection();
