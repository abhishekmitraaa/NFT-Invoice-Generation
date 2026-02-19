// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvoiceNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("InvoiceNFT", "INV") Ownable(msg.sender) {}

    function mintInvoiceNFT(
    address merchant,
    string memory invoiceNumber,
    uint256 amount,
    string memory generatorName,
    string memory billedTo,
    string memory date,
    string memory invoiceHash
) public returns (uint256) {

    uint256 tokenId = _tokenIdCounter;

    _safeMint(merchant, tokenId);

    invoices[tokenId] = InvoiceData(
        invoiceNumber,
        amount,
        generatorName,
        billedTo,
        date,
        invoiceHash
    );

    _tokenIdCounter++;
    return tokenId;
}



struct InvoiceData {
    string invoiceNumber;
    uint256 amount;
    string generatorName;
    string billedTo;
    string date;
    string invoiceHash;
}

mapping(uint256 => InvoiceData) public invoices;


}
