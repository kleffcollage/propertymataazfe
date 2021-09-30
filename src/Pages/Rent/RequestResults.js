import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Statuses } from "../../Utilities/Enums";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import Naira from "react-naira"
import { HiBadgeCheck } from "react-icons/hi";
import RequestedCards from "./RequestedCards";

const RequestResults = ({ propertyId, matches, theRequest, close }) => {
	
	
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
				<div className="my-request">
					<h2 className="title mb-5">My Request - { theRequest } </h2>
					
					<h5 className="sub-title">{matches.length} Matches Found!</h5>
				</div>
				
				<div className="row mt-4">
					{  matches.map((match, index) => {
						return (
							<RequestedCards property={match.property} request={match.propertyRequest} key={index} />
						)
					})}
					
					<div className="d-flex mt-5">
						<button className="list-no-color-btn w-100 py-4">
							Cancel Request
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RequestResults;
