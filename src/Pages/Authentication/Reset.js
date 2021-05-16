import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Components/Navs/Nav";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";

function Reset(props) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [emailsent, setEmailSent] = useState(false);
	const [errors, setErrors] = useState({ Password: [], Email: [] });
	const [errormessage, setErrormessage] = useState("");
	const [resetDone, setResetDone] = useState(false);
	const [newPassword, setNewPassword] = useState({
		code: "",
		newPassword: "",
	});

	const initiateReset = async (e) => {
		e.preventDefault();
		setLoading(true);
		var data = await Fetch(`User/reset/initiate/${email}`, "get");
		console.log(data);
		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);
			setEmailSent(true);
			return;
		}
		handleValidationErrors(data.errors);
		setLoading(false);
	};
	const resetComplete = async (e) => {
		e.preventDefault();
		setLoading(true);
		var data = await Fetch("User/reset/complete", "post", newPassword);
		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);
			setResetDone(true);
			return;
		}
		handleValidationErrors(data.errors);
		setLoading(false);
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
								<img src="/asset/log.jpg" alt="Login Image" />
							</div>
						</div>
						<div className="col" />
						<div className="col-lg-5">
							<div className="fit-it">
								{!emailsent ? (
									<>
										{errors ? (
											<div className="text-center mb-2">
												<span className="text-danger text-center">
													{errors.Email.map((error, index) => {
														return <span>{error}</span>;
													})}
												</span>
											</div>
										) : null}
										<form onSubmit={initiateReset}>
											<div className="input-box">
												<div className="input-label">Email Address</div>
												<input
													type="text"
													className="formfield"
													placeholder="Enter your email address"
													name="email"
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
											<button className="secondary-btn" type="submit">
												{loading ? <Spinner /> : "Get Reset Code"}
											</button>
										</form>
									</>
								) : (
									<div className="infoo">
										An email has been sent to you with instructions and next
										steps
									</div>
								)}
								{emailsent && !resetDone ? (
									<>
										{errors ? (
											<div className="text-center mb-2">
												<span className="text-danger text-center">
													{errors.Password.map((error, index) => {
														return <span>{error}</span>;
													})}
												</span>
											</div>
										) : null}
										<form onSubmit={resetComplete}>
											<div className="input-box">
												<div className="input-label">Set New Password</div>
												<input
													type="password"
													className="formfield pass"
													placeholder="*  *  *  *"
													name="password"
													onChange={(e) =>
														setNewPassword({
															...newPassword,
															password: e.target.value,
														})
													}
												/>
											</div>
											<button className="secondary-btn" type="submit">
												{loading ? <Spinner /> : "Reset Password"}
											</button>
										</form>
									</>
								) : null}
								{emailsent && resetDone ? (
									<>
										<div className="infoo">
											Your Password reset was successful!
										</div>
										<Link to="/login">
											<button className="secondary-btn" type="submit">
												{loading ? <Spinner /> : "Go to Login"}
											</button>
										</Link>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Reset;
