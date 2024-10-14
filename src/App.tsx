import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: EFO_core_app</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
  </div>
);

const router = createBrowserRouter([{ path: "/", element: <App /> }]);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

export default App;
