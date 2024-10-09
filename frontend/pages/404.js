import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";

const Error = () => {
  return (
    <>
      <Layout>
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
