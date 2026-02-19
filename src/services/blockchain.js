import { ethers } from "ethers";
import "dotenv/config";
import InvoiceNFTAbi from "../contracts/InvoiceNFT.js";

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC);

const wallet = new ethers.Wallet(
  process.env.MERCHANT_PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  InvoiceNFTAbi,
  wallet
);

// 🔥 IMPORTANT: now we pass (invoice, invoiceHash)
export async function mintInvoiceNFT(invoice, invoiceHash) {
  const merchantAddress = await wallet.getAddress();

  // ✅ Call new contract function with full invoice data
  const tx = await contract.mintInvoiceNFT(
    merchantAddress,
    invoice.invoiceId,
    invoice.amount,
    invoice.generatorName,
    invoice.billedTo,
    invoice.date,
    invoiceHash
  );

  const receipt = await tx.wait();

  // ✅ get tokenId from return value (ethers v6 safe method)
  const result = await provider.call({
    to: process.env.CONTRACT_ADDRESS,
    data: tx.data,
  });

  const [tokenId] = contract.interface.decodeFunctionResult(
    "mintInvoiceNFT",
    result
  );

  return {
    tokenId: tokenId.toString(),
    txHash: receipt.hash,
  };
}
