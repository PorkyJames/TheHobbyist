import { useState, useEffect, useRef,  } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";

import './Navigation.css';

// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  // const userId = useSelector((store) => store.session.user.id)
  // console.log(userId, "<<<<<<<<<userId")

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  const homeButton = () => {
    navigate("/main");
    setShowMenu(false);
  }

  const userProfile = () => {
    if (user.id) {
      navigate(`/profiles/${user.id}`);
      setShowMenu(false);
    } else {
      // Handle the case where userId is not available
      console.error("User ID is undefined.");
    }
  };

  const manageHobbies = () => {
    navigate('/hobbies/current');
    setShowMenu(false);
  };

  // const manageBookmarks = () => {
  //   navigate('/manage-bookmarks');
  //   setShowMenu(false);
  // };

  // const manageReviews = () => {
  //   navigate('/reviews/current');
  //   setShowMenu(false);
  // };

  const navigateCreateHobby = () => {
    navigate("/hobby-form")
  }

  return (
  <>
    <div className="navbar-container">
      <div className="logo" onClick={homeButton}>TheHobbyist</div>
      
      <div className="navbar-right">
        <div className="create-button">
          <button onClick={navigateCreateHobby}>Create New Hobby</button>
        </div>

        <button onClick={toggleMenu} className="profile-button">
          <i className="fas fa-user-circle"></i>
        </button>
        
        {user && (
          <>
            {showMenu && (
              <ul className="profile-dropdown" ref={ulRef}>
                <li className="account-info">
                  <span className="icon">
                    <i className="fas fa-user-circle"></i>
                  </span>
                  <span className="user-details">
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                  </span>
                </li>
                <li onClick={userProfile}>User Profile</li>
                <li onClick={manageHobbies}>Manage Hobbies</li>
                {/* <li onClick={manageBookmarks}>Manage Bookmarks</li> */}
                {/* <li onClick={manageReviews}>Manage Reviews</li> */}
                <li className="logout-button" onClick={logout}>Log Out</li>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  </>
  );
}
//       {/* {showMenu && (
//         <ul className={"profile-dropdown"} ref={ulRef}>
//           {user ? (
//             <>
//               <li>{user.username}</li>
//               <li>{user.email}</li>
//               <li>
//                 <button onClick={logout}>Log Out</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <OpenModalMenuItem
//                 itemText="Log In"
//                 onItemClick={closeMenu}
//                 modalComponent={<LoginFormModal />}
//               />
//               <OpenModalMenuItem
//                 itemText="Sign Up"
//                 onItemClick={closeMenu}
//                 modalComponent={<SignupFormModal />}
//               />
//             </>
//           )} */
//     // </>
// }

export default ProfileButton;
