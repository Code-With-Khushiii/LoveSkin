require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();

// middleware
app.use(cors());
app.use(express.json()); // allows JSON body

// routes middleware
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("LoveSkin Backend Running 🚀");
});

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `✅ Server running on port ${process.env.PORT || 4000}`
      );
    });
  })
  .catch((error) => {
    console.log("❌ MongoDB connection error:", error.message);
  });
