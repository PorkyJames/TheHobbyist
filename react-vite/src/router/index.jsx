import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginFormPage />,
      },
      {
        path: "main",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
