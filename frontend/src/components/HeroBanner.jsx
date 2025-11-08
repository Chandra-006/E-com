 // optional local image if you want
export default function HeroBanner(){
  return (
    <div className="hero p-4 p-md-5 mb-4">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold">Discover New Products</h1>
          <p className="lead mt-2">Premium picks. Fast delivery. Secure checkout.</p>
          <button className="btn btn-gradient btn-lg mt-3">Shop Now</button>
        </div>
        <div className="col-lg-5 text-center">
          <img
            src="https://images.unsplash.com/photo-1611078489935-0cb42b40d1a8?auto=format&fit=crop&w=1200&q=80"
            alt="Online shopping"
            className="img-fluid rounded-4 d-none d-lg-block"
          />
        </div>
      </div>
    </div>
  );
}
