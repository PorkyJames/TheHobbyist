import { createBrowserRouter } from 'react-router-dom';

import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import MainPage from '../components/MainPage';
import CreateHobbyForm from '../components/CreateHobbyForm/CreateHobbyForm';
import ManageHobbies from '../components/ManageHobbies/ManageHobbies';
import UpdateHobbyForm from '../components/UpdateHobbyForm/UpdateHobbyForm';
import AllHobbiesPage from '../components/AllHobbiesPage/AllHobbiesPage';
import HobbyDetailsPage from '../components/HobbyDetailsPage/HobbyDetailsPage';
import UserProfilePage from '../components/UserProfilePage/UserProfilePage';
import ManageReviews from "../components/ManageReviews/ManageReviews";

import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LoginFormPage />,
      },
      // {
      //   path: "main",
      //   element: <h1>Welcome!</h1>,
      // },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "hobby-form",
        element: <CreateHobbyForm />,
      },
      {
        path: "/hobbies",
        element: <AllHobbiesPage />,
      },
      {
        path: "/hobbies/current",
        element: <ManageHobbies />,
      },
      {
        path: "/hobbies/:hobbyId",
        element: <HobbyDetailsPage />,
      },
      {
        path: "/hobbies/:hobbyId/edit",
        element: <UpdateHobbyForm />,
      },
      {
        path: "/profiles/:profileId",
        element: <UserProfilePage />,
      },
      {
        path: "/reviews/current",
        element: <ManageReviews />,
      },
    ],
  },
]);
