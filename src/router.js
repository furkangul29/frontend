import { createBrowserRouter } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  { path: "/register", element: <Register /> },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
