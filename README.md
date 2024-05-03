# NFT Lending Platform on Linea Mainnet

Welcome to the NFT Lending Platform! This project demonstrates how to leverage the power of Hardhat and Linea Mainnet to build a decentralized application (DApp) for issuing and managing loans using NFTs as collateral.

## Overview

Our platform allows users to:
- **Deposit NFTs**: Use NFTs as collateral for securing loans.
- **Retrieve NFTs**: Withdraw NFTs that were used as collateral.
- **Issue Loans**: Lend ETH to borrowers who have deposited NFTs.
- **Calculate Interest**: Determine the interest accrued on loans.

This project uses Hardhat for development, testing, and deployment, and is connected to the Linea Mainnet via Infura for low-cost and fast transactions.

## Features

- **Low Gas Fees**: Thanks to Linea Mainnet, transactions are extremely affordable.
- **High Speed**: Fast transaction processing ensures a smooth user experience.
- **Scalability**: Designed to handle a large number of transactions efficiently.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- npm or yarn
- Metamask extension in your browser
- Infura account with a project ID

## Setup

1. Clone the repository:
   \```shell
   git clone https://github.com/your-repo/nft-lending-platform.git
   cd nft-lending-platform
   \```

2. Install dependencies:
   \```shell
   npm install
   \```

3. Create a `.env` file and add your Infura project ID and private key:
   \```env
   INFURA_PROJECT_ID=your-infura-project-id
   PRIVATE_KEY=your-private-key
   \```

## Deploying Contracts

To deploy the contracts to the Linea Mainnet:

1. Compile the contracts:
   \```shell
   npx hardhat compile
   \```

2. Deploy the contracts:
   \```shell
   npx hardhat run scripts/deploy.js --network linea
   \```

## Running the DApp

1. Start the React application:
   \```shell
   npm start
   \```

2. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Deposit NFT

1. Connect your wallet using Metamask.
2. Navigate to the "Deposit" page.
3. Enter the NFT token address and token ID.
4. Click "Deposit" to approve and deposit your NFT as collateral.

### Retrieve NFT

1. Connect your wallet using Metamask.
2. Navigate to the "Retrieve" page.
3. Enter the NFT token address and token ID.
4. Click "Retrieve" to withdraw your NFT from collateral.

### Issue Loan

1. Connect your wallet using Metamask.
2. Navigate to the "Issue Loan" page.
3. Enter the borrower's address and the loan amount in ETH.
4. Click "Issue" to lend ETH to the borrower.

### Calculate Interest

1. Connect your wallet using Metamask.
2. Navigate to the "Calculate Interest" page.
3. Enter the borrower's address.
4. Click "Calculate" to view the accrued interest.

## Scripts

Try running some of the following tasks:

\```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network linea
\```

## Monitoring

Monitor your application's performance and usage via the Infura dashboard, where you can view metrics such as request volume, method request volumes, and activity success rates.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, bug fixes, or improvements.

## License

This project is licensed under the MIT License.

---

Thank you for checking out our NFT Lending Platform on Linea Mainnet. We hope you find it useful and inspiring for your blockchain projects!
