import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="sticky top-0 w-full mb-8">
        <div className="py-4 border-b border-slate-200/5 relative flex justify-around">
          <div>
            <Link href="/">LeftClick Sec</Link>
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
