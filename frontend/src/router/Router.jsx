import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import Products from '../pages/shop/Products';
import Signup from '../components/Signup';
import PrivateRouter from '../PrivateRouter/PrivateRouter';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import CartPage from '../pages/shop/CartPage';
import ErrorPage from '../../public/error';
import ProductDetail from '../components/ProductDetails';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboard/admin/Dashboard';
import Users from '../pages/dashboard/admin/Users';
import Login from '../components/Login';
import AboutUs from '../components/AboutUs';
import ScrollToTop from '../components/ScrollToTop'; // Importing ScrollToTop
import AddMenu from '../pages/dashboard/admin/AddMenu';
import ManageItems from '../pages/dashboard/admin/ManageItems';
import UpdateMenu from '../pages/dashboard/admin/UpdateMenu';
import Payment from '../pages/menuPage/Payment';
import Order from '../pages/dashboard/Order';
import Vegetable from '../pages/shop/Vegetable';
import Fruit from '../pages/shop/Fruit';
import EggandMeat from '../pages/shop/EggandMeat';
import Drink from '../pages/shop/Drink';
import Grain from '../pages/shop/Grain';
import Favorites from "../components/Favorites"
import AddChatMessage from '../pages/dashboard/admin/AddChatMessage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop /> 
        <Main /> 
      </>
    ),
    
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />, // Products listing
      },

      {
        path: '/products/:id',
        element: <ProductDetail />, // Product details with dynamic ID
      },
      {
        path: '/cart-page',
        element: (
          <PrivateRouter>
            <CartPage /> {/* Cart page, accessible only to logged-in users */}
          </PrivateRouter>
        ),
      },
      {
        path: '/update-profile',
        element: <UpdateProfile />, // Update profile page
      },
      {
        path: '/aboutus',
        element: <AboutUs />, // About Us page
      },
      {
        path: '/process-checkout',
        element: <Payment/>,
      },
      {
        path: '/order',
        element: <Order/>,
      },
      {
        path: '/vegetables',
        element: <Vegetable/>,
      },
      {
        path: '/fruits',
        element: <Fruit/>,
      },
      {
        path: '/grains',
        element: <Grain/>,
      },
      {
        path: '/eggandmeat',
        element: <EggandMeat/>,
      },
      {
        path: '/drinks',
        element: <Drink/>,
      },
      {
        path: '/favorite',
        element: <Favorites/>,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />, // Signup page
  },
  {
    path: '/login',
    element: <Login />, // Login page
  },
  {
    path: '/error',
    element: <ErrorPage />, // Error page
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <DashboardLayout /> {/* Dashboard layout, only accessible to logged-in users */}
      </PrivateRouter>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />, // Dashboard home page
      },
      {
        path: 'users',
        element: <Users />, // Users management page
      },
      {
        path: 'add-menu',
        element: <AddMenu/>,
      },
      {
        path: 'add-message',
        element: <AddChatMessage/>,
      },
      {
        path: 'manage-items',
        element: <ManageItems/>,
      },
      
      {
        path: 'update-menu/:id',
        element: <UpdateMenu/>,
        loader: ({params}) => fetch(`http://localhost:678/menu/${params.id}`)
      },
    ],
    
  },
]);

export default router;
