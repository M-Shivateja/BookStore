import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

//configure env
dotenv.config({ path: "./backend/.env" });
console.log("Environment variables loaded");
console.log("BRAINTREE_PUBLIC_KEY:", process.env.BRAINTREE_PUBLIC_KEY);
console.log("BRAINTREE_MERCHANT_ID:", process.env.BRAINTREE_MERCHANT_ID);

//databse config
console.log("Connecting to database...");
connectDB();

//rest object
const app = express();

//middelwares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on mode on port ${PORT}`.bgCyan.white);
});
