import morgan from "morgan";
import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import orderDetailRouter from "./routes/orderDetailRoutes.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

app.use(morgan("start"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const port = 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(port, () => console.log("connected"));
  })
  .catch((err) => console.log("disconnected"));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/ordersdetail", orderDetailRouter);
