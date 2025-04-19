import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import OverallPage from "@/pages/Dashboard/OverallPage/OverallPage";
import CategoriesPage from "@/pages/Dashboard/CategoriesPage/CategoriesPage";
import CustomersPage from "@/pages/Dashboard/CustomersPage/CustomersPage";
import DiscountPage from "@/pages/Dashboard/DiscountPage/DiscountPage";
import FinancePage from "@/pages/Dashboard/FinancePage/FinancePage";
import ShippingPage from "@/pages/Dashboard/ShippingPage/ShippingPage";
import NotiPage from "@/pages/Dashboard/NotiPage/NotiPage";
import OrdersPage from "@/pages/Dashboard/OrdersPage/OrdersPage";
import StaffPage from "@/pages/Dashboard/StaffPage/StaffPage";
import StoragePage from "@/pages/Dashboard/StoragePage/StoragePage";
import DashboardCommon from "./containers/Dashboard/DashboardCommon";
import ErrorPage from "./pages/Dashboard/ErrorPage";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/overall" replace />
  },
  {
    path: "/dashboard",
    Component: DashboardCommon,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Navigate to="overall" replace />
      },
      {path: 'overall', Component: OverallPage},
      {path: 'staff', Component: StaffPage},
      {path: 'customers', Component: CustomersPage},
      {path: 'orders', Component: OrdersPage},
      {path: 'storage', Component: StoragePage},
      {path: 'finance', Component: FinancePage},
      {path: 'discount', Component: DiscountPage},
      {path: 'notification', Component: NotiPage},
      {path: 'categories', Component: CategoriesPage},
      {path: 'shipping', Component: ShippingPage}
    ]
  }
])

const App = () => {
  return (
    <ConfigProvider theme = {{
      token: {
        colorPrimary: "#E24C32"
      }
    }}>
      <RouterProvider router = {router}/>
    </ConfigProvider>
  )
}

export default App