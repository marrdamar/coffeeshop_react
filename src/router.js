import React from "react";
import { createBrowserRouter } from "react-router-dom";

// import App from "./pages/App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import YourCart from "./pages/YourCart";
import History from "./pages/History";
import ForgotPassword from "./pages/ForgotPassword";

import PrivateRoute from "./utils/wrapper/privateRoute";
import PublicRoute from "./utils/wrapper/publicRoute";

const router = createBrowserRouter([
  // { path: "/", element: <App name="Afif" age={20} href={"https://reactjs.org"} /> },
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/forgotpwd",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  { path: "/products", element: <Products /> },
  {
    path: "/products/:id",
    element: (
      <PrivateRoute>
        <ProductDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/yourcart",
    element: (
      <PrivateRoute>
        <YourCart />
      </PrivateRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <PrivateRoute>
        <History />
      </PrivateRoute>
    ),
  },
]);

export default router;
