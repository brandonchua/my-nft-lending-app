// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Deploy the NFTCollateral contract
    const NFTCollateral = await ethers.getContractFactory("NFTCollateral");
    const nftCollateral = await NFTCollateral.deploy();
    await nftCollateral.deployed();
    console.log("NFTCollateral deployed to:", nftCollateral.address);

    // Deploy the LoanContract contract
    const LoanContract = await ethers.getContractFactory("LoanContract");
    const loanContract = await LoanContract.deploy();
    await loanContract.deployed();
    console.log("LoanContract deployed to:", loanContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
