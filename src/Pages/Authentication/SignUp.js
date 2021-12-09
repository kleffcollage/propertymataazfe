import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../Components/Navs/Nav";
import { MainContext } from "../../Context/MainContext";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";

function SignUp() {
	const { data, setUser } = useContext(MainContext);
	const [errormessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState("a");
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [token, setToken] = useState("");
	const [errors, setErrors] = useState({
		Password: [],
		Email: [],
		PhoneNumber: [],
		PhoneNumber1: [],
	});
	// const [offset,setOffset] = useState(0);
	// const [limit,setLimit] = useState(20);
	// const [nextUrl,setNextUrl] = useState("");
	// const [previousUrl,setPreviousUrl] = useState("");
	const [userDetails, setUserDetails] = useState({
		firstName: "",
		lastName: "",
		companyName: "",
		email: "",
		mobileNumber: "",
		phoneNumber: "",
		password: "",
		repeatPassword: "",
	});
	const setCurrentStep = (e) => {
		if (step == "a") {
			setStep("b");
		} else if (step == "b") {
			setStep("c");
		}
		e.preventDefault();
	};
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	// 	const gotoNextPage = () =>{
	// listUsers(nextUrl);
	// 	}

	// 	const listUsers = (url = `users/list?offset=${offset}&limit=${limit}`) =>{
	// 		setNextUrl(data.next.href.split('api/')[1])

	// 	}

	const registerUser = async (e) => {
		setLoading(true);
		e.preventDefault();
		var data = await Fetch("User/register", "post", userDetails);
		
		if (!data.status) {
			setLoading(false);
			setErrorMessage(data.message);
			return;
		}
		if (data.status != "400") {
			setLoading(false);
			setStep("b");
		}
		handleValidationErrors(data.errors);
		setLoading(false);
	};
	
	const verifyUser = async (e) => {
		setLoading(true);
		setErrorMessage('')
		e.preventDefault();
		let data = await Fetch(
			`User/verifyUser/${token}/${userDetails.email}`,
			"get"
		);
		
		if (!data.status) {
			setLoading(false);
			setErrorMessage(data.message);
			return;
		}
		if (data.status != "400") {
			setLoading(false);
			setStep("c");
		}
		handleValidationErrors(data.errors);
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
							<h1 className="intro-text">
								Enter your very own Property One-stop shop!
							</h1>
							<div className="login-image">
								<img src="/asset/buyorsell.png" alt="signupimage" />
							</div>
						</div>
						<div className="col" />
						<div className="col-lg-5">
							{errormessage ? (
								<div className="text-center mb-2">
									<span className="text-danger text-center">
										{errormessage}
									</span>
								</div>
							) : null}
							<div className="">
								{step == "a" ? (
									<form
										className="mt-4"
										onSubmit={async (e) => await registerUser(e)}
									>
										<div className="input-box">
											<div className="input-label">First Name</div>
											<input
												type="text"
												className="formfield"
												placeholder="Type in your first name"
												name="firstName"
												onChange={handleOnChange}
											/>
										</div>
										<div className="input-box">
											<div className="input-label">Surname</div>
											<input
												type="text"
												className="formfield"
												placeholder="Type in your surname"
												name="lastName"
												onChange={handleOnChange}
											/>
										</div>
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
											<div className="input-label">Email</div>
											<input
												type="text"
												className="formfield"
												placeholder="Type in your email"
												name="email"
												onChange={handleOnChange}
											/>
										</div>
										<div className="input-box">
											<div className="input-label">Company Name</div>
											<input
												type="text"
												className="formfield"
												placeholder="Type in your company's name"
												name="companyName"
												onChange={handleOnChange}
											/>
										</div>
										{errors ? (
											<div className="text-center mb-2">
												<span className="text-danger text-center">
													{errors.PhoneNumber.map((error, index) => {
														return <span>{error}</span>;
													})}
												</span>
											</div>
										) : null}
										<div className="input-box">
											<div className="input-label">Mobile Number</div>
											<input
												type="text"
												className="formfield"
												placeholder="Type in your mobile number"
												name="mobileNumber"
												onChange={handleOnChange}
											/>
										</div>
										{errors ? (
											<div className="text-center mb-2">
												<span className="text-danger text-center">
													{errors.PhoneNumber1.map((error, index) => {
														return <span>{error}</span>;
													})}
												</span>
											</div>
										) : null}
										<div className="input-box">
											<div className="input-label">Mobile Number 2</div>
											<input
												type="text"
												className="formfield"
												placeholder="Type in your mobile number"
												name="phoneNumber2"
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
											<div className="input-label">Create a password</div>
											<input
												type="password"
												className="formfield pass"
												placeholder="*  *  *  *"
												name="password"
												onChange={handleOnChange}
											/>
										</div>
										{!passwordMatch ? (
											<div className="infoo">Your Password does not match </div>
										) : (
											""
										)}
										<div className="input-box">
											<div className="input-label">Repeat your password</div>
											<input
												type="password"
												className="formfield pass"
												placeholder="*  *  *  *"
												name="repeatPassword"
												onChange={(e) =>
													e.target.value !== userDetails.password
														? setPasswordMatch(false)
														: setPasswordMatch(true)
												}
											/>
										</div>
										<button
											className="secondary-btn"
											type="submit"
											// onClick={setCurrentStep}
										>
											{loading ? <Spinner /> : "Sign Up"}
										</button>
									</form>
								) : step == "b" ? (
									<>
										<h4 className="infoo">
											A confirmation mail was sent to you. Please check you mail
											to verify your account.
										</h4>
										{/* {errormessage ? errormessage : ""} */}
										<form onSubmit={async (e) => await verifyUser(e)}>
											<div className="input-box">
												<div className="input-label">
													Enter Verification Code
												</div>
												<input
													type="text"
													className="formfield"
													placeholder="Enter verification code here"
													name="verification"
													onChange={(e) => {
														setToken(e.target.value);
													}}
												/>
											</div>
											<button className="secondary-btn" type="submit">
												{loading ? <Spinner /> : "Verify"}
											</button>
										</form>
									</>
								) : (
									<div>
										<h4 className="infoo text-center">
											Your Account has been verified succesfully
										</h4>
										<Link to="/login" className="secondary-btn mt-3">
											Go to login
										</Link>
									</div>
								)}
								{/* <div className="or">or</div>
								<button className="other-signup">
									<img src="/asset/google.svg" alt />
									<span>Log in with Google</span>
								</button>
								<button className="other-signup">
									<img src="/asset/google.svg" alt />
									<span>Log in with Google</span>
								</button> */}
								<div className="line" />
								<div className="create-text">
									By creating an account you agree to our{" "}
								</div>
								<div className="tc">
									<a href> Terms &amp; Conditions</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUp;
