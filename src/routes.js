import { Navigate, useRoutes } from 'react-router-dom';
import UserAuth from './pages/UserAuth';
import Rol from './pages/Rol';
// layouts
import DashboardLayout from './layouts/dashboard';

//
import Company from './pages/Company';
import User from './pages/Users';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Customer from './pages/Customer';
import DashboardApp from './pages/DashboardApp';
import BlogPostDetail from './sections/@dashboard/blog/BlogPostDetail';
import Home from './pages/Home';     
import UserCompanyDetail from './sections/@dashboard/blog/UserCompanyDetail';
import UserPage from './pages/UserPage';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: '', element: <Home /> },
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/user', element: <UserPage /> },
    { path: '/user/usercompanydetail', element: <UserCompanyDetail /> },
    { path: '/404', element: <NotFound /> },
    { path: '/*', element: <Navigate to="/404" /> },
    { path: '*', element: <Navigate to="/404" replace /> },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        { path: 'customer', element: <Customer /> },
        { path: 'company', element: <Company /> }, 
        { path: '/dashboard/rol', element: <Rol/> },
        { path: '/dashboard/userauth', element: <UserAuth /> },
        { path: '/dashboard/company/detail', element: <BlogPostDetail /> }],
    },

  
    
  ]);
}
