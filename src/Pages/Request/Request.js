import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import NaijaStates from "naija-state-local-government";
import CurrencyInput from 'react-currency-input-field';


function Request() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrormessage] = useState("");
	const [errors, setErrors] = useState({});
	const [request, setRequest] = useState({
		propertyTypeId: 0,
		state: "",
		lga: "",
		comment: "",
		budget: 0,
		numberOfBedrooms: 0,
		numberOfBathrooms: 0,
	});
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [states, setStates] = useState([]);
	const [lgas, setLgas] = useState([]);
	const [cities, setCities] = useState([]);
	const [bedroomCounter, setBedroomCounter] = useState(0);
	const [bathroomCounter, setBathroomCounter] = useState(0);
	const [budget,setBudget] = useState(0);

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

	useEffect(() => {
		const fetchData = async () => {
			await getPropertyTypes();
			//await getStates();
		};
		fetchData();
	}, []);

	const submitRequets = async (e) => {
		console.log(request);
		e.preventDefault();
		let record = request;
		record.budget = budget;
		
		setLoading(true);
		var data = await Fetch("PropertyRequest/new", "post", record);
		console.log(data);
		//return;
		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			setLoading(false);
			setRequest({});
			toast.success(data.message)
			history.push("/my-mattaz")
			// const notify = () => toast(data.message);
			// notify();
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
			<form onSubmit={submitRequets}>
				<div className="row">
					<div className="col-lg-4">
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
							<input
								type="text"
								className="formfield"
								placeholder="Which area do you want your property in"
								name="area"
								onChange={handleOnChange}
							/>
						</div>

						{/* <div className="input-box">
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
						</div> */}
						<div className="input-box">
							<div className="input-label">Comments</div>
							<textarea
								type="text"
								className="formfield textarea"
								placeholder="Type in any other useful information"
								name="comment"
								onChange={handleOnChange}
							/>
						</div>
						
						
					</div>
					
					<div className="col-lg-4">
						<div className="input-box">
							<div className="input-label">Budget</div>
							<CurrencyInput
                  id="input-example"
                  className='formfield'
                  name="price"
                  placeholder="₦0.00"
                  prefix="₦"
                  decimalsLimit={2}
				  value={budget}
                  onValueChange={(value, name) => setBudget(value)}
                />
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

						<button 
							className="color-btn submit w-100 mt-3"
							type="submit"
							onClick={submitRequets}
							>
								{loading ? <Spinner /> : "Submit Request"}
						</button>
				</div>
				</div>
			</form>
		</>
	);
}

export default Request;
