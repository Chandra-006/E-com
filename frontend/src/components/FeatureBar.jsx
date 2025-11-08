import { FiTruck, FiShield, FiHeadphones } from "react-icons/fi";

export default function FeatureBar(){
  return (
    <div className="container mb-4">
      <div className="row g-3">
        <div className="col-md-4">
          <div className="feature-pill w-100 justify-content-center">
            <FiTruck /> Free Delivery
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-pill w-100 justify-content-center">
            <FiShield /> Secure Payment
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-pill w-100 justify-content-center">
            <FiHeadphones /> 24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
}
