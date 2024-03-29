import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import Alert from "../../Utilities/Alert";
import { MainContext } from "../../Context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Naira from "react-naira";
import moment from "moment";
import Moment from "react-moment"


function RentReliefDetails({ relief, close }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  
	let data = relief.installments.filter(item => item.status == 'PENDING')
	const [paymentData, setPaymentData] = useState({
		amount: relief ? relief.monthlyInstallment : 0,
		rentReliefId: relief ? relief.id : 0,
		installmentId: (relief.installments && data.length > 0) ? data[0].id : 0
	});
  	

	const handleOnChange = (e) => {
		// showAlert("success", "Something toasted", "Everything works ");
		const { name, value } = e.target;
	};
	
	const getOustandingBalance = () => {
		let outStandingBalance = 0
		let unPaidInstalment = relief.installments.filter(amount => amount.status == "PENDING")
		unPaidInstalment = unPaidInstalment.map((value) => {
			return value.amount
		})
		outStandingBalance = unPaidInstalment.reduce((a, b) => { return a + b }, 0)
		return outStandingBalance
	}
	const getNextPaymentData = () => {
		let nextPayDate = relief.installments.filter(amount => amount.status == "PENDING").map( item => { return item.dateDue })[0]
		nextPayDate = nextPayDate ? moment(nextPayDate).format("L") : '-'
		return nextPayDate
	}
	
	const getProgressTabWidth = () => {
		let unit = 100 / relief.installments.length
		unit = unit + '%'
		return unit
	}
	
	const handlePayment = async () => {
		setLoading(true);
		
		try {
			var data = await Fetch("Payment/initiate", "post", paymentData);
			// console.log('Relief Data response: ', data);
			if (!data.status) {
				setLoading(false);
				setErrormessage(data);
				toast.error("Failed to initiate payment.");
				return;
			}
			if (data.status != 400) {
				window.open(data.message);
				setLoading(false);
				close(true);
				toast.success("Relief payment initiated successfully.");
				// history.push("/");
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
				<h4 className="total-repayment"><Naira>{relief.totalRepayment}</Naira></h4>
				<div className="d-flex align-items-center">
					<div className="mx-2">
						<p className="mb-2 gray-sub-title">Outstaning Balance</p>
						<div className="info-tab px-2 py-1"><Naira>{ getOustandingBalance() }</Naira></div>
					</div>
					<div className="mx-2">
						<p className="mb-2 gray-sub-title">Next Payment Date</p>
						<div className="info-tab px-2 py-1">{ getNextPaymentData() }</div>
					</div>
				</div>
			</div>
			
			<div className="mt-4 mb-5">
				<h6 className="text-center mb-3">Repayment Progress</h6>
				<div className="d-flex flex-column">
					<div className="d-flex mb-1">
						{relief.installments.map((item, index) => {
							return (
							<div key={index} className={`progress-tabs ${item.status == "PENDING" ? 'unfilled' : 'filled'}`} 
							style={{ width: getProgressTabWidth() }}></div>
							)
						})}
						{/* <div className="progress-tabs filled"></div>
						<div className="progress-tabs filled"></div>
						<div className="progress-tabs filled"></div>
						<div className="progress-tabs unfilled"></div>
						<div className="progress-tabs unfilled"></div>
						<div className="progress-tabs unfilled"></div> */}
					</div>
					<div className="d-flex record-title justify-content-between">
						<p className="mb-0"><Naira>{relief.monthlyInstallment}</Naira></p>
						<p className="mb-0"><Naira>{relief.totalRepayment}</Naira></p>
					</div>
				</div>
			</div>
			
			{relief.installments.filter(amount => amount.status == "PENDING").length != 0 && (
				<button type="button" className="btn-outlined btn-grayed border-black" 
					onClick={() => handlePayment()}
					disabled={relief.installments.filter(amount => amount.status == "PENDING").length == 0}
				>
					{ loading ? <Spinner color="primary" /> : 'Make a payment' }
				</button>
			)}
			
			<div className="mt-4 mb-5">
				<h6>Payment History</h6>
				{ relief.installments.filter(amount => amount.status == "COMPLETED").map((data, index) => {
					return (
						<div key={index} className="d-flex align-items-center payment-history w-100 border py-1 px-2 my-2">
							<div className="icon mr-2">
								<img src="./asset/UpArrow.png" alt="up-arrow" />
							</div>
							<div className="mx-2 record">
								<div className="d-flex record-title justify-content-between">
									<p className="mb-0">{`Instalment ${index + 1}`}</p>
									<p className="mb-0">+ <Naira>{data.amount}</Naira></p>
								</div>
								<p className="mb-0 last-paid">Paid on the {  moment(data.paidOn).format("L") } </p>
							</div>
						</div>
					)	
				})}
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
