import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="sticky top-0 w-full mb-8">
        <div className="py-4 border-b border-slate-200/5 relative flex justify-around">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src="/imgs/logo.png"
                  alt="Logo"
                  className="h-6 w-6"
                ></img>
                <p className="ml-2">LeftClick Sec</p>
              </div>
            </Link>
          </div>
          <ul className="flex space-x-8">
            <li>
              <Link href="/add-on">Add-on</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
