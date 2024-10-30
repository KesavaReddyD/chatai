import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import {Toaster} from "react-hot-toast";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
axios.defaults.baseURL= process.env.BASE_URL;
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
