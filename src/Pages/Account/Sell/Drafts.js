import React, { useEffect, useState } from "react";
import PropertyCard from "../../../Components/Generics/PropertyCard";
import PropertyDraft from "../../../Components/Generics/PropertyDraft";
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import Spinner from "../../../Utilities/Spinner";
import SeeMore from "../Buy/SeeMore";
import SellAdd from "./SellAdd";

function Drafts() {
	const [isProperty, setIsProperty] = useState([]);
	const [loading, setLoading] = useState(false);
	const [seeMore, setSeeMore] = useState(false);
	const [propertyId, setPropertyId] = useState(0);
	const [errormessage, setErrormessage] = useState("");
	const [offset, setOffset] = useState(1);
	const [limit, setLimit] = useState(20);
	const [listings, setListings] = useState(false);

	const showProperties = async (url = "Property/user/drafts") => {
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
			setIsProperty(data.data.value);
			setLoading(false);
			return;
		}
	};

	const seeDetails = (id) => {
		setPropertyId(id);
		setSeeMore(true);
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
		<div>
			<Modal
				open={seeMore}
				onClose={() => {
					setSeeMore(false);
				}}
			>
				<SeeMore propertyId={propertyId} setSeeMore={setSeeMore} isDraft={true} />
			</Modal>
			<Modal open={listings} onclose={close}>
				<SellAdd close={close} />
			</Modal>
			
			{loading ? (
				<div className="loading">
					<Spinner size={40} color={"primary"} />
				</div>
			) : isProperty <= 0 ? (
				<div className="free-space">
					<div className="free-inner">
						<div className="show-image">
							<img src="/asset/buyorsell.png" alt />
						</div>
						<div className="infos">You have no properties in your Draft</div>
					<button className="secondary-btn sec" onClick={openModalBox}>
								+ Add Property
							</button>
					</div>
				</div>
			) : (
				<>
					<div className="d-flex w-100 justify-content-between h-fit align-items-center">
						<h3 className="section-title">My Drafts</h3>
					</div>
					<div className="row">
						{isProperty.map((property, i) => {
							return <PropertyDraft property={property} seeMore={seeDetails} />;
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default Drafts;
