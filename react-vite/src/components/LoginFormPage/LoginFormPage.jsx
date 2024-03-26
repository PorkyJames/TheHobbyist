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
		const errorMessages = Object.values(serverResponse.errors);
		setErrors(errorMessages);
	} else {
		navigate("/main");
	}
};

	const handleDemoLogin = () => {
		const demoCredentials = {
			email: "demo@aa.io",
			password: "password",
		};
	
	dispatch(thunkLogin(demoCredentials)).then(() => {
		navigate("/main");
	}).catch((error) => {
		console.error("Demo login failed", error);
	});
};

const handleSignUp = () => {
    navigate("/signup");
};

const titleButton = () => {
	navigate('/')
}

return (
    <>
			<div className="title-button">
				<button onClick={titleButton}>
					<h1>The Hobbyist</h1>
				</button>
			</div>

			<div className="login-form-container">
				<div className="login-card">

					<h1 className="login-title">
						Login or Sign Up
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

						<div className="demo-login">
							<button type="demo" onClick={handleDemoLogin}>Demo-Login</button>
						</div>

					</form>
				</div>
			</div>
		</>
);
}

export default LoginFormPage;
