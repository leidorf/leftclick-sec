import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const Error = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="404 | LeftClick Sec"></PageHead>
        <div className="container mx-auto text-center min-w-48">
          <h1 className="text-9xl font-semibold  text-red-500 dark:text-red-700 mb-8">404!<br/>:(</h1>
          <p>The page you were looking for was not found</p>
          <p>
            Return to{" "}
            <Link
              href="/"
              className="red-underline"
            >
              home
            </Link>{" "}
          </p>
        </div>
      </Layout>
    </>
  );
};
export default Error;
