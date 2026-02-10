// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvoiceNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public invoiceHashes;

    constructor()
        ERC721("Invoice NFT", "INVOICE")
        Ownable(msg.sender)
    {}

    function mintInvoiceNFT(
        address merchant,
        string memory invoiceHash
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _mint(merchant, tokenId);
        invoiceHashes[tokenId] = invoiceHash;
        return tokenId;
    }
}
