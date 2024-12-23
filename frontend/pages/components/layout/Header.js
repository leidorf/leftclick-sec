import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="sticky mb-8 text-neutral-300 font-bold ">
        <div className="py-5 border-b border-slate-200/5  relative flex justify-between">
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
          <ul className="flex space-x-10 text-neutral-300 font-semibold">
            <li>
              <Link href="/add-on" className="header-item">Add-on</Link>
            </li>
            <li>
              <Link href="/about" className="header-item">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
