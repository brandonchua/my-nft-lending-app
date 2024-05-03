import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    contractAddress: string;
    contractABI: any;
}

const Retrieve: React.FC<Props> = ({ contractAddress, contractABI }) => {
    const [tokenId, setTokenId] = useState<string>('');

    const retrieveToken = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            try {
                await contract.withdrawCollateral(tokenId);
                alert('NFT retrieved successfully!');
            } catch (error) {
                console.error("Error retrieving NFT:", error);
                alert('Error retrieving NFT.');
            }
        }
    };

    return (
        <div>
            <h2>Retrieve NFT</h2>
            <input 
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter Token ID"
            />
            <button onClick={retrieveToken}>Retrieve</button>
        </div>
    );
};

export default Retrieve;
