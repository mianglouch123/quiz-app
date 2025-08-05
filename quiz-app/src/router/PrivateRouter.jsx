import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "../presentation/components/utils/Navbar.jsx";

export default function PrivateRoute() {
  const location = useLocation();

  const isNotAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const hideNavbarRoutes = [/^\/create-quiz$/, /^\/take-quiz\/[^/]+$/ ,/^\/update-quiz\/[^/]+$/ ];

const shouldHideNavbar = hideNavbarRoutes.some((regex) =>
  regex.test(location.pathname)
);

  return isNotAuthenticated() ? (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
