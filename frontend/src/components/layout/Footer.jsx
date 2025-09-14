import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-xs leading-6 mt-12 text-neutral-500 min-w-48">
        <div className="pt-10 pb-20 border-t border-neutral-300 dark:border-neutral-200/5 flex items-center justify-around flex-col sm:flex-row">
          <ul className="flex flex-col items-center gap-1 sm:flex-row sm:gap-5 mb-8 sm:mb-0">
            <li>
              <Link
                className="hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center"
                href="/"
              >
                <img
                  src="/imgs/logo.png"
                  className="w-4 h-4"
                />
                LeftClick Sec
              </Link>
              <p>copyleft 🄯 2024</p>
            </li>
            <li className="sm:border-l sm:border-neutral-300 sm:dark:border-neutral-200/5 sm:pl-4">
              <Link
                href="privacy"
                className="hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-neutral-700 dark:hover:text-neutral-300"
                href={`add-on`}
              >
                Add-on
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-neutral-700 dark:hover:text-neutral-300"
                href={`about`}
              >
                About
              </Link>
            </li>
          </ul>

          <Link
            href="https://github.com/leidorf/leftclick-sec"
            target="_blank"
          >
            <img
              src="/imgs/github-logo.png"
              className="w-4 h-auto invert dark:invert-0"
            />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;