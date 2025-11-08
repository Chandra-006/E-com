const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/vibe-commerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected (local)");
  } catch (error) {
    console.error("❌ Mongo error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
