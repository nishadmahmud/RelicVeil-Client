import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
const NotFound = () => <div>Not Found</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, children: [
      { path: "/", element: <Home /> },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
