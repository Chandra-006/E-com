import { useState } from "react";
import axios from "axios";

export default function CheckoutPage(){
  const [data, setData] = useState({ name:"", email:"" });
  const [receipt, setReceipt] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/checkout", data);
    setReceipt(res.data.receipt);
  };

  return (
    <div className="container my-4">
      <h2 className="section-title mb-3">Checkout</h2>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="cart-card p-4">
            <form onSubmit={submit} className="row g-3">
              <div className="col-12">
                <label className="form-label">Full Name</label>
                <input className="form-control" onChange={e=>setData({...data, name:e.target.value})}/>
              </div>
              <div className="col-12">
                <label className="form-label">Email</label>
                <input className="form-control" onChange={e=>setData({...data, email:e.target.value})}/>
              </div>
              <div className="col-12">
                <button className="btn btn-gradient px-4">Place Order</button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="cart-card p-4">
            <h5>Secure Checkout</h5>
            <p className="text-muted mb-0">We use SSL and never store card details.</p>
          </div>

          {receipt && (
            <div className="alert alert-success mt-3">
              <div className="fw-bold mb-1">✅ Order Successful</div>
              <div>Name: {receipt.name}</div>
              <div>Email: {receipt.email}</div>
              <small className="text-muted">{new Date(receipt.timestamp).toLocaleString()}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
