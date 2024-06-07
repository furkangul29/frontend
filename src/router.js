import { createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Error404 from "./Components/Error404";
import DataTable from "./Components/Tables/DataTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
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
