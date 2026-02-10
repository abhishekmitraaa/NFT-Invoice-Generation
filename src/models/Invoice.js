import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true, unique: true },
  invoiceHash: { type: String, required: true, unique: true },
  tokenId: { type: String, required: true },
  txHash: { type: String, required: true },
  contractAddress: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
