import Link from "next/link";
import PageHead from "./components/layout/PageHead";
import Layout from "./components/layout/Layout";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);
  const [checkingText, setCheckingText] = useState("Checking.");

  useEffect(() => {
    if (checking) {
      const interval = setInterval(() => {
        setCheckingText((prev) => {
          if (prev === "Checking.") return "Checking..";
          if (prev === "Checking..") return "Checking...";
          return "Checking.";
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [checking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setChecking(true);

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
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <Layout>
        <PageHead headTitle="Home | LeftClick Sec"></PageHead>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-nowrap">LeftClick Sec</h1>
          <p className="text-xs mt-6 text-pretty max-w-sm mx-auto">
            Analyse suspicious URLs to detect malware and other breaches, automatically share them with the security community.
          </p>
          <div className="flex justify-center mx-96 border-t border-slate-200/5 mt-4 pt-4">
            <img
              src="/imgs/logo.png"
              className="w-28"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div className="">
              <input
                type="text"
                id="url"
                className="border border-slate-300 text-black w-1/4 rounded py-1 px-2 focus:outline-none focus:border-red-600 focus:ring-red-600 focus:ring-1 sm:text-sm "
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a URL or domain"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="relative mt-4 px-4 py-1.5 rounded bg-red-700 shadow-lg shadow-red-700/50 text-white text-sm flex items-center justify-center"
              >
                {checking ? (
                  <>
                    <span className="relative">
                      <span className="absolute top-[-6px] right-[-16px] flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-100"></span>
                      </span>
                      {checkingText}
                    </span>
                  </>
                ) : (
                  "Check"
                )}
              </button>
            </div>
          </form>
          {result && (
            <div className="mt-4">
              <h3 className="text-xl font-bold">Results:</h3>
              <div className="p-2 rounded">
                {result.result === "whitelisted" && (
                  <div>
                    <p className="text-green-600">
                      ✅ <strong>{result.domain}</strong> is in the whitelist and considered safe.
                    </p>
                  </div>
                )}

                {result.result === "suspicious" && result.source === "API" && (
                  <div className="text-red-600">
                    <p>
                      ⚠️<br/><strong>{result.data?.url || "Domain"}</strong> is flagged as suspicious.
                    </p>
                    {result.data?.criticality_level && (
                      <p>
                        <span className="font-bold">Criticality Level:</span> {result.data.criticality_level}
                      </p>
                    )}
                    {result.data?.id && (
                      <a
                        className="underline"
                        href={`https://www.usom.gov.tr/adres/${result.data.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on USOM
                      </a>
                    )}
                  </div>
                )}

                {result.result === "suspicious" && result.source === "Database" && (
                  <div className="text-red-600">
                    <p>
                      ⚠️
                      <br />
                      <strong>{result.domain}</strong> is flagged as suspicious.
                    </p>
                    <p>
                      <span className="font-bold">Source:</span> Local Database
                    </p>
                    {result.data.map((entry, index) => (
                      <p key={index}>
                        <span className="font-bold">Reason:</span> {entry.reason || "Unknown"}
                      </p>
                    ))}
                  </div>
                )}

                {result.result && result.source === "Model" && (
                  <div>
                    <p
                      className={
                        result.data.risk_level === "Safe"
                          ? "text-green-600"
                          : result.data.risk_level === "Moderate"
                          ? "text-yellow-600"
                          : result.data.risk_level === "Caution"
                          ? "text-orange-600"
                          : "text-red-600"
                      }
                    >
                      {result.data.risk_level === "Safe" ? (
                        <>
                          ✅<br />
                          The domain is predicted to be safe by the model.
                        </>
                      ) : result.data.risk_level === "Moderate" ? (
                        <>
                          ⚠️
                          <br />
                          The domain has a moderate risk level. Exercise caution.
                        </>
                      ) : result.data.risk_level === "Caution" ? (
                        <>
                          ⚠️
                          <br />
                          The domain is flagged as potentially risky. Be cautious.
                        </>
                      ) : (
                        <>
                          ⚠️
                          <br />
                          The domain is flagged as highly risky. Avoid visiting.
                        </>
                      )}
                    </p>
                    <p className="text-yellow-500">
                      <span className="font-bold">Phishing Score:</span> {result.data.phishing_score.toFixed(2)}%
                    </p>
                    <p>
                      <span className="font-bold"></span> Model Prediction
                    </p>
                  </div>
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
              href="privacy.js"
              className="text-slate-400"
            >
              Privacy Policy
            </Link>
            . Please do not submit any personal information; we are not responsible for the contents of your submission. Learn
            more.
          </p>
        </div>
      </Layout>
    </>
  );
}
