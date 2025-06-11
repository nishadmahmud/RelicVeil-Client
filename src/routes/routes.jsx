import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllArtifacts from "../pages/AllArtifacts";
import AddArtifacts from "../pages/AddArtifacts";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../pages/Profile";
import MyArtifacts from "../pages/MyArtifacts";
import LikedArtifacts from "../pages/LikedArtifacts";
import ArtifactDetails from "../pages/ArtifactDetails";
import ErrorBoundary from "../components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { 
        path: "/", 
        element: <Home />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "register",
        element: <Register />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "all-arrifacts",
        element: <AllArtifacts />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "add-artifact",
        element: (
          <PrivateRoute>
            <AddArtifacts />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />
      },
      {
        path: "my-artifacts",
        element: (
          <PrivateRoute>
            <MyArtifacts />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />
      },
      {
        path: "liked-artifacts",
        element: (
          <PrivateRoute>
            <LikedArtifacts />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />
      },
      {
        path: "artifact-details/:id",
        element: (
          <PrivateRoute>
            <ArtifactDetails/>
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorBoundary />
  },
]);

export default router;
