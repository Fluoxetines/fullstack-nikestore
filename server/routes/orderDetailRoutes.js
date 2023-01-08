import express from "express";
import OrderDetailModel from "../models/orderDetailModel.js";

const orderDetailRouter = express.Router();

orderDetailRouter.get("/", async (req, res) => {
  const orderDetail = await OrderDetailModel.find({});
  res.send(orderDetail);
});

orderDetailRouter.post("/", async (req, res) => {
  const { orderID, productID, quantity, price } = req.body;
  try {
    const orderDetail = new OrderDetailModel({
      orderID: orderID,
      productID: productID,
      quantity: quantity,
      price: price,
    });
    const saveOrderDetail = await orderDetail.save();
    res.status(200).send(saveOrderDetail);
  } catch (err) {
    res.status(500).send({ message: "Order Details Failed" });
  }
});

export default orderDetailRouter;
