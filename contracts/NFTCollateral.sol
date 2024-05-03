// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTCollateral is ERC721Holder, ReentrancyGuard {
    mapping(uint256 => address) public collateralOwner;
    mapping(address => mapping(uint256 => bool)) public isDeposited;

    function depositCollateral(address nftAddress, uint256 tokenId) external nonReentrant {
        require(!isDeposited[nftAddress][tokenId], "NFT already deposited");

        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        collateralOwner[tokenId] = msg.sender;
        isDeposited[nftAddress][tokenId] = true;
    }

    function withdrawCollateral(address nftAddress, uint256 tokenId) external nonReentrant {
        require(isDeposited[nftAddress][tokenId], "NFT not deposited");
        require(msg.sender == collateralOwner[tokenId], "Not the owner of the token");

        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        delete collateralOwner[tokenId];
        isDeposited[nftAddress][tokenId] = false;
    }
}
