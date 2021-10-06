import React, { useState } from "react";
import { toast } from "react-toastify";
import { Statuses } from "../../Utilities/Enums";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import Alert from "../../Utilities/Alert/index";
import Modal from "../../Utilities/Modal";
import SellAdd from "../../Pages/Account/Sell/SellAdd";
import Naira from "react-naira"
import { HiBadgeCheck } from "react-icons/hi";

const PropertyCard = ({ property = {}, seeMore }) => {
	const [deleting,setDeleting] = useState(false)
	const [alert, showAlert] = useState(false)
	const [editModal, setEditModal] = useState(false)
	
	const openAlert = () => {
		showAlert( prev => !prev)
	}
	
	const open = () => {
		setEditModal(!editModal)
	}
	
	const close = () => {
		setEditModal(false)
	}

	const deActivate = async(id) =>{
		try{
			setDeleting(true)
			const data = await Fetch(`property/deactivate/${id}`);
			if(data.status){
				toast.success("This property has been deleted successfully");
				setDeleting(false);
				window.location.reload();
				return;
			}
			setDeleting(false);
			toast.error("There was an error deleting this property. Please try again after sometime");
		} catch(error){
			setDeleting(false);
			toast.error("There was an error deleting this property. Please try again after sometime");
			console.log(error);
		}
	} 
	return (
		<>
			<Alert showAlert={alert} setShowAlert={showAlert} callback={() => deActivate(property.id)} isDelete={true} loading={deleting} />
			
			<Modal open={editModal} onClose={() => setEditModal(false)}>
				<SellAdd close={close} existingProperty={property} />
			</Modal>
			
			{property.isDraft === true ? null : (
				<div className="col-lg-4">
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
						<div
							className={`tag ${
								property.isDraft === true
									? "draft"
									: property.status === Statuses.VERIFIED
									? "verify" 
									: "pending"
							}`}
						>
							<div className={property.status === Statuses.VERIFIED ? "text-white status" : "status"} >
								{property.isDraft === true
									? "Only visible to you"
									: property.status === Statuses.VERIFIED
									? "Live"
									: "Listing is pending"}
							</div>
							<div className={property.status === Statuses.VERIFIED ? "text-white status" : "status"} onClick={open}>
								Edit <i className="fas fa-pen ml-2" />
							</div>
						</div>
						<div className="listing-info for-sell">
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
						<div className="listing-btn">
							<button className={property.status === Statuses.VERIFIED ? "color-btn" : "list-no-color-btn"} onClick={() => {
									seeMore(property.id);
								}}> View Details</button>
								
							<button
								className="list-no-color-btn"
								onClick={openAlert}
							>
								Delist
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyCard;
