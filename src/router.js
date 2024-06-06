import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";
import DataTable from "./Components/Tables/DataTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  { path: "/register", element: <Register /> },
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "/data-table",
    element: <DataTable />,
  },
]);

export default router;
