import { Routes, Route } from "react-router-dom";
import Nav from "./Navigation/Nav.jsx";
import Footer from "./Footer.jsx";
import Home from "./Component/Home.jsx";
import Cart from "./Component/Cart.jsx";
import Login from "./Security/Login.jsx";
import Signup from "./Security/Signup.jsx";
import Transaction from "./Wallet/Transaction.jsx";
import Welcome from "./Landing/welcome.jsx";
import DropCountdown from "./Landing/DropCountdown.jsx";
import Products from "./Component/Products.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* No nav */}
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/DropCountdown" element={<DropCountdown />} />
      <Route path="/Products" element={<Products />} />

      {/* With nav */}
      <Route
        path="/*"
        element={
          <div>
            <Nav />
            <main className="mt-[60px] lg:mt-0 lg:ml-[240px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Cart" element={<Cart />} />

                <Route path="/Wallet" element={<Transaction />} />
              </Routes>
              <Footer />
            </main>
          </div>
        }
      />
    </Routes>
  );
}
