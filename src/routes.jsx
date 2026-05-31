import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Nav from "./Navigation/Nav.jsx";
import Footer from "./Footer.jsx";
import NavBottom from './Component/NavBottom.jsx';

import Home from "./Component/Home.jsx";
import Checkout from "./Component/Checkout.jsx";
import Cart from "./Component/Cart.jsx";
import OrderHistory from "./Component/Orderhistory.jsx";
import Orders from "./Component/Orders.jsx";
import Receipt from "./Component/Receipt.jsx";
import Details from "./Component/Details.jsx";
import OrderDetail from "./Component/Orderdetails.jsx";
import Browse from "./Component/Browse.jsx";
import EditProfile from "./Component/EditProfile.jsx";
import Settings from "./Component/Settings.jsx";
import Transaction from "./Wallet/Transaction.jsx";
import NotFound from "./Component/NotFound.jsx";

import Login from "./Security/Login.jsx";
import Signup from "./Security/Signup.jsx";
import Welcome from "./Landing/welcome.jsx";
import DropCountdown from "./Landing/DropCountdown.jsx";

import ProtectedRoute from "./lib/Protectedroutes.jsx";

// Dashboard
import DashboardApp from "./Dashboard/DashboardApp";
import Overview from "./Dashboard/Alloverview/Overview.jsx";
import DashOrders from "./Dashboard/Allorder/Orders.jsx";
import DashOrderdetails from "./Dashboard/Allorder/Orderdetails.jsx";
import ProductList from "./Dashboard/Allproduct/ProductList.jsx";
import AddProduct from "./Dashboard/Allproduct/Addproduct.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Welcome" replace />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Welcome" element={<Welcome />} />
      <Route path="/DropCountdown" element={<DropCountdown />} />

      {/* Dashboard Routes (Separate Layout) */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardApp />
          </ProtectedRoute>
        }
      >
      <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="orders" element={<DashOrders />} />
        <Route path="orders/:id?" element={<DashOrderdetails />} />
        <Route path="products" element={<ProductList />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Main Protected App Routes with Layout */}
      <Route
        path="/chd/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="Checkout" element={<Checkout />} />
        <Route path="receipt/:id?" element={<Receipt />} />
        <Route path="OrderHistory" element={<OrderHistory />} />
        <Route path="Order" element={<Orders />} />
        <Route path="orderdetail/:orderId?" element={<OrderDetail />} />
        <Route path="Browse" element={<Browse />} />
        <Route path="productdetails/:productId?" element={
        <Details />} />
        <Route path="Wallet" element={<Transaction />} />
        <Route path="Setting" element={<Settings />} />
        <Route path="editprofile" element={<EditProfile />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}


function Layout() {
  return (
    <div>
      <Nav />
      <main className="mt-[60px] lg:mt-0 lg:ml-[240px]">
        <Outlet /> {/* ← this renders the matched child route */}
        <NavBottom />
        <Footer />
      </main>
    </div>
  );
}
