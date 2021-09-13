import React, { useState } from "react";
import { toast } from "react-toastify";
import { Statuses } from "../../Utilities/Enums";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";

const PropertyCard = ({ property = {}, seeMore }) => {
	const [deleting,setDeleting] = useState(false)

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
			{property.isDraft == true ? null : (
				<div className="col-lg-3">
					<div className="listing-cards">
						<div className="listing-cover-img">
							<img
								src={
									property.mediaFiles.length > 0
										? property.mediaFiles[0].url
										: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
								}
							/>
							<div className="listing-location">{property.area}</div>
						</div>
						<div
							className={`tag ${
								property.isDraft == true
									? "draft"
									: property.status == Statuses.VERIFIED
									? "verify" 
									: "pending"
							}`}
						>
							<div className="status">
								{property.isDraft == true
									? "Only visible to you"
									: property.status == Statuses.VERIFIED
									? "Live"
									: "Listing is pending"}
							</div>
							<div className="status">
								Edit <i className="fas fa-pen ml-2" />
							</div>
						</div>
						<div className="listing-info">
							<div className="title-group">
								<div className="listing-title mb-3">{property.name}</div>
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
									<div className="feature-title">{`₦${property.price}`}</div>
								</div>
								<div className="feature-sing">
									<i className="far fa-award" />
									<div className="feature-title">
										{property.propertyType.toLowerCase()}
									</div>
								</div>
							</div>
						</div>
						<div className="line" />
						<div className="listing-info pt-0">
							<div className="listing-btn">
								<button className="list-no-color-btn" onClick={() => {
										seeMore(property.id);
									}}>Details</button>
								<button
									className="list-no-color-btn"
									onClick={() => {
										deActivate(property.id);
									}}
								>
									{deleting ? <Spinner color='primary'/> : "Delete" }
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyCard;
