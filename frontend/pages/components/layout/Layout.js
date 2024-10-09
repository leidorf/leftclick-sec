import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [openClass, setOpenClass] = useState("");

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
