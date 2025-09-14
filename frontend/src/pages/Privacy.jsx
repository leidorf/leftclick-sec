import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";
import Link from "next/link";

const Privacy = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="Privacy | LeftClick Sec"></PageHead>
        <div className="">
          <div className="text-pretty max-w-2xl min-w-60">
            <h1 className="text-4xl">Privacy Policy</h1>
            <div className="text-sm mt-4">
              <p>
                <strong>Effective Date:</strong> 21/12/2024
                <br />
                LeftClick Sec ("LCS") is committed to protecting your privacy. This Privacy Policy explains how LCS collects,
                uses, and handles your information when you use LCS's services.
              </p>
              <div className="border-t pt-4 mt-4 border-neutral-300 dark:border-neutral-200/10 max-w-sm"></div>
              <ol className="list-decimal">
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Information LCS Collects</strong>
                  </li>
                  LCS collects minimal information from users to provide our services effectively. Specifically:
                  <ol>
                    <li className="mt-2">a. Domain/URL Input:</li>
                    User Input: LCS collects only the domain or URL provided by the user for analysis.
                    <li className="my-2">b. Suspicious Content Logging:</li>
                    If a domain or URL is flagged as suspicious, LCS stores:
                    <ul className="list-disc mb-2">
                      <li>The domain or URL.</li>
                      <li>The reason for flagging it as suspicious.</li>
                      <li>The timestamp of when it was added to LCS's database.</li>
                    </ul>
                    LCS does <span className="text-red-600 font-bold">NOT</span> collect or store any other personal or
                    identifiable information from users.
                  </ol>
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>How LCS Uses Your Information</strong>
                  </li>
                  The information LCS collects is used solely for the following purposes:
                  <ul className="list-disc">
                    <li>
                      <strong>Analysis:</strong>To analyze the provided domain or URL and determine whether it is suspicious.
                    </li>
                    <li>
                      <strong>Logging Suspicious Domains:</strong> To maintain a database of suspicious domains for security
                      purposes.
                    </li>
                  </ul>
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Sharing Your Information</strong>
                  </li>
                  LCS does <span className="text-red-600 font-bold">NOT</span> sell, share, or disclose your information to any
                  third parties.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Your Rights and Choices</strong>
                  </li>
                  Since LCS collects minimal information, there are limited user rights regarding data access or modification.
                  However, if you believe your domain or URL has been incorrectly flagged, you can contact LCS to request a
                  review.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Data Security</strong>
                  </li>
                  LCS takes reasonable measures to secure the stored information about flagged domains, including implementing
                  technical safeguards to prevent unauthorized access.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Data Retention</strong>
                  </li>
                  LCS retains information about flagged domains for as long as necessary to ensure the effectiveness of LCS's
                  services and for security purposes. If a domain is no longer relevant, it may be removed from LCS's database.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Changes to This Privacy Policy</strong>
                  </li>
                  LCS may update this Privacy Policy from time to time to reflect changes in LCS's practices or legal
                  obligations. Any updates will be posted on this page with the updated effective date.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Contact LCS</strong>
                  </li>
                  If you have any questions or concerns about this Privacy Policy or believe your domain has been flagged in
                  error, please contact LCS at:
                  <ul>
                    <li>
                      <Link
                        href={`mailto:leidorf.foss@gmail.com`}
                        className="red-underline"
                      >
                        Email
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`https://www.github.com/leidorf`}
                        className="red-underline"
                        target="_blank"
                      >
                        GitHub
                      </Link>
                    </li>
                  </ul>
                </div>
              </ol>
              <div className="border-t pt-4 mt-4 border-neutral-300 dark:border-neutral-200/10 max-w-sm"></div>
              <p>Thank you for using LeftClick Sec ❤️</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Privacy;