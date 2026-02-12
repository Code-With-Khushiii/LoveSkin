const express = require("express");
const { createPayment } = require("../controllers/paymentController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.post("/", createPayment);

module.exports = router;
