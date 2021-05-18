import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SellAdd({ close }) {
	const history = useHistory();

	const [loading, setLoading] = useState(false);
	const [errormessage, setErrormessage] = useState("");
	const [step, setStep] = useState("a");
	const [bedroomCounter, setBedroomCounter] = useState(0);
	const [bathroomCounter, setBathroomCounter] = useState(0);
	const [errors, setErrors] = useState({
		Name: [],
		PropertyTypeId: [],
		Address: [],
		Title: [],
		State: [],
		Description: [],
		Lga: [],
		Area: [],
		Price: [],
	});
	const [listingDetails, setListingDetails] = useState({
		name: "",
		title: "",
		address: "",
		state: "",
		lga: "",
		area: "",
		description: "",
		sellMySelf: false,
		price: 0,
		numberOfBedrooms: 0,
		numberOfBathrooms: 0,
		isDraft: false,
		isActive: true,
		isForRent: false,
		isForSale: true,
		propertyTypeId: 0,
		mediafiles: [],
	});
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [states, setStates] = useState([]);
	const [lgas, setLgas] = useState([]);
	const [cities, setCities] = useState([]);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setListingDetails({ ...listingDetails, [name]: value });
		console.log(listingDetails);
	};

	const bedIncrement = (e) => {
		e.preventDefault();
		setBedroomCounter(bedroomCounter + 1);
		setListingDetails({
			...listingDetails,
			numberOfBedrooms: bedroomCounter + 1,
		});
		console.log(listingDetails);
	};

	const bedDecrement = (e) => {
		e.preventDefault();
		setBedroomCounter((bedroomCounter) => Math.max(bedroomCounter - 1, 1));
		setListingDetails({
			...listingDetails,
			numberOfBedrooms: Math.max(bedroomCounter - 1, 1),
		});
		console.log(listingDetails);
	};

	const bathIncrement = (e) => {
		e.preventDefault();
		setBathroomCounter(bathroomCounter + 1);
		setListingDetails({
			...listingDetails,
			numberOfBathrooms: bathroomCounter + 1,
		});
		console.log(listingDetails);
	};

	const bathDecrement = (e) => {
		e.preventDefault();
		setBathroomCounter((bathroomCounter) => Math.max(bathroomCounter - 1, 1));
		setListingDetails({
			...listingDetails,
			numberOfBathrooms: Math.max(bathroomCounter - 1, 1),
		});
		console.log(listingDetails);
	};

	const currentStep = () => {
		if (step == "a") {
			setStep("b");
			return;
		}
		if (step == "b") {
			close(true);
			history.push("/sell");
			return;
		}
	};

	const grabUploadedFile = (uploadedFiles) => {
		uploadedFiles.forEach((file) => {
			const reader = new FileReader();

			reader.onabort = () => {
				console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
			};
			reader.onerror = () => {
				console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
			};
			reader.onload = () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result.split(",")[1];
				console.log(reader.result);
				//console.log(binaryStr);
				console.log(binaryStr);
				composeMedia(binaryStr, file);
			};
			console.log(file);
			reader.readAsDataURL(file);
		});
	};

	const composeMedia = (bytes, file) => {
		var files = [];

		var newMedia = {
			name: file.name,
			extention: getFileExtention(file.name),
			base64String: bytes,
			propertyId: 0,
			isImage:
				getFileExtention(file.name) == "jpeg" ||
				getFileExtention(file.name) == "jpg"
					? true
					: false,
			isVideo: getFileExtention(file.name) == "mp4" ? true : false,
			isDocument: getFileExtention(file.name) == "pdf" ? true : false,
		};

		files.push(newMedia);
		console.log(files);
		setListingDetails({
			...listingDetails,
			mediafiles: [...listingDetails.mediafiles, ...files],
		});
	};

	const getFileExtention = (fileName) => {
		return fileName.split(".")[1];
	};

	const getPropertyTypes = async () => {
		try {
			const data = await Fetch("property/types", "get");
			if (!data.status) return;

			setPropertyTypes(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getStates = async () => {
		try {
			let data = await fetch(
				"http://locationsng-api.herokuapp.com/api/v1/states"
			);
			data = await data.json();
			console.log(data);
			setStates(data);
		} catch (error) {
			console.log(error);
		}
	};

	const submitListingDetails = async (e) => {
		console.log(listingDetails);
		e.preventDefault();
		setLoading(true);
		var data = await Fetch("Property/create", "post", listingDetails);
		console.log(data);
		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);

			setListingDetails({});
			const alert = () => toast(data.message);
			alert();
			currentStep();
		}
		handleValidationErrors(data.errors);
		setLoading(false);
	};

	const submitListingToDraft = async (e) => {
		console.log(listingDetails);
		e.preventDefault();
		setLoading(true);
		var data = await Fetch("Property/create", "post", listingDetails);
		console.log(data);
		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);
			setListingDetails({});
			const alert = () => toast(data.message);
			alert();
			history.push("/sell/drafts");
		}
		handleValidationErrors(data.errors);
		setLoading(false);
	};

	const getLgas = async (state) => {
		try {
			let data = await fetch(
				`http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
			);
			data = await data.json();
			console.log(data);
			setLgas(data);
			handleValidationErrors(data.errors);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const getCities = async (state) => {
		try {
			let data = await fetch(
				`http://locationsng-api.herokuapp.com/api/v1/states/${state}/cities`
			);
			data = await data.json();
			console.log(data);
			setCities(data);
			handleValidationErrors(data.errors);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await getPropertyTypes();
			await getStates();
		};
		fetchData();
	}, []);

	const handleValidationErrors = (errors) => {
		var ValidationErrors = errors;
		setErrors({ ...errors, ...ValidationErrors });
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
			<ToastContainer />
			{step == "a" ? (
				<form className="content-section mt-4">
					{errors ? (
						<div className="text-center mb-2">
							<span className="text-danger text-center">
								Please Check.... One or More Field is Incorrect
							</span>
						</div>
					) : null}

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
							<select
								name="propertyTypeId"
								onChange={handleOnChange}
								className="formfield"
							>
								<option value="" selected disabled>
									Choose a property type
								</option>
								{propertyTypes.map((type, i) => {
									return <option value={type.id}>{type.name}</option>;
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
							<select
								name="state"
								className="formfield"
								onChange={async (e) => {
									await getLgas(e.target.value);
									await getCities(e.target.value);
									setListingDetails({
										...listingDetails,
										state: e.target.value,
									});
								}}
							>
								<option value="" selected disabled>
									What state in Nigeria do you want the property
								</option>
								{states.map((state, i) => {
									return <option value={state.name}>{state.name}</option>;
								})}
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Locality (Optional)</div>
						<div className="select-box">
							<select
								name="lga"
								onChange={handleOnChange}
								className="formfield"
							>
								<option value="" selected disabled>
									Choose a locality
								</option>
								{lgas.map((lga, i) => {
									return <option value={lga}>{lga}</option>;
								})}
							</select>
							<div className="arrows" />
						</div>
					</div>

					<div className="input-box">
						<div className="input-label">Area (Optional)</div>
						<div className="select-box">
							<select
								name="area"
								className="formfield"
								onChange={handleOnChange}
							>
								<option value="" selected disabled>
									Choose an area
								</option>
								{cities.map((city, i) => {
									return <option value={city}>{city}</option>;
								})}
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Address</div>
						<input
							type="text"
							className="formfield"
							placeholder="House No, Street, Estate"
							name="address"
							onChange={handleOnChange}
						/>
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
							onChange={(e) => {
								console.log(e.target.checked);
								setListingDetails({
									...listingDetails,
									sellMySelf: e.target.checked,
								});
							}}
						/>
						<label htmlFor="sell" className="checktext">
							I want to sell myself
						</label>
					</div>
					<div className="checkbox">
						<input type="checkbox" id="buy" name="firstName" />
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
				<form className="content-section mt-4" onSubmit={submitListingToDraft}>
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

					<Dropzone
						accept="jpeg"
						maxFiles={6}
						onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles)}
					>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()} className="do-upload">
									<input {...getInputProps()} />
									<i className="far fa-image" />
									Upload pictures
								</div>
							</section>
						)}
					</Dropzone>
					<Dropzone
						accept="mp4"
						maxFiles={6}
						onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles)}
					>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()} className="do-upload">
									<input {...getInputProps()} />
									<i className="far fa-video" />
									Upload videos
								</div>
							</section>
						)}
					</Dropzone>
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
						<button
							className="no-color-btn draft"
							onClick={() => {
								setListingDetails({ ...listingDetails, isDraft: true });
							}}
						>
							{loading ? <Spinner color={"primary"} /> : "Save to Draft"}
						</button>
						<button
							className="color-btn draft"
							type="submit"
							onClick={submitListingDetails}
						>
							{loading ? <Spinner /> : "Submit"}
						</button>
					</div>
				</form>
			) : null}
		</div>
	);
}

export default SellAdd;
