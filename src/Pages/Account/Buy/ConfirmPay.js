import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import { Box } from "@material-ui/core";


function ConfirmPay({ close, }) {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const user = useContext(MainContext)
	// console.log(property)
	
	
	const handlePayment = async () => {
		setLoading(true);
		
		// try {
		// 	var data = await Fetch("Payment/initiate", "post", payData);
		// 	console.log(data);
			
		// 	if (!data.status) {
		// 		setLoading(false);
		// 		toast.success(data.message)
		// 		// console.log(data.message);
		// 		return;
		// 	}
		// 	if (data.status != 400) {
		// 		setLoading(false);
		// 		toast.success("Payment initiated successfully.")
		// 		// history.go(data.message)
		// 	}
		// } catch (error) {
		// 	setErrorMessage(error.message)
		// }
	}
	

    // useEffect(() => {
    // }, [])

  return (
    <>	  
    	<div className="row">
			<div className="col-12 mt-4">
				<div className="pay-modal-wrap">
					<Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="bill my-2">
						<h5 className="mb-0">Cost of Unit</h5>
						<p className="amount mb-0">₦145,000,000</p>
					</Box>
				</div>
				
				<button className="secondary-btn mt-5" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Pay Securely" }</button>
			</div>
    	</div>

    </>
  );
}

export default ConfirmPay;
