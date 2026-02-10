const InvoiceNFTAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "merchant", "type": "address" },
      { "internalType": "string", "name": "invoiceHash", "type": "string" }
    ],
    "name": "mintInvoiceNFT",
    "outputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default InvoiceNFTAbi;
