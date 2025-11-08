🛍️ Vibe Commerce — Mock E-Commerce Cart

A full-stack shopping cart web app built for Vibe Commerce Screening Assignment.
It includes a complete e-commerce flow — product listing, add/remove cart items, totals, and mock checkout — with a modern, premium UI.

🚀 Tech Stack
Layer	Technology
Frontend	React, Bootstrap, Axios, React Context API
Backend	Node.js, Express
Database	MongoDB (local or Atlas)
API Source	DummyJSON (Fake Product API)
Language	JavaScript (ES6+)
💡 Overview

This project demonstrates a basic e-commerce system with integrated frontend, backend, and database layers.
Users can browse products, manage their cart, and perform a mock checkout — all without external dependencies like payment gateways.

✨ Features
🖥️ Frontend (React)

✅ Responsive modern UI
✅ Product grid with Add to Cart buttons
✅ Category filtering + search
✅ Cart view with remove/update
✅ Checkout form with name & email
✅ Receipt confirmation modal
✅ Global Cart via Context API
✅ Premium color theme (blue-cyan gradient)

⚙️ Backend (Node + Express)

✅ REST API endpoints
✅ MongoDB persistence (mock user)
✅ Dynamic seeding from DummyJSON API
✅ Mock checkout with total & timestamp
✅ Proper error handling

📁 Project Structure
Vibe-Commerce/
├── backend/
│   ├── server.js          # Express + MongoDB API
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, HeroBanner, ProductCard, etc.
│   │   ├── pages/         # HomePage, CartPage, CheckoutPage
│   │   ├── context/       # CartContext.jsx
│   │   ├── styles/        # theme.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

🧰 Backend API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetches mock product list (from DummyJSON)
POST	/api/cart	Adds {productId, qty} to mock user's cart
GET	/api/cart	Returns cart items with details and total
DELETE	/api/cart/:id	Removes an item from the cart
POST	/api/checkout	Returns mock receipt {total, timestamp}
⚙️ Setup & Run Locally
1️⃣ Clone the Repository
git clone https://github.com/YOUR_GITHUB_USERNAME/vibe-commerce.git
cd vibe-commerce

2️⃣ Setup Backend
cd backend
npm install
node server.js


✅ Runs at: http://localhost:5000

Make sure MongoDB is running locally (mongodb://127.0.0.1:27017/vibe-commerce).

3️⃣ Setup Frontend
cd ../frontend
npm install
npm start


✅ Runs at: http://localhost:3000

🧾 Example API Response
✅ /api/checkout

Request:

{
  "cartItems": [
    { "productId": 1, "qty": 2 },
    { "productId": 3, "qty": 1 }
  ]
}


Response:

{
  "status": "success",
  "message": "Order completed!",
  "receipt": {
    "name": "John Doe",
    "email": "john@example.com",
    "timestamp": "2025-11-08T05:12:00Z"
  }
}

🧠 Bonus Features Implemented

✅ MongoDB persistence
✅ Error handling
✅ Responsive design
✅ Integrated DummyJSON API
✅ Premium color palette
✅ Modular React components
✅ Context-based global cart

📸 Screenshots
🏠 Home / Product Page

🛒 Cart Page

💳 Checkout Page

(Add your actual screenshots inside frontend/public/screenshots/ and update file names here.)

💎 UI Highlights

Gradient Navbar (Dark Navy → Deep Blue)

Cyan + Violet premium color palette

Gradient “Add to Cart” & “Checkout” buttons

Responsive grid (4 columns desktop, 2 mobile)

Smooth hover shadows & transitions

📦 Deployment Ready

This project can be easily deployed on Render, Vercel, or GitHub Pages for the frontend,
and on Render or Railway for the backend.

(For this assignment, hosting is not required, but repo-ready code is fully deployable.)

🧑‍💻 Author

Your Name
📧 your.email@example.com

💼 LinkedIn Profile

🌐 Portfolio Website

🏁 License

MIT License © 2025

✅ Deliverables Check

Requirement	Status
Backend REST APIs	✅
MongoDB Persistence	✅
React Frontend	✅
Responsive Design	✅
Checkout Receipt	✅
README w/ Setup & Screenshots	✅
Bonus (API Integration + Styling)	✅