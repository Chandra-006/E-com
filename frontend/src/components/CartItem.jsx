import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <div>
        <h6>{item.product?.name || "Unknown product"}</h6>
            <p>Qty: {item.qty}</p>
            <p>Price: ${item.product?.price || 0}</p>
      </div>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => removeFromCart(item._id)}
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
