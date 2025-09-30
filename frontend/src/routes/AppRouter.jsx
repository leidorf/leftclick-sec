import { Navigate } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import AddOnPage from "../pages/AddOnPage";
import HomePage from "../pages/HomePage";
import PrivacyPage from "../pages/PrivacyPage";
import NotFoundPage from "../pages/404";

const routes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "add-on",
    element: <AddOnPage />,
  },
  {
    path: "privacy",
    element: <PrivacyPage />,
  },
  {
    path: "404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

const AppRouter = [
  {
    path: "/",
    children: routes,
  },
];

export default AppRouter;
