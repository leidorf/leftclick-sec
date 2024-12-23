import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-xs leading-6 mt-12 text-gray-500">
        <div className="pt-10 pb-20 border-t border-slate-200/5 flex justify-around items-center">
          <div className="flex">
            <div>
              <Link
                className="hover:text-gray-300 flex items-center"
                href="/"
              >
                <img
                  src="/imgs/logo.png"
                  className="w-4 h-4"
                />
                LeftClick Sec
              </Link>
              <p>copyleft 🄯 2024</p>
            </div>
            <p className="border-l border-slate-200/5 sm:ml-4 sm:pl-4">
              <Link
                href="privacy"
                className="hover:text-gray-300"
              >
                Privacy Policy
              </Link>
            </p>
            <p className="sm:ml-4 sm:pl-4">
              <Link
                className=" hover:text-gray-300"
                href={`add-on`}
              >
                Add-on
              </Link>
            </p>
            <p className="sm:ml-4 sm:pl-4">
              <Link
                className=" hover:text-gray-300"
                href={`about`}
              >
                About
              </Link>
            </p>
          </div>

          {/* github */}
          <Link
            className="hover:text-gray-300"
            href="https://github.com/leidorf/leftclick-sec"
            target="_blank"
          >
            <img
              src="/imgs/github-logo.png"
              className="w-4 h-auto"
            />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
