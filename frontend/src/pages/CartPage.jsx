import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, fetchCart, removeFromCart } = useCart();

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const total = cart.reduce((sum, i) => sum + ((i.product?.price || 0) * i.qty), 0);

  return (
    <div className="container my-4">
      <h2 className="section-title mb-3">Your Cart</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="cart-card p-3">
            {cart.length === 0 && <p>Your cart is empty.</p>}
            <ul className="list-group list-group-flush">
              {cart.map(i => (
                <li key={i.productId} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <img src={i.product?.image} alt="" style={{width:64,height:64,objectFit:"contain"}} />
                    <div>
                      <div className="fw-semibold">{i.product?.name || "Unknown"}</div>
                      <small className="text-muted">Qty: {i.qty}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="fw-bold">${i.product?.price || 0}</div>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(i.productId)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="cart-card p-3">
            <h5 className="mb-3">Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span className="fw-bold">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-gradient w-100 mt-3">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
