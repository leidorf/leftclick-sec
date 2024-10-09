import Link from "next/link";
import React from "react";
import Layout from "./components/layout/Layout";

const AddOn = () => {
  return (
    <>
      <Layout>
        <section className="section">
          <div className="container text-center">
            <h1>Add-on</h1>
            <ul>
                <li>Chrome</li>
                <li>Firefox</li>
            </ul>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AddOn;
