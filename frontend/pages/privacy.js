import Layout from "./components/layout/Layout";
import PageHead from "./components/layout/PageHead";

const Privacy = () => {
  return (
    <>
      <Layout>
        <PageHead headTitle="Privacy | LeftClick Sec"></PageHead>
        <div className="flex justify-around ml-36">
          <div className="text-pretty max-w-2xl">
            <h1 className="text-4xl">Privacy Policy</h1>
            <div className="border-t pt-4 mt-4 border-slate-200/50 max-w-sm"></div>
            <div className="text-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </Layout>
    </>
  );
};

export default Privacy;
