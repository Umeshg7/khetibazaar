import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Products from "../pages/shop/Products";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import ErrorPage from "../../public/error";
import ProductDetail from "../components/ProductDetails";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products/>,
        },
        {
          // Use a dynamic parameter for ProductDetails
          path: "/products/:id", // This will allow you to pass product ID in the URL
          element: <ProductDetail />,
        },
        {
          path: "/cart-page",
          element: <PrivateRouter><CartPage /></PrivateRouter>,
        },
        {
          path: "/error",
          element: <ErrorPage />,
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />,
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: 'dashboard',
      element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
      children: [
        {
          path: '' ,
          element:<Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>
        }
      ]
    }
    
]);

export default router;
