import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="container">
        <footer className="d-flex py-3 border-top">
          <div className="me-auto d-flex align-items-center">

            <div className="text-white-50">
              <span className="copyleft me-1">🄯</span>
              2024 leidorf ☭
            </div>
          </div>

          {/* github */}
          <div className="d-flex align-items-center">
            <Link
              className="text-body-secondary d-flex align-items-center"
              href="https://github.com/leidorf"
              target="_blank"
            >
              <img
                src="/imgs/github-logo.png"
                style={{width: "1rem"}}
              />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
