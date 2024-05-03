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
        <div className="container mt-5">
            <h2>Deposit NFT</h2>
            <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="tokenAddress" className="sr-only">Token Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tokenAddress"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="Enter Token Address"
                    />
                </div>
                <div className="form-group mx-sm-3 mb-2">
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
                <button type="button" className="btn btn-primary mb-2" onClick={depositToken}>Deposit</button>
            </form>
        </div>
    );
};

export default Deposit;
