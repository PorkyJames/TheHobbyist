import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse && serverResponse.errors) {
      // Assuming the errors from the server are in the form of an object
      // with keys as the field names and values as the error messages
      const errorMessages = Object.values(serverResponse.errors);
      setErrors(errorMessages);
    } else {
      navigate("/");
    }
  };

  const handleSignUp = () => {
    navigate("/signup"); 
  };

  return (
    <>

			<div className="login-form-container">
				<div className="login-card">

					<h1 className="login-title">
						The Hobbyist
					</h1>

					<form onSubmit={handleSubmit}>
						<div className="error-messages">
							<ul>
								{errors.map((error, idx) => (
									<li key={idx}>{error}</li>
								))}
							</ul>
						</div>

						<div className="input-group">
							<label>
							Email
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							</label>
						</div>
					
						<div className="input-group">
							<label>
							Password
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							</label>
						</div>
						
						<div className="button-group">
							<button type="submit">Log In</button>
						</div>

            <div className="sign-up-button">
              <button type="signup" onClick={handleSignUp}>Sign Up</button>
            </div>

					</form>
				</div>
			</div>
		</>
  );
}

export default LoginFormPage;
