import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
 
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "85vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
