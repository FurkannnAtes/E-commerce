import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const unValidPaths = ["/register", "/login"];
  return (
    <div
      className={`${
        unValidPaths.includes(location.pathname) ? "hidden" : "block"
      } border-t text-center bg-mainRed py-2 text-sm font-semibold text-white mt-auto`}
    >
      Created By Ofenos
    </div>
  );
};

export default Footer;
