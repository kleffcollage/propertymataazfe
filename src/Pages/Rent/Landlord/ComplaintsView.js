import React, { useState } from "react";
import Fetch from "../../../Utilities/Fetch";
import Naira from "react-naira"

const TenantComplaintView = ({ complaint, close }) => {
    const [loading, setLoading ] = useState(false);
    const [ property, setProperty ] = useState([]);
    
    const handleComplaintApproval = async (complaintsId) => {
        try {
            setLoading(true);
            let data = await Fetch(`Complaints/authorize/${complaintsId}`, "post")
            
            if(!data.status) {
                
                return
            }
            
        } catch(error) {
            console.log({error})
        }
    }
    
    console.log({ complaint })
	
	
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
                <div className="mb-5">
                    <div className="col-12 my-2 py-2 px-0 complaint-tabs">
                        <button className="complaint-tab w-100">
                            <h5 className="mb-1 sub-heading">Category</h5>
                            <p className="mb-0 font-weight-bold"> {complaint.complaintsCategory} </p>
                        </button>
                    </div>
                    <div className="col-12 my-2 py-2 px-0 complaint-tabs">
                        <button className="complaint-tab w-100">
                            <h5 className="mb-1 sub-heading">Sub Category</h5>
                            <p className="mb-0 font-weight-bold">{ complaint.complaintsSubCategory }</p>
                        </button>
                    </div>
                    <div className="col-12 my-2 px-0 py-2 complaint-tabs">
                        <button className="complaint-tab w-100">
                            <h5 className="mb-1 sub-heading">Comments</h5>
                            <p className="mb-0 font-weight-bold">{ complaint.comment }</p>
                        </button>
                    </div>
                </div>
                
                <div className="mt-5 px-3">
                    <button type="" className="secondary-btn">Authorize Inspection</button>
                    <p>A PropertyMataaz Representative will go and inspect the reported damage and we will revert to you with proof of damagae as well as repair costs.</p>
                </div>
			</div>
		</>
	);
};

export default TenantComplaintView;
