import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileLayout from "./components/profile/ProfileLayout";
import Login from "./components/profile/Login";
import Register from "./components/profile/Register";
import ForgotPassword from "./components/profile/ForgotPassword";
import ResetLayout from "./components/profile/ResetLayout";
import ActiveLayout from "./components/profile/ActiveLayout";
import Dashboard from "./components/admin/Dashboard";
import Product from "./components/admin/Product";
import CreateProduct from "./components/admin/CreateProduct";
import Cart from "./components/Cart";
import UpdateProduct from "./components/admin/UpdateProduct";
import User from "./components/admin/User";
import UpdateUser from "./components/admin/UpdateUser";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import AdminRoute from "./components/admin/AdminRoute";
import PrivateRoute from "./components/profile/PrivateRoute";
import Checkout from "./components/Checkout";
import OrderAdmin from "./components/admin/OrderAdmin";
import UpdateOrder from "./components/admin/UpdateOrder";
import OrderDetails from "./components/admin/OrderDetails";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetLayout />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/api/auth/activate/:activate_token"
            element={<ActiveLayout />}
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <ProfileLayout />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <Product />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/create-product"
            element={
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/update-product/:id"
            element={
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <User />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users/update-user/:id"
            element={
              <AdminRoute>
                <UpdateUser />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrderAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders-detail"
            element={
              <AdminRoute>
                <OrderDetails />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders/update-order/:id"
            element={
              <AdminRoute>
                <UpdateOrder />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
