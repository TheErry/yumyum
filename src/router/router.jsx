import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Order from "../pages/Order";
import Eta from "../pages/Eta";
import Receipt from "../pages/Receipt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/eta",
    element: <Eta />,
  },
  {
    path: "/receipt",
    element: <Receipt />,
  },
]);

export default router;
