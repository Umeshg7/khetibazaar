import { createBrowserRouter } from "react-router-dom";
import Main  from "../layout/Main";
import Home from "../pages/home/Home";
import Products from "../pages/shop/Products";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import ErrorPage from "../../public/error";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../pages/dashboard/admin/Users";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import AboutUs from "../pages/AboutUs";
import SearchResults from "../pages/SearchResults";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children : [
        {
            path : "/",
            element : <Home/>
        },
        {
          path :"/Products",
          element : <PrivateRouter><Products/></PrivateRouter>
        },
        {
           path: "/aboutus",
           element: <PrivateRouter><AboutUs/></PrivateRouter>
        },
        {
          path : "/cart-page",
          element :<PrivateRouter><CartPage/></PrivateRouter>

        },
        {
          path : "/error",
          element : <ErrorPage/>

        },

        {
          path : "//update-profile",
          element : <UpdateProfile/>
        }
      ],
    },
    {
      path : "/signup",
      element: <Signup/>
    },
    {
      path : "/search-page",
      element : <SearchResults/>
    },
    {
      path: 'dashboard',
      element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>
        }
      ]
    }
  ]);

export default router;