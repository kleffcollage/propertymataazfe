import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import { GrDocumentText } from "react-icons/gr"


function Documentation({ property, close }) {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const user = useContext(MainContext)
	
	// console.log({property})
	

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
				<div className="receipt-modal-wrap py-4">
					<div className="description py-2">
						<h5>{`${property.name}, ${property.description}`}</h5>
						<h6 className="mt-3">Documents</h6>
					</div>
					<div className="d-flex align-items-center document-wrap my-2 py-2 px-3">
						<div className="icon"> <GrDocumentText /> </div>
						<div className="item ml-4">
							<p className="mb-0">Deed of Assignment</p>
						</div>
					</div>
					<div className="d-flex align-items-center document-wrap my-2 py-2 px-3">
						<div className="icon"> <GrDocumentText /> </div>
						<div className="item ml-4">
							<p className="mb-0">Reciept of Purchase</p>
						</div>
					</div>
					<div className="d-flex align-items-center document-wrap my-2 py-2 px-3">
						<div className="icon"> <GrDocumentText /> </div>
						<div className="item ml-4">
							<p className="mb-0">Land Survey</p>
						</div>
					</div>
				</div>
				
			</div>
    	</div>

    </>
  );
}

export default Documentation;
