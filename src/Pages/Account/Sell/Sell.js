import React, { useEffect, useState } from "react";
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import Spinner from "../../../Utilities/Spinner";
import SellAdd from "./SellAdd";

function Sell() {
	const [isProperty, setIsProperty] = useState([]);
	const [loading, setLoading] = useState(false);
	const [listings, setListings] = useState(false);
	const [errormessage, setErrormessage] = useState("");

	const showProperties = async () => {
		var data = await Fetch("", "get");
		setLoading(true);
		console.log(data);
		if (!data.status) {
			// setLoading(false);
			setErrormessage(data.message);
			return;
		}

		if (data.status != 400) {
			// setLoading(false);
			setIsProperty(data.data);
			return;
		}
	};
	// useEffect(() => {
	// 	fetch = async () => {
	// 		await showProperties();
	// 	};

	// 	fetch();
	// }, []);

	useEffect(() => {
		showProperties();
	}, []);

	const openModalBox = () => {
		setListings(!listings);
	};
	const close = () => {
		setListings(false);
	};
	return (
		<>
			{/* <Modal open={() => setListings(true)} onClose={() => setListings(false)}>
				<SellAdd />
			</Modal> */}
			<Modal open={listings} onclose={close}>
				<SellAdd close={close} />
			</Modal>
			<div>
				{loading ? (
					<div className="loading">
						<Spinner size={40} color={"primary"} />
					</div>
				) : (
					// <div>
					// 	{isProperty ? (
					// 		isProperty.map((property, index) => {
					// 			return (
					// 				<>
					// 					<h3 className="section-title">My Listings</h3>
					// 					<div className="row">
					// 						<div className="col-lg-3">
					// 							<div className="listing-cards">
					// 								<div className="listing-cover-img">
					// 									<img src="/asset/coverimg.png" alt />
					// 									<div className="listing-location">Lekki Phase 1</div>
					// 								</div>
					// 								<div className="pending-tag">
					// 									<div className="status">List is Pending</div>
					// 									<div className="status">
					// 										Edit <i className="fas fa-pen ml-2" />
					// 									</div>
					// 								</div>
					// 								<div className="listing-info">
					// 									<div className="title-group">
					// 										<div className="listing-title mb-3">
					// 											4 Bedroom Bungalow
					// 										</div>
					// 									</div>
					// 									<div className="feature-group">
					// 										<div className="feature-sing">
					// 											<i className="far fa-bed" />
					// 											<div className="feature-title">7 Bedrooms</div>
					// 										</div>
					// 										<div className="feature-sing">
					// 											<i className="far fa-toilet" />
					// 											<div className="feature-title">7 Bedrooms</div>
					// 										</div>
					// 										<div className="feature-sing">
					// 											<i className="far fa-tags" />
					// 											<div className="feature-title">7 Bedrooms</div>
					// 										</div>
					// 										<div className="feature-sing">
					// 											<i className="far fa-award" />
					// 											<div className="feature-title">7 Bedrooms</div>
					// 										</div>
					// 									</div>
					// 								</div>
					// 								<div className="line" />
					// 								<div className="listing-info pt-0">
					// 									<div className="listing-btn">
					// 										<button className="list-no-color-btn">
					// 											Delete
					// 										</button>
					// 										<button className="list-color-btn">Details</button>
					// 									</div>
					// 								</div>
					// 							</div>
					// 						</div>
					// 					</div>
					// 				</>
					// 			);
					// 		})
					// 	) : (
					// 		<div className="free-space">
					// 			<div className="free-inner">
					// 				<div className="show-image">
					// 					<img src="asset/buyorsell.png" alt />
					// 				</div>
					// 				<div className="infos">
					// 					You currently have no properties listed for sale.{" "}
					// 				</div>
					// 				<button className="secondary-btn w-75">+ Add Property</button>
					// 			</div>
					// 		</div>
					// 	)}
					// </div>

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
				)}
			</div>
		</>
	);
}

export default Sell;
