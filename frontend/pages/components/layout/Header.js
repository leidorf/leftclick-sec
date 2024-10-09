import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="container">
        <header className="d-flex py-3 mb-3">
          <div className="p-3">
            <Link
              href="/"
              className="d-flex align-items-center text-decoration-none link-light link-opacity-50-hover"
            >
              LeftClick Sec
            </Link>
          </div>
          <div className="">
            <Link
              href="/add-on"
              className="nav-link link-light link-opacity-50-hover"
            >
              Add-on
            </Link>
          </div>
          <div className="">
            <Link
              href="/about"
              className="nav-link link-light link-opacity-50-hover"
            >
              About
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
