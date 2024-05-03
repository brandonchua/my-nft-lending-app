import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoanPage from './components/LoanPage';
import Deposit from './components/Deposit';
import Retrieve from './components/Retrieve';
import Interest from './components/Interest';
import loanContractABI from './abis/LoanContract.json';
import nftCollateralABI from './abis/NFTCollateral.json';

import './App.css';

const loanContractAddress = "0x81AeA15c93dac8790E2078EecA5d8A5Ed3A8FcC5";
const nftCollateralAddress = "0x9282464C9792Ccc84E19Ff77dE407D83a9547C86";
const nftAddress = "0xb99E5534d42500eB1d5820fBA3Bb8416cCB76396"; // Replace with your NFT contract address

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/deposit">Deposit</Link>
            </li>
            <li>
              <Link to="/retrieve">Retrieve</Link>
            </li>
            <li>
              <Link to="/loan">Issue Loan</Link>
            </li>
            <li>
              <Link to="/interest">Calculate Interest</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/deposit" 
            element={
              <Deposit 
                contractAddress={nftCollateralAddress} 
                contractABI={nftCollateralABI.abi} 
                nftAddress={nftAddress} 
              />
            } 
          />
          <Route 
            path="/retrieve" 
            element={
              <Retrieve 
                contractAddress={nftCollateralAddress} 
                contractABI={nftCollateralABI.abi} 
                nftAddress={nftAddress} 
              />
            } 
          />
          <Route 
            path="/loan" 
            element={
              <LoanPage 
                contractAddress={loanContractAddress} 
                contractABI={loanContractABI.abi} 
              />
            } 
          />
          <Route 
            path="/interest" 
            element={
              <Interest 
                contractAddress={loanContractAddress} 
                contractABI={loanContractABI.abi} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
