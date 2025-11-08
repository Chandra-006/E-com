// Handles all global cart operations using React Context API
import { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Fetch entire cart from backend
  const fetchCart = async () => {
    const res = await axios.get("http://localhost:5000/api/cart");
    setCart(res.data.items || []);
  };

  // ✅ Add a product by ID
  const addToCart = async (productId) => {
    await axios.post("http://localhost:5000/api/cart", { productId, qty: 1 });
    fetchCart();
  };

  // ✅ Remove product
  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
