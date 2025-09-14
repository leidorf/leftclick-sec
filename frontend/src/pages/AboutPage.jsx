import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const AboutPage = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="About | LeftClick Sec"></PageHead>
        <div className="text-2xl max-w-xl min-w-60">
          <h1 className="text-4xl">About LeftClick Sec</h1>
          <div className="border-t pt-4 mt-4 border-neutral-300 dark:border-neutral-200/10 max-w-sm"></div>
          <div>
            <p>What is LeftClick Sec?</p>
            <p className="text-sm mt-2">
              LeftClick Sec is a lightweight, anonymous, machine learning based URL fishing scanner under GPLv3 and copyleft
              license. You can check the source code on{" "}
              <Link
                href="https://github.com/leidorf/leftclick-sec"
                target="_blank"
                className="red-underline"
              >
                GitHub
              </Link>
              .
            </p>
            <p className="mt-8">How LeftClick Sec is anonymous?</p>
            <p className="text-sm mt-2">
              LeftClick Sec does <span className="text-red-600 font-bold">NOT</span> collect, share or distrubate any user data.
              You can check more about in{" "}
              <Link
                href="privacy"
                className="red-underline"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;