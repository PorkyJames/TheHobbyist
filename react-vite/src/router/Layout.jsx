import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const showNavigation = !['/', '/signup'].includes(location.pathname);

  return (
    <>
      <ModalProvider>
        {showNavigation && <Navigation />} 
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
