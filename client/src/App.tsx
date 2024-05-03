import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import HomePage from './components/HomePage';
import LoanPage from './components/LoanPage';
import Deposit from './components/Deposit';
import Retrieve from './components/Retrieve';
import Interest from './components/Interest';
import loanContractABI from './abis/LoanContract.json';
import nftCollateralABI from './abis/NFTCollateral.json';
import './App.css';
import { provider } from './config';

const loanContractAddress = "0x81AeA15c93dac8790E2078EecA5d8A5Ed3A8FcC5";
const nftCollateralAddress = "0x9282464C9792Ccc84E19Ff77dE407D83a9547C86";
const nftAddress = "0xb99E5534d42500eB1d5820fBA3Bb8416cCB76396";

const App: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        }
      }
    };
    checkIfWalletIsConnected();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">NFT Lending</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/deposit">Deposit</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/retrieve">Retrieve</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/loan">Issue Loan</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/interest">Calculate Interest</Link>
                </li>
              </ul>
              <div className="d-flex">
                <div className="wallet-icon text-light" onClick={currentAccount ? disconnectWallet : connectWallet}>
                  <FontAwesomeIcon icon={faWallet} />
                  {currentAccount ? (
                    <span className="ms-2">{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span>
                  ) : (
                    <span className="ms-2">Connect Wallet</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deposit" element={<Deposit contractAddress={nftCollateralAddress} contractABI={nftCollateralABI.abi} nftAddress={nftAddress} />} />
            <Route path="/retrieve" element={<Retrieve contractAddress={nftCollateralAddress} contractABI={nftCollateralABI.abi} nftAddress={nftAddress} />} />
            <Route path="/loan" element={<LoanPage contractAddress={loanContractAddress} contractABI={loanContractABI.abi} />} />
            <Route path="/interest" element={<Interest contractAddress={loanContractAddress} contractABI={loanContractABI.abi} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
