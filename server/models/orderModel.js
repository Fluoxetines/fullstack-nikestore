import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    shippingAddress: { type: String },
    orderID: { type: Number },
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
