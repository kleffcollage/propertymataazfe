import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import Alert from "../../Utilities/Alert";
import { MainContext } from "../../Context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Naira from "react-naira";

function RentReliefDetails({ close }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");

	const handleOnChange = (e) => {
		// showAlert("success", "Something toasted", "Everything works ");
		const { name, value } = e.target;
		// console.log(rentDetails);
	};
	
	const submitRentRequest = async (e) => {
		e.preventDefault();
		setLoading(true);
		// console.log({rentDetails});
		
		
		try {
			var data = await Fetch("Property/create", "post");
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
        
        <div className="content-section mt-4 relief-payment">
			
			<div className="mt-4 mb-5 d-flex flex-column align-items-center">
				<h6 className="gray-sub-title">Amount to pay</h6>
				<h4 className="total-repayment"><Naira>4500000</Naira></h4>
				<div className="d-flex align-items-center">
					<div className="mx-2">
						<p className="mb-2 gray-sub-title">Outstaning Balance</p>
						<div className="info-tab px-2 py-1"><Naira>3985310</Naira></div>
					</div>
					<div className="mx-2">
						<p className="mb-2 gray-sub-title">Next Payment Date</p>
						<div className="info-tab px-2 py-1">23/03/21</div>
					</div>
				</div>
			</div>
			
			<div className="mt-4 mb-5">
				<h6 className="text-center mb-3">Repayment Progress</h6>
				<div className="d-flex flex-column">
					<div className="d-flex mb-1">
						<div className="progress-tabs filled"></div>
						<div className="progress-tabs filled"></div>
						<div className="progress-tabs filled"></div>
						<div className="progress-tabs unfilled"></div>
						<div className="progress-tabs unfilled"></div>
						<div className="progress-tabs unfilled"></div>
						<div className="progress-tabs unfilled"></div>
					</div>
					<div className="d-flex record-title justify-content-between">
						<p className="mb-0"><Naira>797062</Naira></p>
						<p className="mb-0"><Naira>4782372</Naira></p>
					</div>
				</div>
			</div>
			
			<button type="button" className="btn-outlined btn-grayed border-black">
				Make a payment
			</button>
			
			<div className="mt-4 mb-5">
				<h6>Payment History</h6>
				<div className="d-flex align-items-center payment-history w-100 border py-1 px-2">
					<div className="icon mr-2">
						<img src="./asset/UpArrow.png" alt="up-arrow" />
					</div>
					<div className="mx-2 record">
						<div className="d-flex record-title justify-content-between">
							<p className="mb-0">1st Instalment</p>
							<p className="mb-0">+ <Naira>797062</Naira></p>
						</div>
						<p className="mb-0 last-paid">Paid on the  23/02/21 via LiquedeFlex</p>
					</div>
				</div>
			</div>
			
			
            <div className="input-box mt-4">
                <div className="input-label">Default Payment Method</div>
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
					</select>
					<div className="arrows" />
                </div>
            </div>
         
        </div>
		
    </div>
  );
}

export default RentReliefDetails;