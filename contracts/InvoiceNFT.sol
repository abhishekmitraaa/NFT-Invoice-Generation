// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvoiceNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("InvoiceNFT", "INV") Ownable(msg.sender) {}

    function mintInvoiceNFT(
        address merchant,
        string memory invoiceHash
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(merchant, tokenId);
        _tokenIdCounter++;
        return tokenId; // 🔴 THIS IS KEY
    }
}
