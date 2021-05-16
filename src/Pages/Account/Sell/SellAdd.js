import React, { useState } from "react";
import { useHistory } from "react-router";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";

function SellAdd({ close }) {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrormessage] = useState("");
	const [step, setStep] = useState("a");
	const [bedroomCounter, setBedroomCounter] = useState(1);
	const [bathroomCounter, setBathroomCounter] = useState(1);
	const [listingDetails, setListingDetails] = useState({
		name: "",
		title: "",
		address: "",
		description: "",
		sellMyself: true,
		price: 0,
		numberOfBedrooms: 0,
		numberOfBathrooms: 0,
		isDraft: true,
		isActive: true,
		isForRent: true,
		isForSale: true,
		propertyTypeId: 0,
	});
	const [details, setDetails] = useState([]);
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setListingDetails({ ...listingDetails, [name]: value });
		console.log(listingDetails);
	};

	const bedIncrement = (e) => {
		e.preventDefault();
		setBedroomCounter(bedroomCounter + 1);
	};
	const bedDecrement = (e) => {
		e.preventDefault();
		setBedroomCounter((bedroomCounter) => Math.max(bedroomCounter - 1, 1));
	};
	const bathIncrement = (e) => {
		e.preventDefault();
		setBathroomCounter(bathroomCounter + 1);
	};
	const bathDecrement = (e) => {
		e.preventDefault();
		setBathroomCounter((bathroomCounter) => Math.max(bathroomCounter - 1, 1));
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
		var data = await Fetch("Property/create", "post", listingDetails);

		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);
			currentStep();
			setDetails();
			setListingDetails({});
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
							name="name"
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
								{details.map((singlelisting, i) => {
									return (
										<option value={singlelisting.propertyTypeId}>
											{singlelisting.propertyType}
										</option>
									);
								})}
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Property Title</div>
						<input
							type="text"
							className="formfield"
							placeholder="Give your listing a name that makes it easy to find"
							name="title"
							onChange={handleOnChange}
						/>
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
							name="description"
							onChange={handleOnChange}
						>
							{/* Description */}
						</textarea>
					</div>
					<div className="checkbox">
						<input
							type="checkbox"
							id="sell"
							name="sellMyself"
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
						<input
							type="text"
							className="formfield mb-3"
							placeholder="₦0.00"
							name="price"
							onChange={handleOnChange}
						/>
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
							<button className="countbtn" onClick={bedDecrement}>
								-
							</button>
							<input
								className="countbox"
								value={bedroomCounter}
								name="numberOfBedrooms"
								onChange={handleOnChange}
							/>
							<button className="countbtn" onClick={bedIncrement}>
								+
							</button>
						</div>
					</div>
					<div className="counter-pad">
						<div className="counter-label">Bathrooms</div>
						<div className="counter-box">
							<button className="countbtn" onClick={bathDecrement}>
								-
							</button>
							<input
								className="countbox"
								value={bathroomCounter}
								name="numberOfBathrooms"
								onChange={handleOnChange}
							/>
							<button className="countbtn" onClick={bathIncrement}>
								+
							</button>
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
