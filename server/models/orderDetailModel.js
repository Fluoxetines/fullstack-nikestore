import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  orderID: { type: Number },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  quantity: { type: Number },
  price: { type: Number },
});

const orderDetail = mongoose.model("OrderDetail", orderDetailSchema);
export default orderDetail;
