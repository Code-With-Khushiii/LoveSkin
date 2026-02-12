const razorpay = require("../utils/razorpay");

const createPayment = async (req, res) => {
  try {
    const { totalAmount } = req.body;

    const options = {
      amount: totalAmount * 100, // convert to paise
      currency: "USD",
      receipt: "order_receipt",
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPayment };
