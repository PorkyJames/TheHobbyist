import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      // Set errors as an array
      setErrors(["Confirm Password field must be the same as the Password field"]);
      return;
    }
  
    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );
  
    // Assuming serverResponse.errors is an object, convert the values to an array
    if (serverResponse && serverResponse.errors) {
      const errorMessages = Object.values(serverResponse.errors);
      setErrors(errorMessages);
    } else {
      navigate("/main");
    }
  };

  const titleButton = () => {
    navigate('/')
  }

  return (
    <>

      <div className="signup-form-container">

        <button className="title-button" onClick={titleButton}>
          <h1>The Hobbyist</h1>
        </button>

        <div className="signup-card">
          <h1 className="signup-title">Sign Up</h1>
          {errors.server && <p className="error-message">{errors.server}</p>}

          <form className="signup-form" onSubmit={handleSubmit}>

          <div className="error-messages">
            {Array.isArray(errors) ? (
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            ) : (
              errors && <p className="error-message">{errors}</p>
            )}
          </div>

          <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
          </label>

          <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
          </label>

            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {errors.email && <p className="error-message">{errors.email}</p>}

            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            {errors.username && <p className="error-message">{errors.username}</p>}

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {errors.password && <p className="error-message">{errors.password}</p>}

            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

            <button type="submit">Sign Up</button>

          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
