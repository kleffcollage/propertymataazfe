import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Nav from "../../Components/Navs/Nav";
import { MainContext } from "../../Context/MainContext";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";

function Login() {
	const history = useHistory();
	const { data, setUser, setApplication } = useContext(MainContext);
	const [errorMessage, setErrorMessage] = useState("");
	const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({ Password: [], Email: [] });
	const [ isVisible, setIsVisible ] = useState(false);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setLoginDetails({ ...loginDetails, [name]: value });
		console.log(loginDetails);
	};
	
	const togglePasswordVisibility = () => {
		setIsVisible(!isVisible);
	}
	
	const getApplicationTypes = async () => {
		try {
		  let { data } = await Fetch("Application/types");
		//   data = await data.json();
		  setApplication(data);
		} catch (error) {
		  console.log(error);
		}
	  };
	
	const logUserIn = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
		var data = await Fetch("user/token", "post", loginDetails);
		console.log(data);

		if (!data.status) {
			setLoading(false);
			setErrorMessage(data.message);
			return;
		}

		if (data.status != "400") {
			setLoading(false);
			localStorage.clear();
			localStorage.setItem("token", data.data.token);
			setUser(data.data);
			localStorage.setItem("user", JSON.stringify(data.data));
			history.push("/buy");
			return;
		}
		handleValidationErrors(data.errors);
		setLoading(false);
		} catch (error) {
			console.log(error);
		}
		
	};

	const handleValidationErrors = (errors) => {
		var ValidationErrors = errors;
		setErrors({ ...errors, ...ValidationErrors });
	};

	return (
		<>
			<Nav />
			<div className="container-fluid align">
				<div className="container fit-it">
					<div className="row">
						<div className="col-lg-6">
							<div className="login-image">
								<img src="/asset/buyorsell.png" alt="Login Image" />
							</div>
						</div>
						<div className="col" />
						<div className="col-lg-5">
							<div className="fit-it">
								{errorMessage ? (
									<div className="text-center mb-2">
										<span className="text-danger text-center">
											{errorMessage}
										</span>
									</div>
								) : null}
								<form onSubmit={logUserIn}>
									{errors ? (
										<div className="text-center mb-2">
											<span className="text-danger text-center">
												{errors.Email.map((error, index) => {
													return <span>{error}</span>;
												})}
											</span>
										</div>
									) : null}
									<div className="input-box">
										<div className="input-label">Username</div>
										<input
											type="text"
											className="formfield"
											placeholder="Enter your username"
											name="email"
											onChange={handleOnChange}
										/>
									</div>
									{errors ? (
										<div className="text-center mb-2">
											<span className="text-danger text-center">
												{errors.Password.map((error, index) => {
													return <span>{error}</span>;
												})}
											</span>
										</div>
									) : null}
									<div className="input-box">
										<div className="input-label">Password</div>
										<input
											type={ isVisible ? "true" : "password"}
											className="formfield pass"
											placeholder="*  *  *  *"
											name="password"
											onChange={handleOnChange}
										/>
										<i className={`fa ${ isVisible ? "fa-eye" : "fa-eye-slash" } toggle-password`} onClick={() => togglePasswordVisibility()}></i>
									</div>
									<button className="secondary-btn" type="submit">
										{loading ? <Spinner /> : "Login"}
									</button>
								</form>
								<Link to="/login/reset" className="forgot-pass">
									Forget Password
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
