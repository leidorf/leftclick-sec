import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageHead from "../components/layout/PageHead";

const AboutPage = () => {
  return (
    <Layout>
      <PageHead headTitle="About - LeftClick Sec"></PageHead>
      <div className="text-2xl max-w-xl min-w-60">
        <h1 className="text-4xl">About LeftClick Sec</h1>
        <div className="border-t pt-4 mt-4 border-neutral-300 dark:border-neutral-200/10 max-w-sm"></div>
        <div>
          <p>What is LeftClick Sec?</p>
          <p className="text-sm mt-2">
            LeftClick Sec is a lightweight, anonymous URL phishing scanner that
            uses machine learning and is released under the GPLv3 license. You
            can view the source code on{" "}
            <Link
              to="https://github.com/leidorf/leftclick-sec"
              target="_blank"
              className="red-underline"
            >
              GitHub
            </Link>
            .
          </p>
          <p className="mt-8">How LeftClick Sec is anonymous?</p>
          <p className="text-sm mt-2">
            LeftClick Sec does{" "}
            <span className="text-red-600 font-bold">NOT</span> collect, share
            or distribute any user data. You can find out more in the{" "}
            <Link to="/privacy" className="red-underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
