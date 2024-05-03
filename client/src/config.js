import { ethers } from 'ethers';

const infuraProjectId = '9f7ab2f359444a568460d792d1cdd3ec';
export const provider = new ethers.providers.JsonRpcProvider(`https://linea-mainnet.infura.io/v3/${infuraProjectId}`);

