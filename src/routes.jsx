import { Routes, Route } from "react-router-dom";
import Nav from "./Navigation/Nav.jsx";
import Footer from "./Footer.jsx";
import Home from "./Component/Home.jsx";
import Checkout from "./Component/Checkout.jsx";
import Cart from "./Component/Cart.jsx";
import OrderHistory from "./Component/Orderhistory.jsx";
import Orders from "./Component/Orders.jsx";
import Receipt from "./Component/Receipt.jsx";
import Details from "./Component/Details.jsx";
import OrderDetail from "./Component/Orderdetails.jsx";
import Browse from "./Component/Browse.jsx";
import Login from "./Security/Login.jsx";
import Settings from "./Component/Settings.jsx";
import Signup from "./Security/Signup.jsx";
import Transaction from "./Wallet/Transaction.jsx";
import Welcome from "./Landing/welcome.jsx";
import DropCountdown from "./Landing/DropCountdown.jsx";
import Products from "./Component/Products.jsx";
import ProtectedRoute from "./lib/Protectedroutes.jsx";
import DashboardApp from "./Dashboard/DashboardApp";
import Overview from "./Dashboard/Alloverview/Overview.jsx";
import DashOrders from "./Dashboard/Allorder/Orders.jsx";
import ProductList from "./Dashboard/Allproduct/ProductList.jsx";
import AddProduct from "./Dashboard/Allproduct/Addproduct.jsx";
import { Navigate } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect */}
    <Route path="/Admin" element={<Navigate to="/dashboard" replace />} />

      {/* No nav routes */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Welcome" element={<Welcome />} />
      <Route path="/DropCountdown" element={<DropCountdown />} />
      <Route path="/Products" element={<Products />} />
   
    
      {/* Dashboard routes — own layout, no Nav/Footer */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardApp />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="orders" element={<DashOrders />} />
        <Route path="products" element={<ProductList />} />
        <Route path="addproduct" element={<AddProduct />} />
      </Route>

      {/* Main app routes — with Nav/Footer */}
      <Route
        path="/*"
        element={
          <div>
            <Nav />
            <main className="mt-[60px] lg:mt-0 lg:ml-[240px]">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/Cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

                <Route path="/Receipt" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />
                <Route path="/OrderHistory" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                <Route path="/Order" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/OrderDetail" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                <Route path="/Browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
                <Route path="/Details" element={<ProtectedRoute><Details /></ProtectedRoute>} />
                <Route path="/Checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/Wallet" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
     <Route path="/Setting" element={<ProtectedRoute><Settings
    /></ProtectedRoute>} />
              </Routes>
              <Footer />
            </main>
          </div>
        }
      />
    </Routes>
  );
}
