import React, { useState } from "react";
import { useHistory } from "react-router";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";

function SellAdd({ close }) {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrormessage] = useState("");
	const [step, setStep] = useState("a");
	const [listingDetails, setListingDetails] = useState({
		firstName: "",
		lastName: "",
		mobileNumber: "",
		emailAddress: "",
		surname: "",
		Nationality: "",
	});
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setListingDetails({ ...listingDetails, [name]: value });
		console.log(listingDetails);
	};

	const currentStep = () => {
		if (step == "a") {
			setStep("b");
			return;
		}
		if (step == "b") {
			close(true);
			history.push("/buy");
			return;
		}
	};
	const submitListingDetails = async (e) => {
		e.preventDefault();
		setLoading(true);
		var data = await Fetch("", "post", listingDetails);

		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);
			currentStep();
		}
	};
	return (
		<div>
			<div className="top-section">
				<div className="back">
					<i className="fas fa-chevron-left" />
					<span
						className="backs"
						onClick={
							step == "b"
								? () => {
										setStep("a");
								  }
								: close
						}
					>
						Back
					</span>
				</div>
				<div className="logo">
					<img src="asset/logo.png" alt="Logo" />
				</div>
			</div>
			{step == "a" ? (
				<form className="content-section mt-4" onSubmit={submitListingDetails}>
					<div className="input-box">
						<div className="input-label">Name</div>
						<input
							type="text"
							className="formfield"
							placeholder="Give your listing a name that makes it easy to find"
							name="firstName"
							onChange={handleOnChange}
						/>
					</div>
					<div className="input-box">
						<div className="input-label">Type</div>
						<div className="select-box">
							<select className="formfield">
								<option value="" selected disabled>
									Choose a property type
								</option>
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Propert Title</div>
						<div className="select-box">
							<select className="formfield">
								<option value="" selected disabled>
									Certificate of Occupancy, Governor’s Consent etc
								</option>
							</select>
							<div className="arrows" />
						</div>
					</div>

					<div className="input-box">
						<div className="input-label">State</div>
						<div className="select-box">
							<select className="formfield">
								<option value="" selected disabled>
									What state in Nigeria do you want the property
								</option>
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Locality (Optional)</div>
						<div className="select-box">
							<select className="formfield">
								<option value="" selected disabled>
									Choose a locality
								</option>
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Area (Optional)</div>
						<div className="select-box">
							<select className="formfield">
								<option value="" selected disabled>
									Choose an area
								</option>
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Map</div>
						<div className="select-box">
							<select className="formfield">
								<option value="" selected disabled>
									Add a map
								</option>
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div class="input-box">
						<div class="input-label">Description</div>
						<textarea
							type="text"
							class="formfield textarea"
							cols="10"
							placeholder="Description"
						>
							{/* Description */}
						</textarea>
					</div>
					<div className="checkbox">
						<input
							type="checkbox"
							id="sell"
							name="firstName"
							onChange={handleOnChange}
						/>
						<label htmlFor="sell" className="checktext">
							I want to sell myself
						</label>
					</div>
					<div className="checkbox">
						<input
							type="checkbox"
							id="buy"
							name="firstName"
							onChange={handleOnChange}
						/>
						<label htmlFor="buy" className="checktext">
							Help me sell
						</label>
						<i className="fas fa-info-circle ml-2" />
					</div>
					<button className="secondary-btn" onClick={currentStep}>
						Next
					</button>
				</form>
			) : step == "b" ? (
				<form className="content-section mt-4" onSubmit={submitListingDetails}>
					<div className="input-box">
						<div className="input-label">Price</div>
						<input type="text" className="formfield mb-3" placeholder="₦0.00" />
					</div>
					<button className="do-upload">
						<input type="file" className="upload" />
						<i className="far fa-image" />
						Upload pictures
					</button>
					<button className="do-upload">
						<input type="file" className="upload" />
						<i className="far fa-video" />
						Upload videos
					</button>
					<div className="counter-pad">
						<div className="counter-label">Bedrooms</div>
						<div className="counter-box">
							<button className="countbtn">-</button>
							<div className="countbox">1</div>
							<button className="countbtn">+</button>
						</div>
					</div>
					<div className="counter-pad">
						<div className="counter-label">Bathrooms</div>
						<div className="counter-box">
							<button className="countbtn">-</button>
							<div className="countbox">1</div>
							<button className="countbtn">+</button>
						</div>
					</div>
					<div className="joint-btn mg">
						<button className="no-color-btn draft">Save as Draft</button>
						<button className="color-btn draft">
							{loading ? <Spinner /> : "Submit"}
						</button>
					</div>
				</form>
			) : null}
		</div>
	);
}

export default SellAdd;
