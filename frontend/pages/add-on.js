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
          <p className="text-sm mt-4">
            LeftClick Sec is a browser extension too!
            <br />
            You can download it as an extension for your browser from the links below.
          </p>
          <ul className="flex space-x-36 mt-8 text-xl font-medium justify-center">
            <li>
              <Link
                href=""
                className="text-yellow-500"
              >
                Chrome
              </Link>
            </li>
            <li>
              <Link
                href=""
                className=" text-orange-600"
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
