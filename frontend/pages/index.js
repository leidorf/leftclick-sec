import Link from "next/link";
import PageHead from "./components/layout/PageHead";
import Layout from "./components/layout/Layout";
import React, { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted URL: ", url);
  };

  return (
    <>
      <Layout>
        <PageHead headTitle="Home | LeftClick Sec"></PageHead>
        <div className="container justify-center flex text-center">
          <div className="">
            <h1 className="text-4xl">LeftClick Sec</h1>
            <p className="text-sm mt-8 text-pretty">Analyse suspicious URLs to detect malware and other breaches, automatically share them with the security community.</p>
            <form
              onSubmit={handleSubmit}
              className="mt-12"
            >
              <div className="">
                {/* <label
                htmlFor="url"
                className="mb-8"
                >
                Enter a URL:
                </label> */}
                <input
                  type="url"
                  id="url"
                  className=""
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter a URL"
                  required
                />
              </div>
              <button
                type="submit"
                className=""
              >
                Check
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
