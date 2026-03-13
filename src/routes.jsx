import { Routes, Route } from "react-router-dom";
import Nav from "./Navigation/Nav.jsx";
import Footer from "./Footer.jsx";
import Home from "./Component/Home.jsx";
import Login from "./Security/Login.jsx";
import Signup from "./Security/Signup.jsx";
import Transaction from "./Wallet/Transaction.jsx";
import Welcome from "./Landing/welcome.jsx";
import DropCountdown from "./Landing/DropCountdown.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* No nav */}
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/DropCountdown" element={<DropCountdown />} />

      {/* With nav */}
      <Route
        path="/*"
        element={
          <div>
            <Nav />
            <main className="mt-[60px] lg:mt-0 lg:ml-[240px]">
              <Routes>
                <Route path="/Home" element={<Home />} />

                <Route path="/Transaction" element={<Transaction />} />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}
