import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";
import { AuthProvider } from "./Context/AuthContext";
import { ProductProvider } from "./Context/ProductContext";

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
