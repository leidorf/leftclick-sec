import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const About = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="About | LeftClick Sec"></PageHead>
        <div className="flex justify-around ml-28">
          <div className="text-2xl">
            <h1 className="text-4xl">About LeftClick Sec</h1>
            <div className="border-t pt-4 mt-4 border-slate-200/5 max-w-xl">
              <p>What is LeftClick Sec?</p>
              <p className="text-sm mt-2">LeftClick Sec is a lightweight, anonymous, machine learning based URL fishing scanner under GPLv3 and copyleft license.</p>
              <p className="mt-8">How LeftClick Sec is anonymous?</p>
              <p className="text-sm mt-2">
                LeftClick Sec does <span className="text-red-600">NOT</span> collect, share and distrubate any user data. You can check more about in{" "}
                <Link
                  href="./privacy.js"
                  className="underline underline-offset-2 decoration-2 decoration-red-800"
                >
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </Layout>
    </>
  );
};

export default About;
