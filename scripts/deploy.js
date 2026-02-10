import hre from "hardhat";

async function main() {
  const { ethers } = hre;

  const InvoiceNFT = await ethers.getContractFactory("InvoiceNFT");
  const contract = await InvoiceNFT.deploy();

  await contract.waitForDeployment();

  console.log("InvoiceNFT deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
