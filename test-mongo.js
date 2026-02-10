import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Atlas connection OK");
    process.exit(0);
  })
  .catch(err => {
    console.error("Atlas connection FAILED");
    console.error(err.message);
    process.exit(1);
  });
