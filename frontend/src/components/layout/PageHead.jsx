import { Helmet } from "react-helmet-async";

const PageHead = ({ headTitle }) => {
  return (
    <Helmet>
      <title>{headTitle}</title>
    </Helmet>
  );
};

export default PageHead;
