import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RouteGuard from "./components/RouteGuard";
import Login from "./pages/Login";
import SingleMovie from "./pages/SingleMovie";
import Profile from "./pages/Profile";
import ApiDataProvider from "./components/ApiDataProvider";
import { NextUIProvider } from "@nextui-org/react";
import Payment from "./pages/Payment";
import Topup from "./pages/Topup";
import AddShowtime from "./pages/AddShowtime";

const PrivateRoute = ({ path, element: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasJWT = localStorage.getItem("Token");
    if (!hasJWT) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <Route
      path={path}
      element={<Component />}
    />
  );
};

function App() {
  const hasJWT = () => {
    // Check if the user has JWT or not
    const token = localStorage.getItem("Token");
    return !!token; // Returns true if token exists, false otherwise
  };

  if (new Date().getTime() > localStorage.getItem("TokenExpiredTime")) {
    localStorage.removeItem("token");
    localStorage.removeItem("TokenExpiredTime");
    localStorage.removeItem("username");
  }

  return (
    <ApiDataProvider>
      <NextUIProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/movies/add"
              element={<AddMovie />}
            />
            <Route
              path="/movies/:id"
              element={<SingleMovie />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/payment"
              element={<Payment />}
            />
             <Route
              path="/topup"
              element={<Topup />}
            />
            <Route
              path="/showtimes/add"
              element={<AddShowtime />}
            />
            <Route
              path="*"
              element="404 Not Found"
            />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </ApiDataProvider>
  );
}

export default App;
