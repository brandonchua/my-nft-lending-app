// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LoanContract {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public lastPaymentTime;
    uint256 public interestRate = 10; // 10% per annum

    function issueLoan(address borrower, uint256 amount) public {
        balances[borrower] += amount;
        lastPaymentTime[borrower] = block.timestamp;
    }

    function repayLoan(address borrower, uint256 amount) public {
        require(balances[borrower] >= amount, "Repay amount exceeds loan balance");
        balances[borrower] -= amount;
    }

    function calculateInterest(address borrower) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - lastPaymentTime[borrower];
        uint256 interest = (balances[borrower] * interestRate * timeElapsed) / 365 days / 100;
        return interest;
    }
}
