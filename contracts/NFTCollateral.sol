// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTCollateral is ERC721Holder, ReentrancyGuard {
    mapping(uint256 => address) public collateralOwner;

    function depositCollateral(address nftAddress, uint256 tokenId) external {
        IERC721(nftAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        collateralOwner[tokenId] = msg.sender;
    }

    function withdrawCollateral(address nftAddress, uint256 tokenId) external {
        require(msg.sender == collateralOwner[tokenId], "Not the owner of the token");
        IERC721(nftAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        delete collateralOwner[tokenId];
    }
}
