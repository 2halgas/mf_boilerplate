import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./components/Providers";

import "./i18n";
import AuthPage from "./pages/Auth";

const router = createBrowserRouter([{ path: "/", element: <AuthPage /> }]);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);
