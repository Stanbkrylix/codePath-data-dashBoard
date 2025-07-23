import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodRecipe from "./Recipe.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/recipe/:id" element={<FoodRecipe />} />
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    </BrowserRouter>
);
