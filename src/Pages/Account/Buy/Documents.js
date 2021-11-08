import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import { GrDocumentText } from "react-icons/gr"


function Documentation({ property, close, isRent }) {
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
      
	  
    	<div className="">
			<div className="content-section mt-4">
				{ isRent 
					? (
						<>
							<div className="tenant-agreement-wrap py-4">
								<div className="description py-2">
									<h6 className="mb-3">Tenancy Agreement</h6>
									<p className="mb-1">Between</p>
									<h6 className="mb-1">Gideon Oluwasegun Emokpae</h6>
									<p className="mb-1">And</p>
									<h6 className="mb-1">PropertyMataaz Limted</h6>
								</div>
								<div className="py-4">
									<p className="mb-0">
										In respect of the 4 Bedroom Duplex at No. 16 Admiralty Way, lekki Phase 1, lekki, Lagos, Nigeria
									</p>
								</div>
								<div className="py-3">
									<p className="">THIS TENANCY IS MADE THIS 10TH DAY OF APRIL 2021 </p>
									<p className="my-3"> BETWEEN </p>
									<p>
										<span className="text-uppercase font-weight-bold">GIDEON OLUWASEGUN EMOKPAE</span> of 10 Adebayo Titilope Street, Omole Phase 4,  Ikeja, Lagos, Nigeria (hereinafter to referred to as The Tenant which expression shall where the context so admit include his successors in title and assigns) of the one part
									</p>
									
									<p className="my-3">AND</p> 

									<p>
										<span className="text-uppercase font-weight-bold">PROPERTYMATAAZ LIMITED</span>, a company incorporated in nigeria having its registered office at Km 24 Lekki Epe Expressway, oko Ado, Lagos, Nigeria
									</p>

									<p className="my-4">WHEREAS:</p>
								</div>
								
								<div className="checkbox align-items-start mb-2">
									<input type="checkbox" id="buy" name="firstName" />
									<label htmlFor="buy" className="checktext tenant-consent">
										I agree that checking this box and tapping the agree button constitutes an appending of my electronic signature to the Tenancy Agreement herein.
									</label>
								</div>
								
								<button type="button" className="secondary-btn mt-4">
									Agree and Submit
								</button>
							</div>
						</>
					) 
					: (
						<div className="receipt-modal-wrap py-4">
							<div className="description py-2">
								<h5>{`${property.name}`}</h5>
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
					)
				}
				
				
			</div>
    	</div>

    </>
  );
}

export default Documentation;
