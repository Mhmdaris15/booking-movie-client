import React from "react";
import { Route, Navigate } from "react-router-dom";
import tailwindcssAnimate from "tailwindcss-animate";

const RouteGuard = ({ path, element: Component }) => {
  const hasJWT = () => {
    // Check if the user has JWT or not
    const token = localStorage.getItem("Token");
    return !!token; // Returns true if token exists, false otherwise
  };

  return (
    <Route
      path={path}
      element={
        hasJWT() ? (
          <Component />
        ) : (
          <Navigate
            to="/login"
            replace
          />
        )
      }
    />
  );
};

export default RouteGuard;
