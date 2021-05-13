import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import Nav from "../../Components/Navs/Nav";
import { MainContext } from "../../Context/MainContext";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";

function Login() {
	const history = useHistory();
	const { data, setUser } = useContext(MainContext);
	const [errorMessage, setErrorMessage] = useState("");
	const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({ Password: [], Email: [] });

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setLoginDetails({ ...loginDetails, [name]: value });
		console.log(loginDetails);
	};
	const logUserIn = async (e) => {
		setLoading(true);
		e.preventDefault();
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
			history.push("/welcome");
			return;
		}
		handleValidationErrors(data.errors);
		setLoading(false);
	};

	const handleValidationErrors = (errors) => {
		var ValidationErrors = data.errors;
		setErrors({ ...errors, ...ValidationErrors });
	};

	return (
		<>
			<Nav />
			<div className="container-fluid">
				<div className="container fit-it">
					<div className="row">
						<div className="col-lg-6">
							<div className="display-image">
								<img src alt="Login Image" />
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
											type="password"
											className="formfield pass"
											placeholder="*  *  *  *"
											name="password"
											onChange={handleOnChange}
										/>
									</div>
									<button className="secondary-btn" type="submit">
										{loading ? <Spinner /> : "Login"}
									</button>
								</form>
								<button className="forgot-pass">Forget Password</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
