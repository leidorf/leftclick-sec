import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageHead from "../components/layout/PageHead";

const AddOnPage = () => {
  return (
    <Layout>
      <PageHead headTitle="Add-on - LeftClick Sec"></PageHead>
      <div className="text-center min-w-48">
        <h1 className="text-4xl">Add-on</h1>
        <p className="text-sm mt-4 mb-10 whitespace-pre-line">
          LeftClick Sec is also a browser extension!{"\n"}You can download it as
          an extension for your browser using the links below.
        </p>
        <ul className="flex flex-row gap-12 sm:gap-24 md:gap-36 text-xl font-medium justify-center">
          <li>
            <Link
              to="https://chromewebstore.google.com/detail/ggaehggbapppgjjeecflbojimcapfckg?utm_source=item-share-cb"
              className="text-blue-500"
            >
              <div className="flex flex-col items-center border border-blue-500 rounded-md p-6 px-12 shadow-md transition ease-in-out duration-700 hover:shadow-xl hover:scale-105">
                <img
                  src="/images/chrome-logo.png"
                  alt="Chrome Logo"
                  className="w-12 sm:-12 md:w-16 lg:w-24 h-auto mb-4"
                />
                <p>Chrome</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="https://addons.mozilla.org/en-US/firefox/addon/leftclicksec/"
              className=" text-orange-600"
            >
              <div className="flex flex-col items-center border border-orange-600 rounded-md p-6 px-12 shadow-md transition ease-in-out duration-700 hover:shadow-xl hover:scale-105">
                <img
                  src="/images/firefox-logo.png"
                  alt="Firefox Logo"
                  className="w-12 sm:-12 md:w-16 lg:w-24 h-auto mb-4"
                />
                <p>Firefox</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default AddOnPage;
