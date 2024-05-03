import React, { useState } from 'react';
import { ethers } from 'ethers';

interface LoanProps {
    contractAddress: string;
    contractABI: any;
}

const LoanPage: React.FC<LoanProps> = ({ contractAddress, contractABI }) => {
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
        <div className="container mt-5">
            <h1>Loan Management</h1>
            <div>
                <h2>Issue a Loan</h2>
                <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="borrower" className="sr-only">Borrower Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="borrower"
                            value={borrower}
                            onChange={(e) => setBorrower(e.target.value)}
                            placeholder="Borrower Address"
                        />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="amount" className="sr-only">Amount (ETH)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount in ETH"
                        />
                    </div>
                    <button type="button" className="btn btn-primary mb-2" onClick={issueLoan}>Issue Loan</button>
                </form>
            </div>
        </div>
    );
};

export default LoanPage;
