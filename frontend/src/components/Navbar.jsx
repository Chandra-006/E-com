import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { cart } = useCart();
  const count = cart?.length || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-premium">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">VIBE COMMERCE</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        

          {/* Right links */}
          <ul className="navbar-nav ms-lg-3">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Products</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/checkout" ? "active" : ""}`} to="/checkout">Checkout</Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-2">
              <Link className="nav-link position-relative" to="/cart" title="Cart">
                <FiShoppingCart size={20}/>
                {count > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {count}
                  </span>
                )}
              </Link>
              <Link className="nav-link ms-2" to="#"><FiUser size={20}/></Link>
            </li>
          </ul>
        </div>
  
    </nav>
  );
};
export default Navbar;
