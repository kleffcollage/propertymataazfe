import React, { useEffect, useState } from "react";
import PropertyCard from "../../../Components/Generics/PropertyCard";
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

	const seeDetails = (id) => {
		setPropertyId(id);
		setSeeMore(true);
	};
	const deleteProperty = async (id) => {
		var data = await Fetch(`Property/delete/${id}`, "get");
		console.log(data);
		if (!data.status) {
			setErrormessage(data.message);
			return;
		}
		if (data.status != 400) {
			await showProperties();
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
				<SeeMore propertyId={propertyId} setSeeMore={setSeeMore} seller={true}/>
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
								<img src="/asset/buyorsell.png" alt />
							</div>
							<div className="infos">
								You currently have no properties listed for sale.
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
							{ isProperty.filter(p => p.isForSale ).map((property, i) => {
								return (
									<PropertyCard property={property} seeMore={seeDetails} deleteProperty={deleteProperty} />
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
