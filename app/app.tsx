import React from "react";
import type { JSX } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/Landing_Page/LandingPage";
import SignUp from "./routes/Sign_Up/SignUp";
import LogIn from "./routes/Log_In/LogIn";

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
        </Routes>
    );
}

export default App;