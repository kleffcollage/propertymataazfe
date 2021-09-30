import React from "react";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Spinner from "../../../Utilities/Spinner";
import Naira from "react-naira"
import { HiBadgeCheck } from "react-icons/hi";

const TenancyDetails = ({ property, close }) => {
    
    console.log({property})
	
	return (
		
		<>
            <div className="top-section">
				<div className="back">
					<i className="fas fa-chevron-left mr-2"></i>
					<span className="backs" onClick={close}>
						Back
					</span>
				</div>
			</div>
            
            <div className="modal-content applied">
                {/* <div className="col-12 my-1">
                    <div className="listing-cards">
                        <div className="listing-cover-img">
                            <img
                                src={
                                    property.mediaFiles.length > 0
                                        ? property.mediaFiles[0].url
                                        : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                                }
                                alt={property.name}
                            />
                            <div className="listing-location">{property.area ? property.area : property.state }</div>
                        </div>
                        
                        <div className="listing-info for-requested-properties">
                            <div className="title-group mb-3">
                                <div className="listing-title ">{property.name}</div>
                                { !property.sellMyself &&
                                    <HiBadgeCheck className="badge-verified" />
                                }
                            </div>
                            <div className="feature-group">
                                <div className="feature-sing">
                                    <i className="far fa-bed" />
                                    <div className="feature-title">
                                        {`${property.numberOfBedrooms} Bedrooms`}
                                    </div>
                                </div>
                                <div className="feature-sing">
                                    <i className="far fa-toilet" />
                                    <div className="feature-title">
                                        {`${property.numberOfBathrooms} Bathrooms`}
                                    </div>
                                </div>
                                <div className="feature-sing">
                                    <i className="far fa-tags" />
                                    <div className="feature-title"><Naira>{property.price}</Naira></div>
                                </div>
                                <div className="feature-sing">
                                    <i className="far fa-award" />
                                    <div className="feature-title">
                                        {property.propertyType.toLowerCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing-btn flex-column">
                            <p className="button__pre-text mb-2">Do you like this property?</p>
                            <div className="d-flex justify-content-between">
                                <button className="list-no-color-btn dislike-btn">
                                    - No
                                </button>
                                    
                                <button className="list-no-color-btn like-btn">
                                    + Yes
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div> */}
			</div>
		</>
	);
};

export default TenancyDetails;
