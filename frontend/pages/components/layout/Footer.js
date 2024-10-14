import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-xs leading-6 mt-12 text-gray-500">
        <div className="pt-10 pb-20 border-t border-slate-200/5 flex justify-around">
          <div className="flex">
            <p>copyleft 🄯 2024 leidorf ☭</p>
            <p className="border-l border-slate-200/5 sm:ml-4 sm:pl-4">
              <Link
                href="../../privacy.js"
                className="hover:text-gray-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* github */}
          <div>
            <Link
              className="hover:text-gray-300"
              href="https://github.com/leidorf"
              target="_blank"
            >
              GitHub
              {/* <img
                src="/imgs/github-logo.png"
                style={{ width: "1rem" }}
                /> */}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
