import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import axios from "axios";
// import { config } from "dotenv";

// config();
axios.defaults.withCredentials = true;
const container = document.getElementById("root");
const root = createRoot(container);
// const { PUBLIC_URL } = process.env;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
