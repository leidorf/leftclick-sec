import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const AddOn = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="Add-on | LeftClick Sec"></PageHead>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl">Add-on</h1>
          <p className="text-xs mt-4">
            LeftClick Sec is a browser extension too!
            <br />
            You can download it as an extension for your browser from the links below.
          </p>
          <div className="border-t pt-4 mt-4 border-slate-200/25 mx-96"></div>
          <ul className="flex space-x-36 justify-center">
            <li>
              <Link
                href=""
                className="p-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              >
                Chrome
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="p-1 rounded bg-gradient-to-r from-pink-500 to-orange-500"
              >
                Firefox
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default AddOn;
