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
	const [code, setCode] = useState("");
	const [userDetails, setUserDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
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
		console.log(userDetails);
	};
	const registerUser = async (e) => {
		setLoading(true);
		e.preventDefault();
		var data = await Fetch("User/register", "post", userDetails);
		if (data.status) {
			setLoading(false);
			setStep("b");
		} else {
			setLoading(false);
			console.log(data.message);
		}
	};
	const verifyUser = async (e) => {
		setLoading(true);
		e.preventDefault();
		console.log(code);
		let data = await Fetch("User/verifyUser/{token}/{email}", "get", {
			code,
		});
		console.log(data);
		if (data.status) {
			setLoading(false);
			setStep("e");
		} else {
			setLoading(false);
			setErrorMessage(data.message);
		}
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
							<div className="display-image">
								<img src alt="signupimage" />
							</div>
						</div>
						<div className="col" />
						<div className="col-lg-5">
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
											<div className="input-label">Mobile Number</div>
											<input
												type="text"
												className="formfield"
												placeholder="Type in your mobile number"
												name="mobileNumber"
												onChange={handleOnChange}
											/>
										</div>
										<div className="input-box">
											<div className="input-label">Create a password</div>
											<input
												type="text"
												className="formfield pass"
												placeholder="*  *  *  *"
												name="createpassword"
												onChange={handleOnChange}
											/>
										</div>
										<div className="input-box">
											<div className="input-label">Repeat your password</div>
											<input
												type="text"
												className="formfield pass"
												placeholder="*  *  *  *"
												name="repeatPassword"
												onChange={handleOnChange}
											/>
										</div>
										<button className="secondary-btn">
											{loading ? <Spinner /> : "Sign Up"}
										</button>
									</form>
								) : step == "b" ? (
									<>
										<h4 className="infoo">
											A confirmation mail was sent to you. Please check you mail
											to verify your account.
										</h4>
										{errormessage ? errormessage : ""}
										<form onSubmit={async (e) => await registerUser(e)}>
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
														setCode(e.target.value);
													}}
												/>
											</div>
											<button className="secondary-btn" onClick={verifyUser}>
												{loading ? <Spinner /> : "Verify"}
											</button>
										</form>
									</>
								) : (
									<div>
										<h4 className="infoo text-center">
											Your Account has been verified succesfully
										</h4>
										<Link className="primary-btn">Go to login</Link>
									</div>
								)}
								<div className="or">or</div>
								<button className="other-signup">
									<img src="/asset/google.svg" alt />
									<span>Log in with Google</span>
								</button>
								<button className="other-signup">
									<img src="/asset/google.svg" alt />
									<span>Log in with Google</span>
								</button>
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