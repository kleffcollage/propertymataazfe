import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import Dropzone from "react-dropzone";
import Alert from "../../Utilities/Alert";
import { MainContext } from "../../Context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Geocode from "react-geocode";
import NaijaStates from "naija-state-local-government";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

function RentReliefDetails({ close }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");

	const handleOnChange = (e) => {
		// showAlert("success", "Something toasted", "Everything works ");
		const { name, value } = e.target;
		setRentDetails({ ...rentDetails, [name]: value });
		// console.log(rentDetails);
	};
	
	const submitRentRequest = async (e) => {
		e.preventDefault();
		setLoading(true);
		console.log({rentDetails});
		
		
		try {
			var data = await Fetch("Property/create", "post", rentDetails);
			console.log('Rent property: ', data);
			if (!data.status) {
				setLoading(false);
				setErrormessage(data.message);
				toast.error(data.message);
				return;
			}
			if (data.status != 400) {
				setLoading(false);
				//   setListingDetails({});
				close(true);
				toast.success("Property listed successfully.");
				history.push("/my-mattaz");
				// history.push("/sell");
				// await currentStep();
				return
			}
			
			toast.success(data.message);
			history.push("/my-mattaz");
			handleValidationErrors(data.errors);
			setLoading(false);
			
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
		
	};

	useEffect(() => {
		const fetchData = async () => {
		};
		
		fetchData();
	}, []);

	// const handleValidationErrors = (errors) => {
	// 	var ValidationErrors = errors;
	// 	setErrors({ ...errors, ...ValidationErrors });
	// };

  return (
    <div>      
      <div className="top-section">
        <div className="back">
			<i className="fas fa-chevron-left mr-2" />
			<span
				className="backs"
				onClick= { close }
			>
				Back
			</span>
        </div>
      </div>
        { step == 1 ? (
          <form className="content-section mt-4">
            <div className="input-box">
                <div className="input-label">Type</div>
                <div className="select-box">
					<select
						name="propertyTypeId"
						value=""
						onChange={handleOnChange}
						className="formfield"
					>
						<option selected disabled>
							Choose a property type
						</option>
						{ propertyTypes.map((type, i) => {
							return <option key={i} value={ parseInt(type.id)} > { type.name} </option>;
						})}
					</select>
					<div className="arrows" />
                </div>
            </div>
         
			<button type="button" className="secondary-btn">
				Next
			</button>
        </form>
        
        ) : null }
    </div>
  );
}

export default RentReliefDetails;
