import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { provider } from '../config';

interface Props {
    contractAddress: string;
    contractABI: any;
}

const Interest: React.FC<Props> = ({ contractAddress, contractABI }) => {
    const [borrower, setBorrower] = useState<string>('');
    const [interest, setInterest] = useState<string>('');
    const [signer, setSigner] = useState<ethers.Signer | null>(null);

    useEffect(() => {
        const checkProvider = async () => {
            try {
                const blockNumber = await provider.getBlockNumber();
                console.log("Connected to Infura, current block number:", blockNumber);
            } catch (error) {
                console.error("Error connecting to Infura:", error);
            }
        };
        checkProvider();
    }, []);

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

    const calculateInterest = async () => {
        if (signer) {
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            try {
                const result = await contract.calculateInterest(borrower);
                setInterest(ethers.utils.formatEther(result));
            } catch (error) {
                console.error("Error calculating interest:", error);
                alert('Error calculating interest.');
            }
        } else {
            alert('Signer not initialized. Please connect to MetaMask.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Calculate Interest</h2>
            <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="borrower" className="sr-only">Borrower Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="borrower"
                        value={borrower}
                        onChange={(e) => setBorrower(e.target.value)}
                        placeholder="Enter Borrower Address"
                    />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={calculateInterest}>Calculate</button>
            </form>
            {interest && <p>Interest Due: {interest} ETH</p>}
        </div>
    );
};

export default Interest;
