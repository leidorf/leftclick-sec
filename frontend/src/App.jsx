import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(AppRouter);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </HelmetProvider>
  );
}

export default App;
