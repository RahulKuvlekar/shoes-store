import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./Context/ToastContext";
import { AuthProvider } from "./Context/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
