// --- Vibe Commerce Backend (MongoDB + Express + DummyJSON) --- //

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------------------------------------
// ✅ MongoDB Connection
// ------------------------------------------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/vibe-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected (Local)"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ------------------------------------------------------------
// ✅ Schema & Models
// ------------------------------------------------------------

// Product Model
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    category: String,
    image: String,
  })
);

// Cart Model
const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: Number,
    items: [
      {
        productId: Number,
        qty: Number,
      },
    ],
  })
);

// Order Model
const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId: Number,
    items: [
      {
        productId: Number,
        qty: Number,
        price: Number,
      },
    ],
    total: Number,
    name: String,
    email: String,
    timestamp: { type: Date, default: Date.now },
  })
);

// ------------------------------------------------------------
// ✅ ROUTE: GET /api/products
// Fetches and seeds products from DummyJSON if DB empty
// ------------------------------------------------------------
app.get("/api/products", async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length === 0) {
      console.log("📦 Seeding products from DummyJSON...");
      const response = await axios.get("https://dummyjson.com/products?limit=20");
      const formatted = response.data.products.map((p) => ({
        id: p.id,
        name: p.title,
        price: p.price,
        category: p.category,
        image: p.thumbnail,
      }));

      await Product.insertMany(formatted);
      products = await Product.find();
      console.log("✅ Products inserted into MongoDB");
    }

    res.json(products);
  } catch (error) {
    console.error("❌ /api/products error:", error);
    res.status(500).json({ error: "Failed to load products" });
  }
});

// ------------------------------------------------------------
// ✅ ROUTE: GET /api/cart
// Returns current user's cart with product details
// ------------------------------------------------------------
app.get("/api/cart", async (req, res) => {
  try {
    const userId = 1;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.json({ items: [] });

    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findOne({ id: item.productId });
        return {
          productId: item.productId,
          qty: item.qty,
          product: product
            ? {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image,
              }
            : null,
        };
      })
    );

    res.json({ items: detailedItems });
  } catch (error) {
    console.error("❌ /api/cart error:", error);
    res.status(500).json({ error: "Failed to load cart" });
  }
});

// ------------------------------------------------------------
// ✅ ROUTE: POST /api/cart
// Add or update items in the cart
// ------------------------------------------------------------
app.post("/api/cart", async (req, res) => {
  try {
    const userId = 1;
    const { productId, qty } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existing = cart.items.find((i) => i.productId === productId);
    if (existing) existing.qty += qty;
    else cart.items.push({ productId, qty });

    await cart.save();

    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findOne({ id: item.productId });
        return {
          productId: item.productId,
          qty: item.qty,
          product: product
            ? {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image,
              }
            : null,
        };
      })
    );

    res.json({ items: detailedItems });
  } catch (error) {
    console.error("❌ /api/cart POST error:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// ------------------------------------------------------------
// ✅ ROUTE: DELETE /api/cart/:productId
// Remove an item from the cart
// ------------------------------------------------------------
app.delete("/api/cart/:productId", async (req, res) => {
  try {
    const userId = 1;
    const productId = Number(req.params.productId);

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter((i) => i.productId !== productId);
    await cart.save();

    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findOne({ id: item.productId });
        return {
          productId: item.productId,
          qty: item.qty,
          product,
        };
      })
    );

    res.json({ items: detailedItems });
  } catch (error) {
    console.error("❌ /api/cart DELETE error:", error);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// ------------------------------------------------------------
// ✅ ROUTE: POST /api/checkout
// Save order in DB + clear cart + return receipt
// ------------------------------------------------------------
app.post("/api/checkout", async (req, res) => {
  try {
    const userId = 1;
    const { name, email } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Build order items
    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findOne({ id: item.productId });
        return {
          productId: item.productId,
          qty: item.qty,
          price: product ? product.price : 0,
        };
      })
    );

    const total = detailedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    // ✅ Save order
    const order = new Order({
      userId,
      items: detailedItems,
      total,
      name,
      email,
    });
    await order.save();

    // ✅ Clear cart
    cart.items = [];
    await cart.save();

    // ✅ Response
    res.json({
      status: "success",
      message: "Order placed successfully!",
      receipt: {
        orderId: order._id,
        name,
        email,
        total,
        timestamp: order.timestamp,
      },
    });
  } catch (error) {
    console.error("❌ Checkout error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// ------------------------------------------------------------
// ✅ ROUTE: GET /api/orders
// Optional — fetch past orders for mock user
// ------------------------------------------------------------
app.get("/api/orders", async (req, res) => {
  try {
    const userId = 1;
    const orders = await Order.find({ userId }).sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ /api/orders error:", error);
    res.status(500).json({ error: "Failed to load orders" });
  }
});

// ------------------------------------------------------------
// ✅ Start Server
// ------------------------------------------------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
