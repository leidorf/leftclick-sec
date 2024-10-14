import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const Error = () => {
  return (
    <>
      <Layout>
      <PageHead headTitle="404 | LeftClick Sec"></PageHead>
        <div>
          <h1>404 Page Not Found! :(</h1>
          <p>
            Return to <Link href="/">Home Page</Link>{" "}
          </p>
        </div>
      </Layout>
    </>
  );
};
export default Error;
