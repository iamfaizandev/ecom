import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import React, { Suspense, lazy } from "react";
import LoadingSpinner from "../src/hooks/loadingSpinner";

const Nav = lazy(() => import("./component/nav/nav"));
const Home = lazy(() => import("./component/home/home"));
const Products = lazy(() => import("../src/pages/products/products"));
const About = lazy(() => import("./component/about/about"));
const Contact = lazy(() => import("./component/contact/contact"));
const Account = lazy(() => import("./component/account/account"));
const Login = lazy(() => import("./component/login/login"));
const Register = lazy(() => import("./component/register/register"));
const Cart = lazy(() => import("../src/pages/cart/cart"));
const OrderDetails = lazy(() => import("./pages/orderDetails/orderDetails"));
const Nofound = lazy(() => import("./pages/orderDetails/Nofound"));
const Profile = lazy(() => import("./userPages/profile/profile"));
const Wishlist = lazy(() => import("./userPages/wishlist/wishlist"));
const UserBasedOrders = lazy(() => import("./userPages/ubo/Ubo"));
const Payment = lazy(() => import("./pages/payment/payment"));
const OrderTrack = lazy(() => import("./pages/orderTrack/orderTrack"));

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/nav" element={<Nav />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/viewcart" element={<Cart />} />
              <Route path="/orderDetails" element={<OrderDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/ubOrder" element={<UserBasedOrders />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/ordertracking" element={<OrderTrack />} />
              <Route path="/product/:category" element={<Products />} />
              <Route path="*" element={<Nofound />} /> {/* Catch-all route */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
