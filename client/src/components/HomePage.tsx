import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="container mt-5">
            <div className="jumbotron text-center">
                <h1 className="display-4">Welcome to the NFT Lending Platform</h1>
                <p className="lead">This platform allows users to use their NFTs as collateral to secure loans.</p>
                <hr className="my-4" />
                <p>You can deposit your NFTs, manage loans, calculate interest, and retrieve your assets through our easy-to-use interface. Navigate using the menu above to access different functionalities.</p>
                <a className="btn btn-primary btn-lg" href="/deposit" role="button">Get Started</a>
            </div>
        </div>
    );
};

export default HomePage;
