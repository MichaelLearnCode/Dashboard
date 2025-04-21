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
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/Auth/LoginPage";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/overall" replace />
  },
  {
    path: "/auth",
    errorElement: <ErrorPage/>,
    children:[
      {
        path:'login',
        Component: LoginPage
      }
    ]
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
      { path: 'overall', element: <ProtectedRoute><OverallPage/></ProtectedRoute> },
      { path: 'staff', element: <ProtectedRoute><StaffPage/></ProtectedRoute> },
      { path: 'customers', element: <ProtectedRoute><CustomersPage/></ProtectedRoute> },
      { path: 'orders', element: <ProtectedRoute><OrdersPage/></ProtectedRoute> },
      { path: 'storage', element: <ProtectedRoute><StoragePage/></ProtectedRoute> },
      { path: 'finance', element: <ProtectedRoute><FinancePage/></ProtectedRoute> },
      { path: 'discount', element: <ProtectedRoute><DiscountPage/></ProtectedRoute> },
      { path: 'notification', element: <ProtectedRoute><NotiPage/></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><CategoriesPage/></ProtectedRoute> },
      { path: 'shipping', element: <ProtectedRoute><ShippingPage/></ProtectedRoute> }
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