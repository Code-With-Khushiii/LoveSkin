const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    paymentStatus: {
      type: String,
      default: "Paid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
