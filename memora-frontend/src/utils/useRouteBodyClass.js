import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useRouteBodyClass = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    document.body.className = ""; // reset

    if (pathname.startsWith("/dashboard")) {
      document.body.classList.add("day-body");
    } else if (pathname.startsWith("/login") || pathname === "/") {
      document.body.classList.add("login-body");
    } else if (pathname.startsWith("/signup")) {
      document.body.classList.add("signup-body");
    } else if (pathname.startsWith("/profile-setup")) {
      document.body.classList.add("signup-body");
    } else if (pathname.startsWith("/landing")) {
      document.body.classList.add("landing-body");
    } else if (pathname.startsWith("/profile")) {
      document.body.classList.add("profile-body");
    } else if (pathname.startsWith("/about")) {
      document.body.classList.add("about-body");
    } else if (pathname.startsWith("/fullscreen-editor")) {
      document.body.classList.add("fullscreen-body");
    }

    return () => {
      document.body.className = "";
    };
  }, [location.pathname]);
};
