import Link from "next/link";
import PageHead from "./components/layout/PageHead";
import Layout from "./components/layout/Layout";
import React, { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      let domain;
      try {
        const urlObj = new URL(url);
        domain = urlObj.hostname;
      } catch (err) {
        domain = url;
      }

      const response = await fetch(`/api/check-url?q=${encodeURIComponent(domain)}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Layout>
        <PageHead headTitle="Home | LeftClick Sec"></PageHead>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-nowrap">LeftClick Sec</h1>
          <p className="text-xs mt-6 text-pretty max-w-sm mx-auto">Analyse suspicious URLs to detect malware and other breaches, automatically share them with the security community.</p>
          <div className="flex justify-center mx-96 border-t border-slate-200/5 mt-4 pt-4">
            <img
              src="/imgs/scan-photo.png"
              className="w-28"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div className="">
              {/* <label
                htmlFor="url"
                className="mb-8"
              >
                Enter a URL:
              </label> */}
              <input
                type="text"
                id="url"
                className="border border-slate-300 text-black w-1/4 rounded py-1 px-2 focus:outline-none focus:border-purple-800 focus:ring-purple-800 focus:ring-1 sm:text-sm "
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a URL"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded px-4 py-0.5"
            >
              Check
            </button>
          </form>
          {result && (
            <div className="mt-4">
              <h3 className="text-xl">Results:</h3>
              <div className="p-2 rounded capitalize">
                {result.message ? (
                  <p>{result.message}</p>
                ) : (
                  <p className="text-red-600">
                    <Link
                      className="underline"
                      target="_blank"
                      href={`https://www.usom.gov.tr/adres/${result.data.id}`}
                    >
                      {result.result}
                    </Link>
                    <br />
                    CVSS: {result.data.criticality_level}
                  </p>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500">
              <p>{error}</p>
            </div>
          )}
          <p className="border-t border-slate-200/5 mt-4 pt-4 text-xs text-gray-500 mt-8 text-pretty max-w-xl mx-auto">
            By submitting data above, you are agreeing to our Terms of Service and{" "}
            <Link
              href="./privacy.js"
              className="text-slate-400"
            >
              Privacy Policy
            </Link>
            . Please do not submit any personal information; we are not responsible for the contents of your submission. Learn more.
          </p>
        </div>
      </Layout>
    </>
  );
}
