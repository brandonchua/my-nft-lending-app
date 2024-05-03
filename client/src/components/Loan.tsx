import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    contractAddress: string;
    contractABI: any;
}

const Loan: React.FC<Props> = ({ contractAddress, contractABI }) => {
    const [borrower, setBorrower] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const issueLoan = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            try {
                await contract.issueLoan(borrower, ethers.utils.parseEther(amount));
                alert('Loan issued successfully!');
            } catch (error) {
                console.error("Error issuing loan:", error);
                alert('Error issuing loan.');
            }
        }
    };

    return (
        <div>
            <h2>Issue Loan</h2>
            <input 
                value={borrower}
                onChange={(e) => setBorrower(e.target.value)}
                placeholder="Enter Borrower Address"
            />
            <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount (ETH)"
            />
            <button onClick={issueLoan}>Issue</button>
        </div>
    );
};

export default Loan;
