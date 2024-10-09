import Link from "next/link";
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
        <div className="container">
          <h1>LeftClick Sec</h1>

          <form
            onSubmit={handleSubmit}
            className="url-input-section"
          >
            <div className="mb-3">
              <label
                htmlFor="url"
                className="form-label"
              >
                Enter a URL:
              </label>
              <input
                type="url"
                id="url"
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Check
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}
