import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import { Box } from "@material-ui/core";


function Reciept({ property, close,  }) {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const user = useContext(MainContext)
	// console.log(property)
	
	const price = 0.75 * property.price
	
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
						<h5>Payment Receipt</h5>
					</div>
					<div className="d-flex receipt-wrap">
						<div className="icon">image </div>
						<div className="item">
							{`Purchase of ${property.name}, ${property.city}`}
						</div>
					</div>
				</div>
				
				<Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="total my-2">
					<button className="secondary-btn mt-5" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Pay Securely" }</button>
				</Box>
			</div>
    	</div>

    </>
  );
}

export default Reciept;
