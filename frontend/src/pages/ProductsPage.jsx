import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("all");

  // ✅ Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);

        // ✅ Extract unique category names (case-insensitive)
        const uniqueCategories = [
          "all",
          ...new Set(res.data.map((p) => p.category.toLowerCase())),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter logic (case-insensitive)
  const filteredProducts =
    selected === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === selected.toLowerCase()
        );

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Products</h2>

      {/* ✅ Category Dropdown */}
      <div className="d-flex align-items-center mb-4">
        <label className="me-2 fw-semibold">Filter by Category:</label>
        <select
          className="form-select w-auto"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Product Grid */}
      <div className="row g-4">
        {filteredProducts.map((p) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* ✅ Empty State */}
      {filteredProducts.length === 0 && (
        <p className="text-muted mt-4">No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductsPage;
