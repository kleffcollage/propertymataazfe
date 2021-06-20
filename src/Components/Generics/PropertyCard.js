import React, { useState } from "react";
import Fetch from "../../Utilities/Fetch";

const PropertyCard = ({ property = {}, seeMore }) => {
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
										: ""
								}
							/>
							<div className="listing-location">{property.area}</div>
						</div>
						<div
							className={`tag ${
								property.isDraft == true
									? "draft"
									: property.verified == true
									? "verify"
									: "pending"
							}`}
						>
							<div className="status">
								{property.isDraft == true
									? "Only visible to you"
									: property.verified == true
									? "Listing is verified"
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
									}}>See More</button>
								<button
									className="list-color-btn"
									onClick={() => {
										seeMore(property.id);
									}}
								>
									Details
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
