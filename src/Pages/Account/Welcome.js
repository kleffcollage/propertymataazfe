import React, { useState } from "react";

function Welcome() {
	const [tab, setTab] = useState("listed");
	const [counter, setCounter] = useState(1);

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
	return (
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
								<img src alt />
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
									<img src alt />
								</div>
								<div className="txtfil">Bungalow</div>
							</div>
							<div className="singlefil">
								<div className="iconfil">
									<img src alt />
								</div>
								<div className="txtfil">Flat</div>
							</div>
							<div className="singlefil">
								<div className="iconfil">
									<img src alt />
								</div>
								<div className="txtfil">Duplex</div>
							</div>
							<div className="singlefil">
								<div className="iconfil">
									<img src alt />
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
							<div className="col-lg-4">
								<div className="listing-cards">
									<div className="listing-cover-img">
										<img src="/asset/coverimg.png" alt />
										<div className="listing-location">Lekki Phase 1</div>
									</div>
									<div className="listing-info">
										<div className="title-group">
											<div className="listing-title">
												7 Bedroom Mansion with Olympic size swimming Pool
											</div>
											<div className="verified">
												<i className="fas fa-badge-check" />
											</div>
										</div>
										<div className="feature-group">
											<div className="feature-sing">
												<i className="far fa-bed" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-toilet" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-tags" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-award" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
										</div>
									</div>
									<div className="line" />
									<div className="listing-info pt-0">
										<div className="listing-btn">
											<button className="list-no-color-btn">See more</button>
											<button className="list-color-btn">Enquire</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="listing-cards">
									<div className="listing-cover-img">
										<img src="/asset/coverimg.png" alt />
										<div className="listing-location">Lekki Phase 1</div>
									</div>
									<div className="listing-info">
										<div className="title-group">
											<div className="listing-title">
												7 Bedroom Mansion with Olympic size swimming Pool
											</div>
											<div className="verified">
												<i className="fas fa-badge-check" />
											</div>
										</div>
										<div className="feature-group">
											<div className="feature-sing">
												<i className="far fa-bed" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-toilet" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-tags" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-award" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
										</div>
									</div>
									<div className="line" />
									<div className="listing-info pt-0">
										<div className="listing-btn">
											<button className="list-no-color-btn">See more</button>
											<button className="list-color-btn">Enquire</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="listing-cards">
									<div className="listing-cover-img">
										<img src="/asset/coverimg.png" alt />
										<div className="listing-location">Lekki Phase 1</div>
									</div>
									<div className="listing-info">
										<div className="title-group">
											<div className="listing-title">
												7 Bedroom Mansion with Olympic size swimming Pool
											</div>
											<div className="verified">
												<i className="fas fa-badge-check" />
											</div>
										</div>
										<div className="feature-group">
											<div className="feature-sing">
												<i className="far fa-bed" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-toilet" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-tags" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-award" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
										</div>
									</div>
									<div className="line" />
									<div className="listing-info pt-0">
										<div className="listing-btn">
											<button className="list-no-color-btn">See more</button>
											<button className="list-color-btn">Enquire</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="listing-cards">
									<div className="listing-cover-img">
										<img src="/asset/coverimg.png" alt />
										<div className="listing-location">Lekki Phase 1</div>
									</div>
									<div className="listing-info">
										<div className="title-group">
											<div className="listing-title">
												7 Bedroom Mansion with Olympic size swimming Pool
											</div>
											<div className="verified">
												<i className="fas fa-badge-check" />
											</div>
										</div>
										<div className="feature-group">
											<div className="feature-sing">
												<i className="far fa-bed" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-toilet" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-tags" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-award" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
										</div>
									</div>
									<div className="line" />
									<div className="listing-info pt-0">
										<div className="listing-btn">
											<button className="list-no-color-btn">See more</button>
											<button className="list-color-btn">Enquire</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="listing-cards">
									<div className="listing-cover-img">
										<img src="/asset/coverimg.png" alt />
										<div className="listing-location">Lekki Phase 1</div>
									</div>
									<div className="listing-info">
										<div className="title-group">
											<div className="listing-title">
												7 Bedroom Mansion with Olympic size swimming Pool
											</div>
											<div className="verified">
												<i className="fas fa-badge-check" />
											</div>
										</div>
										<div className="feature-group">
											<div className="feature-sing">
												<i className="far fa-bed" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-toilet" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-tags" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
											<div className="feature-sing">
												<i className="far fa-award" />
												<div className="feature-title">7 Bedrooms</div>
											</div>
										</div>
									</div>
									<div className="line" />
									<div className="listing-info pt-0">
										<div className="listing-btn">
											<button className="list-no-color-btn">See more</button>
											<button className="list-color-btn">Enquire</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="row">
					<div className="col-lg-3">
						<div className="input-box">
							<div className="input-label req">Type</div>
							<div className="select-boxx">
								<input type="text" className="formfield" placeholder="John" />
								<div className="arrows" />
							</div>
						</div>
						<div className="input-box">
							<div className="input-label req">State</div>
							<div className="select-boxx">
								<input type="text" className="formfield" placeholder="John" />
								<div className="arrows" />
							</div>
						</div>
						<div className="input-box">
							<div className="input-label req">Locality(Optional)</div>
							<div className="select-boxx">
								<input type="text" className="formfield" placeholder="John" />
								<div className="arrows" />
							</div>
						</div>
						<div className="input-box">
							<div className="input-label req">Area(Optional)</div>
							<div className="select-boxx">
								<input type="text" className="formfield" placeholder="John" />
								<div className="arrows" />
							</div>
						</div>
						<div className="input-box">
							<div className="input-label req">Budget</div>
							<div className="select-boxx">
								<select className="formfield">
									<option>Choose an option</option>
								</select>
								<div className="arrows" />
							</div>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="input-box">
							<div className="input-label req">Comments</div>
							<div className="select-boxx mb-4">
								<input type="text" className="formfield" placeholder="John" />
								<div className="arrows" />
							</div>
						</div>
						<div className="counter-pad">
							<div className="counter-label">Bedrooms</div>
							<div className="counter-box">
								<button className="countbtn">-</button>
								<div className="countbox">1</div>
								<button className="countbtn">+</button>
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
						<button className="color-btn submit w-100 mt-3">
							Submit Request
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Welcome;
