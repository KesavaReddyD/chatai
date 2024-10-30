import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import {Toaster} from "react-hot-toast";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL= BASE_URL;
axios.defaults.withCredentials=true;


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Toaster position="top-right"/>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);
