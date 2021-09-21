import React, { useState } from "react";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Alert from "../../../Utilities/Alert/index";
import Modal from "../../../Utilities/Modal";
import Naira from "react-naira"

const PropertyApplied = ({ property = {}, propertyId, close }) => {
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
                <div className="mt-4">
                    
                    <div className="listing-cards">
                        <div className="listing-cover-img">
                            <img
                                src={
                                    property.property.mediaFiles.length !== 0
                                        ? property.property.mediaFiles[0].url
                                        : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                                }
                            />
                            <div className="listing-location">{property.property.area}</div>
                        </div>
                        <div
							className={`tag ${
								property.property.isDraft == true ? "draft" : "pending"
							}`}
						>
							<div className="status">
								{property.isDraft == true
									? "Only visible to you"
									: property.verified == true
									? "Listing is verified"
									: "Listing is pending"
                                }
							</div>
							<div className="status" onClick>
								Edit <i className="fas fa-pen ml-2" />
							</div>
						</div>
                        <div className="listing-info">
                            <div className="title-group">
                                <h6>{property.property.name}</h6>
                                {/* <div className="listing-title mb-3">{property.property.name}</div> */}
                            </div>
                        </div>
                    </div>
                    
                    {/* <Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="mt-4">
                        <button className="btn-outlined mr-2" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Download" }</button>
                        <button className="btn-outlined ml-2" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Print" }</button>
                    </Box> */}
                </div>
            </div>
		</>
	);
};

export default PropertyApplied;
