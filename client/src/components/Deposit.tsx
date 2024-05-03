import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    contractAddress: string;
    contractABI: any;
}

const Deposit: React.FC<Props> = ({ contractAddress, contractABI }) => {
    const [tokenId, setTokenId] = useState<string>('');

    const depositToken = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            try {
                await contract.depositCollateral(tokenId);
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
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter Token ID"
            />
            <button onClick={depositToken}>Deposit</button>
        </div>
    );
};

export default Deposit;
