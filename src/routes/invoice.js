import express from "express";
import { mintInvoiceNFT } from "../services/blockchain.js";
import { hashInvoice } from "../services/hash.js";
import Invoice from "../models/Invoice.js";


const router = express.Router();

router.post("/invoice", async (req, res) => {
  try {
    const invoice = req.body;

    
    const invoiceHash = hashInvoice(invoice);

    
    const existing = await Invoice.findOne({
      $or: [
        { invoiceId: invoice.invoiceId },
        { invoiceHash }
      ]
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Invoice already minted",
        tokenId: existing.tokenId,
        txHash: existing.txHash,
      });
    }

    // 3. mint NFT
    const { tokenId, txHash } = await mintInvoiceNFT(invoice , invoiceHash);

    // 4. save to DB
    await Invoice.create({
      invoiceId: invoice.invoiceId,
      invoiceHash,
      tokenId,
      txHash,
      contractAddress: process.env.CONTRACT_ADDRESS,
    });

    // 5. respond
    res.json({
      success: true,
      invoiceHash,
      tokenId,
      txHash,
    });

  } catch (err) {
    console.error(err);

    // DB unique constraint safety net
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate invoice detected",
      });
    }

    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;
