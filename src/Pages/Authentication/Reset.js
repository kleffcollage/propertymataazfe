import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import Nav from "../../Components/Navs/Nav";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";


function Reset(props) {
	const {code} = useParams();
	const [loading, setLoading] = useState(false);
	const [resetCode,setResetCode] = useState('');
	const [email, setEmail] = useState("");
	const [emailSent, setEmailSent] = useState(false);
	const [errors, setErrors] = useState({ Password: [], Email: [] });
	const [errorMessage, setErrorMessage] = useState("");
	const [resetDone, setResetDone] = useState(false);
	const [newPassword, setNewPassword] = useState({
		code: "",
		newPassword: "",
	});

	useEffect(() => {
		console.log(code);
		if(code) {
			setEmailSent(true) 
			setResetCode(code) 
		}
	},[])

	const initiateReset = async (e) => {
		e.preventDefault();
		setLoading(true);
		var data = await Fetch(`User/reset/initiate/${email}`, "get");
		console.log(data);
		if (!data.status) {
			setLoading(false);
			setErrorMessage(data.message);
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
		setNewPassword({...newPassword,code:code})
		var data = await Fetch("User/reset/complete", "post", {...newPassword,code:code});
		if (!data.status) {
			setLoading(false);
			setErrorMessage(data.message);
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
								{!emailSent && !resetDone ? (
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
								) : emailSent && !resetDone && !resetCode ?  (
									<div className="infoo">
										An email has been sent to you with instructions and next
										steps
									</div>
								) : null}
								{emailSent && resetCode && !resetDone ? (
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
												<p className='text-danger'>{errorMessage}</p>
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
															newPassword: e.target.value,
														})
													}
												/>
											</div>
											<div className="input-box">
												<div className="input-label">Repeat Password</div>
												<input
													type="password"
													className="formfield pass"
													placeholder="*  *  *  *"
													name="password"
													onChange={(e) =>
														{e.target.value != newPassword.newPassword ? setErrorMessage("Both passwords must match") : setErrorMessage('')}
													}
												/>
											</div>
											<button className="secondary-btn" type="submit">
												{loading ? <Spinner /> : "Reset Password"}
											</button>
										</form>
									</>
								) : null}
								{emailSent && resetCode &&  resetDone ? (
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
