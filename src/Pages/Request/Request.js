import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import NaijaStates from "naija-state-local-government";

function Request() {
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrormessage] = useState("");
	const [errors, setErrors] = useState({});
	const [request, setRequest] = useState({
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
		isRequest: true,
	});
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [states, setStates] = useState([]);
	const [lgas, setLgas] = useState([]);
	const [cities, setCities] = useState([]);
	const [bedroomCounter, setBedroomCounter] = useState(0);
	const [bathroomCounter, setBathroomCounter] = useState(0);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setRequest({ ...request, [name]: value });
		console.log(request);
	};

	const bedIncrement = (e) => {
		e.preventDefault();
		setBedroomCounter(bedroomCounter + 1);
		setRequest({
			...request,
			numberOfBedrooms: bedroomCounter + 1,
		});
		console.log(request);
	};

	const bedDecrement = (e) => {
		e.preventDefault();
		setBedroomCounter((bedroomCounter) => Math.max(bedroomCounter - 1, 1));
		setRequest({
			...request,
			numberOfBedrooms: Math.max(bedroomCounter - 1, 1),
		});
		console.log(request);
	};

	const bathIncrement = (e) => {
		e.preventDefault();
		setBathroomCounter(bathroomCounter + 1);
		setRequest({
			...request,
			numberOfBathrooms: bathroomCounter + 1,
		});
		console.log(request);
	};

	const bathDecrement = (e) => {
		e.preventDefault();
		setBathroomCounter((bathroomCounter) => Math.max(bathroomCounter - 1, 1));
		setRequest({
			...request,
			numberOfBathrooms: Math.max(bathroomCounter - 1, 1),
		});
		console.log(request);
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
		  if (data.status != 404) {
			setCities(data);
			handleValidationErrors(data.errors);
			setLoading(false);
		  }
		  setCities([...cities, state]);
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

	const submitRequets = async (e) => {
		console.log(request);
		e.preventDefault();
		setLoading(true);
		var data = await Fetch("Property/create", "post", request);
		console.log(data);
		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);
			setRequest({});
			const notify = () => toast(data.message);
			notify();
		}
		handleValidationErrors(data.errors);
		setLoading(false);
	};
	const handleValidationErrors = (errors) => {
		var ValidationErrors = errors;
		setErrors({ ...errors, ...ValidationErrors });
	};
	return (
		<div className="row">
			<form onSubmit={submitRequets}>
				<div className="col-lg-3">
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
						<div className="input-label">State</div>
						<div className="select-box">
							<select
								name="state"
								className="formfield"
								onChange={async (e) => {
									
									setRequest({
										...request,
										state: e.target.value,
									});
								}}
							>
								<option value="" selected disabled>
									What state in Nigeria do you want the property
								</option>
								{NaijaStates.states().map((state, i) => {
									return <option value={state}>{state}</option>;
								})}
							</select>
							<div className="arrows" />
						</div>
					</div>
					<div className="input-box">
						<div className="input-label">Locality (Optional)</div>
						{request.state ? (
							<div className="select-box">
							<select
								name="lga"
								onChange={handleOnChange}
								className="formfield"
							>
								<option value="" selected disabled>
									Choose a locality
								</option>
								{NaijaStates.lgas(request.state).lgas.map((lga, i) => {
									return <option value={lga}>{lga}</option>;
								})}
							</select>
							<div className="arrows" />
						</div>
						) : null}
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
						<div className="input-label">Budget</div>
						<input
							type="text"
							className="formfield"
							placeholder="Give your listing a name that makes it easy to find"
							name=""
							onChange={handleOnChange}
						/>
					</div>
				</div>
				<div className="col-lg-3">
					<div className="input-box">
						<div className="input-label req">Comments</div>
						<div className="select-boxx mb-4">
							<input
								type="text"
								className="formfield"
								placeholder="Your Comment Here"
								name="description"
								onChange={handleOnChange}
							/>
							<div className="arrows" />
						</div>
					</div>
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

					<button className="color-btn submit w-100 mt-3">
						Submit Request
					</button>
				</div>
			</form>
		</div>
	);
}

export default Request;
