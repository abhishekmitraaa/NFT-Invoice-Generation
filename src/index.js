import express from "express";
import cors from "cors";
import invoiceRoutes from "./routes/invoice.js";
import { connectDB } from "./db/mongo.js";


const app = express();

app.use(cors());
app.use(express.json());

// register invoice API
app.use("/api", invoiceRoutes);

const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
