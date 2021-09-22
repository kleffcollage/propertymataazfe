import React, { useState } from "react";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Alert from "../../../Utilities/Alert/index";
import Modal from "../../../Utilities/Modal";
import Naira from "react-naira";
import { Box } from "@material-ui/core";

const TenantDetails = ({ property = {}, close }) => {
    const [show, setShow] = useState(false)
    
    const showDetails = () => {
        setShow(prev => !prev )
    }
    
    console.log({property})
    
	
	
	return (
		<>
			<div className="top-section">
                <div className="back">
                    <i className="fas fa-chevron-left"></i>
                    <span className="backs" onClick={close}>
                        Back          
                    </span>
                </div>
            </div>
      
	  
            <div className="modal-content applied">
                <div className="applicants mt-4 mb-5 px-2 px-sm-3">
                    <div className="d-flex flex-column align-items-center my-3">
                        <div className="tenant-avi ">
                            <img src="/asset/@3xGideon.png" alt="gideon" />
                        </div>
                        <div className="property-title">Gideon Oluwasegun Emokpae</div>
                    </div>
                    
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div className="views full px-2">
                                <div className="viewtext">Suitability Rating</div>
                                <div className="count">{property.views}</div>
                            </div>
                        </div>
                        <p className="mx-3 disclaimer-text">We recommend you only consider applicants with a suitability rating of 3 stars or higher</p>
                    </div>
                    
                    <Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="mt-4">
                        <button className="btn-outlined btn-grayed mr-2" type="submit"> Decline </button>
                        <button className="btn-outlined btn-grayed ml-2" type="submit"> Accept as Tenant </button>
                    </Box>
                    
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Mobile Number</h6>
                            <p className="mb-1">08098765432</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Email</h6>
                            <p className="mb-1">gideonemo@gmail.com</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Current Residential Address</h6>
                            <p className="mb-1">10 Adebayo Titilope Street, Omole Phase 4,  Ikeja, Lagos, Nigeria</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Date of Birth</h6>
                            <p className="mb-1">14/04/1980</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Nationality</h6>
                            <p className="mb-1">Nigerian</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Marital Status</h6>
                            <p className="mb-1">Married</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Occupation</h6>
                            <p className="mb-1">Investment Banker</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Work Address</h6>
                            <p className="mb-1">44 Cameron Road, Ikoyi, Lagos, Nigeria</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Annual Income</h6>
                            <p className="mb-1">₦14,500,000</p>
                        </div>
                    </div>
                    <h5 className="field-title">Next of Kin</h5>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>First Name</h6>
                            <p className="mb-1">Amanda</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Surname</h6>
                            <p className="mb-1">Emokpae</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Mobile Number</h6>
                            <p className="mb-1">08098765432</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Address</h6>
                            <p className="mb-1">10 Adebayo Titilope Street, Omole Phase 4,  Ikeja, Lagos, Nigeria</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Relationship</h6>
                            <p className="mb-1">Wife</p>
                        </div>
                    </div>
                    <div className="d-flex applicants my-3">
                        <div className="tenant-info-box">
                            <h6>Work ID</h6>
                            <img src="/asset/@3xGideon.png" alt="gideon" />
                        </div>
                    </div>
                    
                    
                </div>
            </div>
		</>
	);
};

export default TenantDetails;
