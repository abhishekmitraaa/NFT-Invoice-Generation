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

  // Call contract (this returns tokenId)
  const tx = await contract.mintInvoiceNFT(
    merchantAddress,
    invoiceHash
  );

  const receipt = await tx.wait();

  // ethers v6: read return value from transaction
  const result = await provider.call({
    to: receipt.to,
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





