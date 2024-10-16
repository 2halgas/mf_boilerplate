import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./components/Providers";

import "./i18n";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl font-inter">
      <div className="text-red-200">Name: EFO_core_app</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Tailwind</div>
      <Button variant={"secondary"}>Button</Button>
    </div>
  );
};

const router = createBrowserRouter([{ path: "/", element: <App /> }]);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);

export default App;
