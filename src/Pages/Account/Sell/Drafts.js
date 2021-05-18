import React, { useEffect, useState } from "react";
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import Spinner from "../../../Utilities/Spinner";
import SeeMore from "../Buy/SeeMore";

function Drafts() {
	const [isProperty, setIsProperty] = useState([]);
	const [loading, setLoading] = useState(false);
	const [seeMore, setSeeMore] = useState(false);
	const [propertyId, setPropertyId] = useState(0);
	const [errormessage, setErrormessage] = useState("");
	const [offset, setOffset] = useState(1);
	const [limit, setLimit] = useState(20);

	const showProperties = async (url = "Property/user/created") => {
		setLoading(true);
		var data = await Fetch(url);
		console.log(data);
		if (!data.status) {
			setLoading(false);
			setErrormessage(data.message);
			return;
		}

		if (data.status != 400) {
			setLoading(true);
			setIsProperty(data.data);
			setLoading(false);
			return;
		}
	};
	useEffect(() => {
		async function fetchListings() {
			await showProperties();
		}

		fetchListings();
	}, []);
	return (
		<div>
			<Modal
				open={seeMore}
				onClose={() => {
					setSeeMore(false);
				}}
			>
				<SeeMore propertyId={propertyId} setSeeMore={setSeeMore} />
			</Modal>
			{loading ? (
				<div className="loading">
					<Spinner size={40} color={"primary"} />
				</div>
			) : isProperty <= 0 ? (
				<div className="free-space">
					<div className="free-inner">
						<div className="show-image">
							<img src="asset/buyorsell.png" alt />
						</div>
						<div className="infos">You have no properties in your Draft</div>
					</div>
				</div>
			) : (
				<>
					<div className="d-flex w-100 justify-content-between h-fit align-items-center">
						<h3 className="section-title">My Drafts</h3>
					</div>
					<div className="row">
						{isProperty.map((property, i) => {
							return (
								<>
									{property.isDraft == true ? (
										<div className="col-lg-3">
											<div className="listing-cards">
												<div className="listing-cover-img">
													<img src={property.mediaFiles[0]} />
													<div className="listing-location">
														{property.area}
													</div>
												</div>
												<div
													className={`tag ${
														property.isDraft == true ? "draft" : ""
													}`}
												>
													<div className="status">
														{property.isDraft == true
															? "Only visible to you"
															: ""}
													</div>
													<div className="status">
														Edit <i className="fas fa-pen ml-2" />
													</div>
												</div>
												<div className="listing-info">
													<div className="title-group">
														<div className="listing-title mb-3">
															{property.name}
														</div>
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
														<button className="list-no-color-btn">
															Delete
														</button>
														<button
															className="list-color-btn"
															onClick={() => {
																setPropertyId(property.id);
																setSeeMore(true);
															}}
														>
															Details
														</button>
													</div>
												</div>
											</div>
										</div>
									) : null}
								</>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default Drafts;
