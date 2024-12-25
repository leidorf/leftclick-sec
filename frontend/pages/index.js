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
          <p className="text-sm mt-6 text-pretty w-1/5 min-w-48 sm:w-1/5 md:w-1/3 lg:w-1/2 mx-auto">
            Analyse suspicious URLs to detect malware and other breaches, automatically share them with the security community.
          </p>
          <div className="flex justify-center  border-t border-neutral-300 dark:border-neutral-200/5 mt-4 pt-4">
            <img
              src="/imgs/logo.png"
              className="w-14 h-auto sm:w-14 md:w-20 lg:w-32"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div>
              <input
                type="text"
                id="url"
                className="border border-neutral-300 dark:border-gray-600 bg-transparent text-sm rounded py-1 px-2 
                focus:outline-none focus:border-red-600 focus:ring-red-600 focus:ring-1 
                w-24 sm:w-24 md:w-48 lg:w-72 shadow-md"
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
          <div className="mt-4">
            {result && result.progress && result.progress.length > 0 && (
              <ul>
                {result.progress.map((step, index) => (
                  <li
                    className={index % 2 == 0 ? "text-green-500" : "text-yellow-500"}
                    key={index}
                  >
                    {step}
                  </li>
                ))}
              </ul>
            )}

            {result && (
              <div className="mt-4">
                <h3 className="text-xl font-bold">Results:</h3>
                <div className="p-2 rounded">
                  {result.result === "whitelisted" && (
                    <div>
                      <p className="text-green-600">
                        ✅ <strong>{result.domain}</strong>
                        <br />
                        is in the whitelist and considered safe.
                      </p>
                    </div>
                  )}

                  {result.result === "suspicious" && result.source === "API" && (
                    <div className="text-red-600">
                      <p className="mb-4">
                        ⚠️
                        <br />
                        <strong>{result.domain}</strong>
                        <br />
                        is flagged as suspicious.
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
                      <div
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
                            <strong>{result.data.domain}</strong>
                            <br />
                            is predicted to be safe by the model.
                          </>
                        ) : result.data.risk_level === "Moderate" ? (
                          <>
                            ⚠️
                            <br />
                            <strong>{result.data.domain}</strong>
                            <br /> has a moderate risk level. Exercise caution.
                          </>
                        ) : result.data.risk_level === "Caution" ? (
                          <>
                            ⚠️
                            <br />
                            <strong>{result.data.domain}</strong>
                            <br /> is flagged as potentially risky. Be cautious.
                          </>
                        ) : (
                          <>
                            ⚠️
                            <br />
                            <strong>{result.data.domain}</strong>
                            <br /> is flagged as highly risky. Avoid visiting.
                          </>
                        )}
                        <p>
                          <span className="font-bold">Phishing Score:</span> {result.data.phishing_score.toFixed(2)}%
                        </p>
                      </div>
                      <p>
                        <span className="font-bold">Source:</span> Model Prediction
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {error && (
            <div className="mt-4 text-red-500">
              <p>{error}</p>
            </div>
          )}
          <p
            className="border-t border-neutral-300 dark:border-neutral-200/5 mt-4 pt-4 text-xs
           text-neutral-500 mt-8 text-pretty w-1/5 min-w-48 sm:w-1/5 md:w-1/3 lg:w-1/2 mx-auto "
          >
            By submitting data above, you are agreeing to LCS's{" "}
            <Link
              href="privacy"
              className="text-neutral-900 dark:text-neutral-400"
            >
              Privacy Policy
            </Link>
            . Please do not submit any personal information; we are not responsible for the contents of your submission.
          </p>
        </div>
      </Layout>
    </>
  );
}
