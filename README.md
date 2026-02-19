# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```


# 🧾 Invoice NFT Backend

A Web3 backend that converts invoices into NFTs on Polygon Amoy Testnet.  
Each invoice is hashed, minted as an ERC‑721 NFT, and stored with on‑chain metadata for verification and anti‑fraud purposes.

---

## 🚀 Features

- 🔐 SHA‑256 invoice hashing
- 🪙 NFT minting (ERC‑721)
- 📦 On‑chain invoice metadata storage
- 🗄️ MongoDB persistence
- 🧠 Duplicate invoice protection
- ⚡ REST API for minting invoices

---

## 🏗️ Tech Stack

- Node.js + Express
- MongoDB Atlas
- Hardhat
- Solidity (ERC‑721)
- Ethers.js v6
- Polygon Amoy Testnet

---

## 📂 Project Structure

```
src/
 ├── contracts/        # ABI files
 ├── models/           # MongoDB schema
 ├── routes/           # API routes
 ├── services/
 │     ├── blockchain.js
 │     └── hash.js
 └── index.js
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=4000
TESTNET_RPC=YOUR_RPC_URL
MERCHANT_PRIVATE_KEY=YOUR_PRIVATE_KEY
CONTRACT_ADDRESS=DEPLOYED_CONTRACT_ADDRESS
MONGO_URI=YOUR_MONGODB_URI
```

---

## 🧪 Installation

```bash
npm install
```

---

## ▶️ Run Backend

```bash
node src/index.js
```

Server runs on:

```
http://localhost:4000
```

---

## 🪙 Mint Invoice NFT

### Endpoint
```
POST /api/invoice
```

### Example Body

```json
{
  "invoiceId": "INV-001",
  "amount": 2500,
  "generatorName": "Demo Store",
  "billedTo": "Test User",
  "date": "2026-02-11"
}
```

---

## 🔗 How It Works

1. Invoice data is received via API
2. Backend generates SHA‑256 hash
3. Smart contract mints NFT with metadata
4. TokenId + TxHash stored in MongoDB
5. NFT exists permanently on Polygon

---

## 🔎 Reading NFT Data From Chain

Using Hardhat console:

```bash
npx hardhat console --network amoy
```

```js
const contract = await ethers.getContractAt(
  "InvoiceNFT",
  "CONTRACT_ADDRESS"
);

await contract.invoices(TOKEN_ID);
```

---

## 💰 Gas Design

- Full invoice JSON ❌ (expensive)
- Metadata fields + hash ✅ (current design)

---

## 🧠 Future Improvements

- QR Code verification
- Metadata via tokenURI/IPFS
- Frontend dashboard
- Signature-based invoice validation

---

---
Terminal Code

```bash

Invoke-RestMethod `
  -Uri "http://localhost:4000/api/invoice" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"invoiceId":"INV-NEW-002","amount":2500,"generatorName":"Demo Store","billedTo":"Test User","date":"2026-02-18"}' |
ConvertTo-Json -Depth 5
```
---

## 👨‍💻 Author

Abhishek Mitra
