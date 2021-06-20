import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListedCard from "../../../Components/Generics/ListedCard";
import PropertyCard from "../../../Components/Generics/PropertyCard";
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import Spinner from "../../../Utilities/Spinner";
import Request from "../../Request/Request";
import SeeMore from "./SeeMore";


function Buy() {
	const [tab, setTab] = useState("listed");
	const [counter, setCounter] = useState(1);
	const [isProperty, setIsProperty] = useState([]);
	const [loading, setLoading] = useState(false);
	const [errormessage, setErrormessage] = useState("");
	const [offset, setOffset] = useState(1);
	const [limit, setLimit] = useState(10);
	const [seeMore, setSeeMore] = useState(false);
	const [propertyId, setPropertyId] = useState(0);
	const [nextUrl, setNextUrl] = useState("");
	const [prevUrl, setPrevUrl] = useState("");
	const [lastUrl, setLastUrl] = useState("");
	const [firstUrl, setFirstUrl] = useState("");

	const currentTab = (tabname) => {
		setTab(tabname);
	};
	const increment = () => {
		setCounter(counter + 1);
		console.log(counter);
	};
	const decrement = () => {
		setCounter((counter) => Math.max(counter - 1, 1));
		console.log(counter);
	};
	const showNext = async () => {
		showProperties(nextUrl);
	};
	const showPrev = async () => {
		showProperties(prevUrl);
	};
	const showFirst = async () => {
		showProperties(firstUrl);
	};
	const showLast = async () => {
		if (lastUrl == null) {
			return;
		}
		if (lastUrl != null) {
			showProperties(lastUrl);
			return;
		}
	};
	const showProperties = async (
		url = `Property/list?offset=${offset}&limit=${limit}`
	) => {
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
			console.log(data.data.value);
			setIsProperty(data.data.value);
			setNextUrl(data.data.next.href.split("api/")[1]);
			console.log(data.data.next.href.split("api/")[1]);
			setPrevUrl(data.data.next.href.split("api/")[1]);
			setFirstUrl(data.data.next.href.split("api/")[1]);
			setLastUrl(data.data.next.href.split("api/")[1]);
			setLoading(false);
			return;
		}
	};
	useEffect(() => {
		setLoading(true);
		async function fetchListings() {
			await showProperties();
		}

		fetchListings();
	}, []);
	return (
		<>
			<Modal
				open={seeMore}
				onClose={() => {
					setSeeMore(false);
				}}
			>
				<SeeMore propertyId={propertyId} setSeeMore={setSeeMore} />
			</Modal>
			<div>
				<div className="page-title">
					Find a property to buy with the safety of 103% money back guarantee
				</div>
				<div className="tabs">
					<div
						className={`texts ${tab == "listed" ? "current" : ""}`}
						onClick={() => currentTab("listed")}
					>
						Listed Properties
					</div>
					<div
						className={`texts ${tab == "request" ? "current" : ""}`}
						onClick={() => currentTab("request")}
					>
						Request Property
					</div>
					<div className={tab == "listed" ? "tab-bar" : "tab-bar req"} />
				</div>
				{tab == "listed" ? (
					<div className="row">
						<div className="col-lg-3">
							<div className="input-box">
								<input
									type="search"
									className="search-rec"
									placeholder="search"
								/>
								<div className="search-box">
									{/* <img src="asset/searchicon.svg" alt /> */}
									<svg width="20px" height="20px" viewBox="0 0 20 20">
										<g
											id="Web-Application"
											stroke="none"
											stroke-width="1"
											fill="none"
											fill-rule="evenodd"
										>
											<g
												id="1-Home"
												transform="translate(-1159.000000, -344.000000)"
												fill="#252427"
												fill-rule="nonzero"
												stroke="#252427"
												stroke-width="0.5"
											>
												<path
													d="M1166.90212,345 C1171.05871,345 1174.42665,348.272872 1174.42665,352.312141 C1174.42665,354.140176 1173.73571,355.810016 1172.59618,357.093156 L1172.59618,357.093156 L1173.07366,357.093156 C1173.18943,357.093156 1173.29796,357.135348 1173.38116,357.216197 L1173.38116,357.216197 L1177.77289,361.48397 C1177.94292,361.649169 1177.94292,361.916364 1177.77289,362.081597 L1177.77289,362.081597 L1176.95534,362.876075 C1176.7853,363.041308 1176.51035,363.041308 1176.34035,362.876075 L1176.34035,362.876075 L1171.94862,358.608302 C1171.86902,358.527454 1171.822,358.42199 1171.822,358.309489 L1171.822,358.309489 L1171.822,357.845477 C1170.50159,358.952844 1168.78325,359.624282 1166.90212,359.624282 C1162.74553,359.624282 1159.37759,356.351409 1159.37759,352.312141 C1159.37759,348.272872 1162.74553,345 1166.90212,345 Z M1166.90212,346.687417 C1163.70418,346.687417 1161.11402,349.204467 1161.11402,352.312141 C1161.11402,355.419814 1163.70418,357.936865 1166.90212,357.936865 C1170.10006,357.936865 1172.69022,355.419814 1172.69022,352.312141 C1172.69022,349.204467 1170.10006,346.687417 1166.90212,346.687417 Z"
													id="Search-Icon"
												></path>
											</g>
										</g>
									</svg>
								</div>
							</div>
							<div className="filter-box">
								<p className="fil">Residential</p>
								<p className="fil">Commercial</p>
								<p className="fil">mixed</p>
							</div>
							<div className="filter-imgs">
								<div className="singlefil">
									<div className="iconfil">
										<img src="asset/bungalow-1.png" alt />
									</div>
									<div className="txtfil">Bungalow</div>
								</div>
								<div className="singlefil">
									<div className="iconfil">
										<img src="asset/apartment.png" alt />
									</div>
									<div className="txtfil">Flat</div>
								</div>
								<div className="singlefil">
									<div className="iconfil">
										<img src="asset/duplex-1.png" alt />
									</div>
									<div className="txtfil">Duplex</div>
								</div>
								<div className="singlefil">
									<div className="iconfil">
										<img src="asset/terrace-1.png" alt />
									</div>
									<div className="txtfil">Terrace</div>
								</div>
							</div>
							<div className="counter-pad">
								<div className="counter-label">Bedrooms</div>
								<div className="counter-box">
									<button className="countbtn" onClick={decrement}>
										-
									</button>
									<input
										className="countbox"
										value={counter}
										// ['onChange={(e) =>
										// 	setUserOption({ ...userOption, bathroom: e.target.value })
										// }']
									/>
									<button className="countbtn" onClick={increment}>
										+
									</button>
								</div>
							</div>
							<div className="counter-pad">
								<div className="counter-label">Bathrooms</div>
								<div className="counter-box">
									<button className="countbtn">-</button>
									<div className="countbox">1</div>
									<button className="countbtn">+</button>
								</div>
							</div>
							<div className="joint-btn">
								<button className="no-color-btn">Clear Filters</button>
								<button className="color-btn">Apply Filters</button>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="row">
								{loading ? (
									<div className="loading">
										<Spinner size={40} color={"primary"} />
									</div>
								) : (
									<>
										{isProperty.map((property, i) => {
											return (
												<ListedCard property={property} />
												);
										})}
									</>
								)}
							</div>
							{/* <div className="d-flex">
								<button className="secondary-btn" onClick={showFirst}>
									First
								</button>
								<button className="secondary-btn" onClick={showPrev}>
									Previous
								</button>
								<button className="secondary-btn" onClick={showNext}>
									Next
								</button>
								<button className="secondary-btn" onClick={showLast} disabled>
									Last
								</button>
							</div> */}
						</div>
					</div>
				) : (
					<Request />
				)}
			</div>
		</>
	);
}

export default Buy;
