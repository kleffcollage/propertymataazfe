import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Naira from "react-naira";
import { Box } from "@material-ui/core";
import { FaRegCreditCard, FaRegCalendarAlt, FaStoreAlt } from "react-icons/fa"
import { MdStoreMallDirectory } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


function Reciept({ property, close,  }) {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const user = useContext(MainContext)
	console.log({property})
	
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
					<div className="d-flex receipt-wrap my-2">
						<div className="icon"> <RiShoppingCartLine /> </div>
						<div className="item ml-3 px-2">
							<p className="">{`Purchase of ${property.name}, ${property.state}, ${property.lga}`}</p>
							<p className="mt-2"><Naira>{property.price}</Naira></p>
						</div>
					</div>
					<div className="d-flex receipt-wrap my-2">
						<div className="icon"> <MdStoreMallDirectory /> </div>
						<div className="item ml-3 px-2">
							<p className="section-heading mb-0">Paid To</p>
							<p className="">PropertyMataaz Limited</p>
						</div>
					</div>
					<div className="d-flex receipt-wrap my-2">
						<div className="icon"> <FaRegCalendarAlt /> </div>
						<div className="item ml-3 px-2">
							<p className="section-heading mb-0">Date</p>
							<p className="">10 Apr 2021  9:42 GMT+1</p>
						</div>
					</div>
					<div className="d-flex receipt-wrap my-2">
						<div className="icon"> <FaRegCreditCard /> </div>
						<div className="item ml-3 px-2">
							<p className="section-heading mb-0">Payment Method</p>
							<p className="">Mastercard - 1175</p>
						</div>
					</div>
					<Document file="/asset/sample.pdf" className="pdf-viewer">
						<Page pageNumber={1} />
					</Document>
				</div>
				
				<Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="mt-4">
					<button className="btn-outlined mr-2" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Download" }</button>
					<button className="btn-outlined ml-2" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Print" }</button>
				</Box>
			</div>
    	</div>

    </>
  );
}

export default Reciept;
