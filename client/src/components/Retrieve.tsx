import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    contractAddress: string;
    contractABI: any;
    nftAddress: string;
}

const Retrieve: React.FC<Props> = ({ contractAddress, contractABI, nftAddress }) => {
    const [tokenId, setTokenId] = useState<string>('');

    const retrieveToken = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            try {
                await contract.withdrawCollateral(nftAddress, tokenId);
                alert('NFT retrieved successfully!');
            } catch (error) {
                console.error("Error retrieving NFT:", error);
                alert('Error retrieving NFT.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Retrieve NFT</h2>
            <form className="form-inline">
                <div className="form-group mb-2">
                    <label htmlFor="tokenId" className="sr-only">Token ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tokenId"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        placeholder="Enter Token ID"
                    />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={retrieveToken}>Retrieve</button>
            </form>
        </div>
    );
};

export default Retrieve;
