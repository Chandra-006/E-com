import { useCart } from "../context/CartContext";
import { FiHeart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card position-relative p-3">
      {/* Optional discount badge example (10%) */}
      <span className="badge-discount">-10%</span>

      <div className="text-center">
        <img src={product.image} alt={product.name} className="w-100 product-img" />
      </div>

      <h6 className="mt-3 mb-1">{product.name}</h6>
      <small className="text-muted">{product.category}</small>
      <div className="d-flex align-items-center justify-content-between mt-2">
        <div className="fw-bold" style={{color:"var(--indigo)"}}>${product.price}</div>
        <button className="btn btn-sm btn-outline-secondary rounded-pill">
          <FiHeart />
        </button>
      </div>

      <button className="btn btn-gradient mt-3 w-100" onClick={() => addToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
