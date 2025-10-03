import { Link } from "react-router-dom";
import { useURLCheck } from "../hooks/useURLCheck";
import PageHead from "../components/layout/PageHead";
import Layout from "../components/layout/Layout";

export default function Home() {
  const { url, setUrl, result, error, checking, checkingText, handleSubmit } =
    useURLCheck();

  return (
    <>
      <Layout>
        <PageHead headTitle="Check - LeftClick Sec"></PageHead>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-nowrap">LeftClick Sec</h1>
          <p className="text-sm mt-6 text-pretty w-1/5 min-w-48 sm:w-1/5 md:w-1/3 lg:w-1/2 mx-auto">
            Analyse suspicious URLs to detect malware and other breaches,
            automatically share them with the security community.
          </p>
          <div className="flex justify-center border-t border-neutral-300 dark:border-neutral-200/5 mt-4 pt-4">
            <img
              src="/images/logo.png"
              alt="LeftClick Sec Logo"
              className="w-14 h-auto sm:w-14 md:w-20 lg:w-32"
            />
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <input
                type="text"
                id="url"
                className="border border-neutral-300 dark:border-gray-600 bg-transparent text-sm leading-normal rounded py-1 px-2
                hover:ring-red-600 hover:ring-1 transition ease-in-out duration-500
                focus:outline-none focus:ring-red-600 focus:ring-1
                w-48 sm:w-48 lg:w-72 shadow-md"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a URL or domain"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="relative mt-4 px-4 py-1.5 rounded shadow-lg flex items-center justify-center border 
                border-red-700 text-red-700 text-sm hover:bg-red-700 hover:text-white
                transition ease-in-out hover:scale-105 duration-500 
                dark:bg-red-700 dark:text-white dark:hover:border-white dark:hover:bg-transparent"
              >
                {checking ? (
                  <span className="relative">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="white"
                      />
                    </svg>
                    {checkingText}
                  </span>
                ) : (
                  "Check"
                )}
              </button>
            </div>
          </form>
          <div className="mt-4">
            {/* --------------------------------- Print the checking progress -------------------------------- */}
            {result && result.data.progress && (
              <div className="flex flex-col items-center">
                <ul className="text-left">
                  {result.data.progress.map((step, index) => (
                    <li key={index}>
                      {step} <span className="text-2xl font-light">✓</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ---------------------------------------------------------------------------------------------- */
            /*                                        Print the results                                       */
            /* ---------------------------------------------------------------------------------------------- */}
            {result && (
              <div className="mt-4">
                <h3 className="text-xl font-bold">Results:</h3>
                <div className="p-2 rounded">
                  {/* -------------------------------- Print the whitelisted result -------------------------------- */}
                  {result.data.result === "whitelisted" && (
                    <p className="text-green-600">
                      ✅ <strong>{result.data.domain}</strong>
                      <br />
                      is in the whitelist and considered safe.
                    </p>
                  )}

                  {/* ---------------------------------- Print the USOM API result --------------------------------- */}
                  {result.data.source === "USOM API" && (
                    <div className="text-red-600">
                      <p className="mb-4">
                        ⚠️
                        <br />
                        <strong>{result.data.domain}</strong>
                        <br />
                        is flagged as suspicious.
                      </p>
                      {result.data.details.criticality_level && (
                        <p>
                          <span className="font-bold">Criticality Level:</span>{" "}
                          {result.data.details.criticality_level}
                        </p>
                      )}
                      {result.data.details.id && (
                        <a
                          className="underline"
                          href={`https://www.usom.gov.tr/adres/${result.data.details.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on USOM
                        </a>
                      )}
                    </div>
                  )}

                  {/* -------------------------- Print the local blacklist database result ------------------------- */}
                  {result.data.source === "Blacklist" && (
                    <div className="text-red-600">
                      <p className="mb-2">
                        ⚠️
                        <br />
                        <strong>{result.data.domain}</strong>
                        <br /> is flagged as suspicious.
                      </p>
                      <p>
                        <span className="font-bold">Source:</span>{" "}
                        {result.data.source}
                      </p>
                      {result.data.details.map((entry, index) => (
                        <p key={index}>
                          <span className="font-bold">Reason:</span>{" "}
                          {entry.reason || "Unknown"}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* ------------------------------ Print the prediction model result ----------------------------- */}
                  {result.data.source === "Prediction Model" && (
                    <>
                      <div
                        className={`mb-2 ${
                          result.data.result === "Safe"
                            ? "text-green-600"
                            : result.data.result === "Moderate"
                            ? "text-yellow-600"
                            : result.data.result === "Caution"
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {result.success && (
                          <>
                            <strong>{result.data.domain}</strong>
                            <br />
                            {result.messages.message}
                          </>
                        )}
                        <p>
                          <span className="font-bold">Phishing Score:</span>{" "}
                          {result.data.phishing_score.toFixed(2)}%
                        </p>
                      </div>
                      <p>
                        <span className="font-bold">Source:</span>{" "}
                        {result.data.source}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* --------------------------------------- Print the error -------------------------------------- */}
          {error && (
            <div className="mt-4 text-red-500">
              <p>{error.message}</p>
            </div>
          )}

          {/* ------------------------------------ Privacy Policy Notice ----------------------------------- */}
          <p
            className="border-t border-neutral-300 dark:border-neutral-200/5 mt-4 pt-4 text-xs
           text-neutral-500 mt-8 text-pretty w-1/5 min-w-48 sm:w-1/5 md:w-1/3 lg:w-1/2 mx-auto "
          >
            By submitting data above, you are agreeing to LCS's{" "}
            <Link
              to="/privacy"
              className="text-neutral-900 dark:text-neutral-400"
            >
              Privacy Policy
            </Link>
            . Please do not submit any personal information; we are not
            responsible for the contents of your submission.
          </p>
        </div>
      </Layout>
    </>
  );
}
