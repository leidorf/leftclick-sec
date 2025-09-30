import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-10/12 sm:w-8/12">
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;