// Header.jsx
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="sticky mb-8 font-bold">
      <div
        className="py-5 border-b border-neutral-300 dark:border-neutral-200/5  relative flex justify-between
                      text-neutral-800 dark:text-neutral-300"
      >
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center">
              <img
                src="/imgs/logo.png"
                alt="Logo"
                className="h-6 w-6"
              />
              <p className="ml-2 text-2xl font-light">LeftClick Sec</p>
            </div>
          </Link>
        </div>
        <button
          className="block sm:hidden text-2xl font-extralight"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <ul className="hidden sm:flex items-center space-x-10">
          <li>
            <Link
              href="/add-on"
              className="header-item"
            >
              Add-on
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="header-item"
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="px-3 py-2 text-sm font-semibold rounded-lg
                       border border-neutral-300 dark:border-neutral-800
                       dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800
                       transition-all ml-auto"
            >
              {isDark ? "❨" : "☀︎"}
            </button>
          </li>
        </ul>
      </div>
      {menuOpen && (
        <ul className="flex flex-col gap-4 p-3 sm:hidden border-b border-neutral-300 dark:border-neutral-800 text-center">
          <li>
            <Link
              className="header-hamburger"
              href={"/"}
              onClick={() => setMenuOpen(false)}
            >
              Home Page
            </Link>
          </li>
          <li>
            <Link
              className="header-hamburger"
              href={"/add-on"}
              onClick={() => setMenuOpen(false)}
            >
              Add-on
            </Link>
          </li>
          <li>
            <Link
              className="header-hamburger"
              href={"/about"}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="block p-2 w-full"
            >
              {isDark ? "❨" : "☀︎"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
