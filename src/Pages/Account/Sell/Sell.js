import React, { useEffect, useState } from "react";
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import Spinner from "../../../Utilities/Spinner";
import SeeMore from "../Buy/SeeMore";
import SellAdd from "./SellAdd";

function Sell() {
	const [isProperty, setIsProperty] = useState([]);
	const [loading, setLoading] = useState(false);
	const [listings, setListings] = useState(false);
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

	const openModalBox = () => {
		setListings(!listings);
	};
	const close = async () => {
		setListings(false);
		await showProperties();
	};
	return (
		<>
			<Modal open={listings} onclose={close}>
				<SellAdd close={close} />
			</Modal>
			<Modal
				open={seeMore}
				onClose={() => {
					setSeeMore(false);
				}}
			>
				<SeeMore propertyId={propertyId} setSeeMore={setSeeMore} />
			</Modal>
			<div>
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
							<div className="infos">
								You currently have no properties listed for sale.{" "}
							</div>
							<button className="secondary-btn w-75" onClick={openModalBox}>
								+ Add Property
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="d-flex w-100 justify-content-between h-fit align-items-center">
							<h3 className="section-title">My Listings</h3>
							<button className="secondary-btn sec" onClick={openModalBox}>
								+ Add Property
							</button>
						</div>
						<div className="row">
							{isProperty.map((property, i) => {
								return (
									<>
										{property.isDraft == true ? null : (
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
															property.verified == true ? "verified" : "pending"
														}`}
													>
														<div className="status">
															{property.verified == true
																? "Listing has been verified"
																: "List is Pending"}
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
										)}
									</>
								);
							})}
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Sell;
