import { createBrowserRouter } from "react-router-dom";
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
import UpdateArtifact from "../pages/UpdateArtifact";
import ErrorBoundary from "../components/ErrorBoundary";
import About from "../pages/About";
import Contact from "../pages/Contact";

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
        path: "about",
        element: <About />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "contact",
        element: <Contact />,
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
        path: "all-artifacts",
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
        element: <ArtifactDetails/>,
        errorElement: <ErrorBoundary />
      },
      {
        path: "update-artifact/:id",
        element: (
          <PrivateRoute>
            <UpdateArtifact />
          </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorBoundary />
  },
]);

export default router;
