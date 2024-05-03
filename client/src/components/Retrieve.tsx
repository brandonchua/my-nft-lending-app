import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { provider } from '../config';

interface Props {
    contractAddress: string;
    contractABI: any;
    nftAddress: string;
}

const Retrieve: React.FC<Props> = ({ contractAddress, contractABI, nftAddress }) => {
    const [tokenAddress, setTokenAddress] = useState<string>(nftAddress);
    const [tokenId, setTokenId] = useState<string>('');
    const [signer, setSigner] = useState<ethers.Signer | null>(null);

    useEffect(() => {
        const connectToMetaMask = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                    setSigner(web3Provider.getSigner());
                } catch (error) {
                    console.error("Error connecting to MetaMask:", error);
                }
            }
        };
        connectToMetaMask();
    }, []);

    const retrieveToken = async () => {
        if (signer) {
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            try {
                await contract.withdrawCollateral(tokenAddress, tokenId);
                alert('NFT retrieved successfully!');
            } catch (error) {
                console.error("Error retrieving NFT:", error);
                alert('Error retrieving NFT.');
            }
        } else {
            alert('Signer not initialized. Please connect to MetaMask.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Retrieve NFT</h2>
            <form className="form-inline">
                <div className="form-group mb-2">
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
