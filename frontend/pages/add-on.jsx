import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const AddOn = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="Add-on | LeftClick Sec"></PageHead>
        <div className="text-center min-w-48">
          <h1 className="text-4xl">Add-on</h1>
          <p className="text-sm  mt-4 mb-10 whitespace-pre-line">
            LeftClick Sec is a browser extension too!{"\n"}You can download it as an extension for your browser from the links
            below.
          </p>
          <ul className="flex flex-row gap-12 sm:gap-24 md:gap-48 text-xl font-medium justify-center">
            <li>
              <Link
                href=""
                className="text-blue-500"
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/imgs/chrome-logo.png"
                    className="w-12 sm:-12 md:w-16 lg:w-24 h-auto mb-4"
                  />
                  <p>Chrome</p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href=""
                className=" text-orange-600"
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/imgs/firefox-logo.png"
                    className="w-12 sm:-12 md:w-16 lg:w-24 h-auto mb-4"
                  />
                  <p>Firefox</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default AddOn;
