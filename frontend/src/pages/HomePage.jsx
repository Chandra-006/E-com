import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import HeroBanner from "../components/HeroBanner";
import FeatureBar from "../components/FeatureBar";
import ProductCard from "../components/ProductCard";

export default function HomePage(){
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map(p => (p.category||"").toLowerCase()))],
    [products]
  );

  const filtered = useMemo(() => {
    const byCat = selected==="all"
      ? products
      : products.filter(p => (p.category||"").toLowerCase()===selected);
    if(!q.trim()) return byCat;
    return byCat.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  }, [products, selected, q]);

  return (
    <>
      <div className="container mt-4">
        <HeroBanner />
      </div>

      <FeatureBar />

      <div className="container">
        {/* Filter row */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <h3 className="section-title m-0">Products</h3>

          <div className="d-flex gap-2">
            <select className="form-select" value={selected} onChange={e=>setSelected(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
            <input
              className="form-control"
              placeholder="Search…"
              value={q}
              onChange={e=>setQ(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {filtered.map(p => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
