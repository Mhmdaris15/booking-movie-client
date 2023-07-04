import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);
  BrowserRouter;
  return (
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
          path="/register"
          element={<Register />}
        />

        <Route path="*">"404 Not Found"</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
