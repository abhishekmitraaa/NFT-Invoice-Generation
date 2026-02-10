/*import { ethers } from "ethers";
import "dotenv/config";
import InvoiceNFTAbi from "../contracts/InvoiceNFT.js";


const provider = new ethers.JsonRpcProvider(
  process.env.TESTNET_RPC
);

const merchantWallet = new ethers.Wallet(
  process.env.MERCHANT_PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  InvoiceNFTAbi,
  merchantWallet
);


async function testEnvConfig() {
  // 1. Check RPC (network)
  const network = await provider.getNetwork();
  console.log("Connected network:", network.name, network.chainId);

  // 2. Check private key (wallet address)
  const address = await merchantWallet.getAddress();
  console.log("Merchant wallet address:", address);

  // 3. Check balance
  const balance = await provider.getBalance(address);
  console.log("Balance (ETH/MATIC):", ethers.formatEther(balance));
}

export async function testContractLoad() {
  console.log("Contract address:", contract.target);
}
*/

//testEnvConfig();
//testContractLoad();
import { ethers } from "ethers";
import "dotenv/config";
import InvoiceNFTAbi from "../contracts/InvoiceNFT.js";

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC);
const wallet = new ethers.Wallet(process.env.MERCHANT_PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  InvoiceNFTAbi,
  wallet
);

export async function mintInvoiceNFT(invoiceHash) {
  const merchantAddress = await wallet.getAddress();

  const tx = await contract.mintInvoiceNFT(
    merchantAddress,
    invoiceHash
  );

  const receipt = await tx.wait();

  // ERC721 Transfer event → tokenId
  const transferEvent = receipt.logs
    .map(log => {
      try { return contract.interface.parseLog(log); }
      catch { return null; }
    })
    .find(e => e && e.name === "Transfer");

  return {
    tokenId: transferEvent.args.tokenId.toString(),
    txHash: receipt.hash,
  };
}


