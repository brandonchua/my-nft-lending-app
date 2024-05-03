import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoanPage from './components/LoanPage';
import Deposit from './components/Deposit';
import Retrieve from './components/Retrieve';
import Interest from './components/Interest';

// Import the contract details
import { contractAddress as nftCollateralAddress, contractABI as nftCollateralABI } from './NFTCollateral';
import { contractAddress as loanContractAddress, contractABI as loanContractABI } from './LoanContract';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/deposit">Deposit NFT</Link></li>
            <li><Link to="/retrieve">Retrieve NFT</Link></li>
            <li><Link to="/loan">Loan Management</Link></li>
            <li><Link to="/interest">Calculate Interest</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deposit" element={<Deposit contractAddress={nftCollateralAddress} contractABI={nftCollateralABI} />} />
          <Route path="/retrieve" element={<Retrieve contractAddress={nftCollateralAddress} contractABI={nftCollateralABI} />} />
          <Route path="/loan" element={<LoanPage contractAddress={loanContractAddress} contractABI={loanContractABI} />} />
          <Route path="/interest" element={<Interest contractAddress={loanContractAddress} contractABI={loanContractABI} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
