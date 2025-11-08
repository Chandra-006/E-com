const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: Number,
  items: [
    {
      productId: Number,
      qty: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
