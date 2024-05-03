import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    contractAddress: string;
    contractABI: any;
}

const Interest: React.FC<Props> = ({ contractAddress, contractABI }) => {
    const [borrower, setBorrower] = useState<string>('');
    const [interest, setInterest] = useState<string>('');

    const calculateInterest = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            try {
                const result = await contract.calculateInterest(borrower);
                setInterest(ethers.utils.formatEther(result));
            } catch (error) {
                console.error("Error calculating interest:", error);
                alert('Error calculating interest.');
            }
        }
    };

    return (
        <div>
            <h2>Calculate Interest</h2>
            <input 
                value={borrower}
                onChange={(e) => setBorrower(e.target.value)}
                placeholder="Enter Borrower Address"
            />
            <button onClick={calculateInterest}>Calculate</button>
            {interest && <p>Interest Due: {interest} ETH</p>}
        </div>
    );
};

export default Interest;
