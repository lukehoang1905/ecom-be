const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    status: { type: String, emum: ["pending", "paid"], default: "pending" },
    total: { type: Number, default: 0 },
  },
  { timestamp: true }
);
orderSchema.plugin(require("./plugins/isDeletedFalse"));

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
