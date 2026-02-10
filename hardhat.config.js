import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: process.env.TESTNET_RPC,
      accounts: [process.env.MERCHANT_PRIVATE_KEY],
    },
  },
};
