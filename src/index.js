import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import SignIn from "./components/auth/sign-in/SignIn";
import SignUp from "./components/auth/sign-up/SignUp";
import ErrorPage from "./components/error-page/ErrorPage";
import ProductDetails from "./components/Product-Details/ProductDetails.jsx";
import Layout from "./components/Layout.jsx";
import { Provider } from "react-redux";
import { Store } from "./store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "product-details/:product_id",
        element: <ProductDetails />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
);
