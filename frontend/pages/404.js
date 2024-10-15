import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const Error = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="404 | LeftClick Sec"></PageHead>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl">404! :(</h1>
          <p>The page you were looking for was not found</p>
          <p>
            Return to{" "}
            <Link
              href="/"
              className="underline decoration-purple-800 hover:decoration-2"
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
