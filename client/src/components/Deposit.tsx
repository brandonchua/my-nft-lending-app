import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    contractAddress: string;
    contractABI: any;
    nftAddress: string;
}

const Deposit: React.FC<Props> = ({ contractAddress, contractABI, nftAddress }) => {
    const [tokenId, setTokenId] = useState<string>('');
    const [tokenAddress, setTokenAddress] = useState<string>(nftAddress);

    const depositToken = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            const nftContract = new ethers.Contract(tokenAddress, [
                "function approve(address to, uint256 tokenId) public",
            ], signer);

            const collateralContract = new ethers.Contract(contractAddress, contractABI, signer);

            try {
                // Approve the collateral contract to transfer the NFT
                await nftContract.approve(contractAddress, tokenId);
                // Deposit the NFT into the collateral contract
                await collateralContract.depositCollateral(tokenAddress, tokenId);
                alert('NFT deposited successfully!');
            } catch (error) {
                console.error("Error depositing NFT:", error);
                alert('Error depositing NFT.');
            }
        }
    };

    return (
        <div>
            <h2>Deposit NFT</h2>
            <input 
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Enter Token Address"
            />
            <input 
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter Token ID"
            />
            <button onClick={depositToken}>Deposit</button>
        </div>
    );
};

export default Deposit;
