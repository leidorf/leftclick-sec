import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageHead from "../components/layout/PageHead";

const PrivacyPage = () => {
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
                LeftClick Sec, also known as LCS, is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use
                and handle your information when you use our services.
              </p>
              <div className="border-t pt-4 mt-4 border-neutral-300 dark:border-neutral-200/10 max-w-sm"></div>
              <ol className="list-decimal">
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Information LCS Collects</strong>
                  </li>
                  LCS only collects the minimum amount of information necessary
                  to provide our services effectively. Specifically:
                  <ol>
                    <li className="mt-2">a. Domain/URL Input:</li>
                    User Input: LCS collects only the domain or URL provided by
                    the user for analysis.
                    <li className="my-2">b. Suspicious Content Logging:</li>
                    If a domain or URL is flagged as suspicious, LCS stores:
                    <ul className="list-disc mb-2">
                      <li>The domain or URL.</li>
                      <li>The reason for flagging it as suspicious.</li>
                      <li>
                        The timestamp of when it was added to LCS's database.
                      </li>
                    </ul>
                    LCS does <span className="text-red-600 font-bold">NOT</span>{" "}
                    collect or store any other personally identifiable
                    information from users.
                  </ol>
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>How LCS Uses Your Information</strong>
                  </li>
                  LCS uses the information it collects solely for the following
                  purposes:
                  <ul className="list-disc">
                    <li>
                      <strong>Analysis:</strong> Analyze the provided domain or
                      URL to determine if it is suspicious.
                    </li>
                    <li>
                      <strong>Logging Suspicious Domains:</strong> The purpose
                      of maintaining a database of suspicious domains is
                      security.
                    </li>
                  </ul>
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Sharing Your Information</strong>
                  </li>
                  LCS does <span className="text-red-600 font-bold">NOT</span>{" "}
                  sell, share, or disclose your information to any third
                  parties.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Your Rights and Choices</strong>
                  </li>
                  Since LCS collects minimal information, there are limited user
                  rights regarding data access or modification. However, if you
                  believe your domain or URL has been incorrectly flagged, you
                  can contact LCS to request a review.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Data Security</strong>
                  </li>
                  LCS implements reasonable measures to secure stored
                  information about flagged domains, including technical
                  safeguards to prevent unauthorized access.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Data Retention</strong>
                  </li>
                  For security purposes and to ensure the effectiveness of its
                  services, LCS retains information about flagged domains for as
                  long as necessary. Domains that are no longer relevant may be
                  removed from the database.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Changes to This Privacy Policy</strong>
                  </li>
                  LCS may update this Privacy Policy from time to time to
                  reflect changes in its practices or legal obligations. Any
                  updates will be posted on this page and will include an
                  updated effective date.
                </div>
                <div className="mb-4">
                  <li className="text-lg">
                    <strong>Contact LCS</strong>
                  </li>
                  If you have any questions or concerns about this Privacy
                  Policy or believe your domain has been flagged in error,
                  please contact LCS at:
                  <ul>
                    <li>
                      <Link
                        to="mailto:leidorf.foss@gmail.com"
                        className="red-underline"
                      >
                        Email
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://www.github.com/leidorf"
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

export default PrivacyPage;
