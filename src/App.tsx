import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import { UserInfo } from "./pages/UserInfo";
import { User } from "./pages/User";
import "./index.css";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Write } from "./pages/Write";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Footer } from "./components/Footer";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/user/:id",
        element: <UserInfo />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const App = () => {
  return (
    <div className="app">
      <div className="min-h-screen mx-auto">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};
