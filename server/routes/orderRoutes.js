import express from "express";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  const order = await Order.find({});
  res.send(order);
});

orderRouter.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found !" });
  }
});

orderRouter.post("/placeorders", async (req, res) => {
  const { shippingAddress, phone, name, totalPrice, cartItems } = req.body;

  try {
    const newOrder = new Order({
      name: name,
      phone: phone,
      shippingAddress: shippingAddress,
      orderItems: cartItems,
      orderAmount: totalPrice,
    });

    const saveOrder = newOrder.save();
    res.status(200).send(saveOrder);
  } catch (err) {
    return res.status(400).json({ message: "Order Placed Failed !" });
  }
});

orderRouter.put("/:id", async (req, res) => {
  const orderID = req.params.id;
  const order = await Order.findById(orderID);
  if (order) {
    order.name = req.body.name;
    order.phone = req.body.phone;
    order.shippingAddress = req.body.shippingAddress;
    await order.save();
    res.send({ message: "order updated" });
  } else {
    res.status(404).send({ message: "order not found" });
  }
});

orderRouter.delete("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.remove();
    res.send({ message: "order deleted" });
  } else {
    res.status(404).send({ message: "order not found" });
  }
});

export default orderRouter;
