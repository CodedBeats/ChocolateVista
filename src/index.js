import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // React.StrictMode renders components twice (only in development mode)
    <BrowserRouter>
        <App />
        <ToastContainer />
    </BrowserRouter>
);
