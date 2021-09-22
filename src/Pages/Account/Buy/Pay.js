import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import Naira from 'react-naira'


function Pay({ property, close,  }) {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const user = useContext(MainContext)
	// console.log(property)

	const tax = (7.5 / 100) * property.price;
	
	const price = tax + property.price
	
	const payData = {
		propertyId: property.id,
		amount: price
	}
	
	const handlePayment = async () => {
		setLoading(true);
		
		try {
			var data = await Fetch("Payment/initiate", "post", payData);
			console.log(data);
			
			if (!data.status) {
				setLoading(false);
				toast.success(data.message)
				// console.log(data.message);
				return;
			}
			if (data.status != 400) {
				window.open(data.message);
				setLoading(false);
				toast.success("Payment initiated successfully.")
				// history.go(data.message)
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
	}
	

    // useEffect(() => {
    // }, [])

  return (
    <>
      {/* <ToastContainer /> */}
      
		<div className="top-section">
			<div className="back">
				<i className="fas fa-chevron-left"></i>
				<span className="backs" onClick={close}>
					Back          
				</span>
			</div>
		</div>
      
	  
    	<div className="modal-content">
			<div className="content-section mt-4">
				<div className="pay-modal-wrap">
					<div className="name py-3 mb-4">
						<h5>{property.name}</h5>
					</div>
					<Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="bill my-2">
						<h5 className="mb-0">Cost of Unit</h5>
						<p className="amount mb-0"><Naira>{property.price}</Naira></p>
					</Box>
					<Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="bill my-2">
						<h5 className="mb-0">Fees</h5>
						<p className="amount mb-0"><Naira>{0}</Naira></p>
					</Box>
					<Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="bill my-2">
						<h5 className="mb-0">Taxes</h5>
						<p className="amount mb-0"><Naira>{tax}</Naira></p>
					</Box>
					<Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="total my-2">
						<h5 className="mb-0">Total</h5>
						<p className="amount mb-0"><Naira>{price}</Naira></p>
					</Box>
				</div>
				
				<button className="secondary-btn mt-5" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Pay Securely" }</button>
			</div>
    	</div>

    </>
  );
}

export default Pay;
