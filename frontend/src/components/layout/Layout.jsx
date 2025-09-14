import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageHead from "./PageHead";

const Layout = ({ children }) => {
  const [openClass, setOpenClass] = useState("");

  return (
    <>
      <div className="flex justify-center">
        <div className="w-10/12 sm:w-8/12">
          <PageHead />
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;