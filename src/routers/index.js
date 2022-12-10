import { Routes, Route } from "react-router-dom";
import HomePage from "../pages//user/Home";
import DashBoardPage from "../pages/admin/Dashboard";
import LoginPage from "../pages/admin/Login";
function RootRouters() {
    return (
        <Routes>
            <Route path="/admin/dashboard" element={<DashBoardPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<LoginPage />} />
        </Routes>
    );
}

export default RootRouters;
