import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Utilities/Modal";
import RentOption from "./RentOption";
import ReliefForm from "./ReliefForm";

function Rent() {
	const [rentOption, setRentOption] = useState(false);
	const [rentRelief, setRentRelief] = useState(false)
	
	
	return (
		<div>
			<Modal open={rentOption}
				close={() => {
					setRentOption(false);
				}}
			>
				<RentOption setRentOption={setRentOption} />
			</Modal>

			<div className="new-intro">What do you want to do?</div>
			<div className="row">
				<div className="col-lg-6 my-2">
					<div className="small-cards" onClick={() => setRentOption(true)}>
						<div className="iconsection">
							<img src="/asset/Rent/listProperty.png" alt="list-property" />
						</div>
						<div className="text-sections">
							<div className="rent-title">Rent out your property</div>
							<div className="rent-sub">
								Get verified tenants and enjoy hassle-free rent collection{" "}
							</div>
						</div>
					</div>
				</div>
				
				<div className="col-lg-6 my-2">
					<Link to="/rent/rentProperty" className="small-cards">
						<div className="iconsection">
							<img src="/asset/Rent/findProperty.png" alt="find-property" />
						</div>
						<div className="text-sections">
							<div className="rent-title">Rent a property</div>
							<div className="rent-sub">
								Find the perfect property from a wide range of options
							</div>
						</div>
					</Link>
				</div>
				
				{/* <Modal open={rentRelief} 
					close={() => { setRentRelief(false) }}
				>
					<ReliefForm close={() => setRentRelief(false)} />
				</Modal> */}
				
				{/* <div className="col-lg-4 my-2">
					<div className="small-cards" onClick={() => setRentRelief(true)}>
						<div className="iconsection flex-shrink-1" />
						<div className="text-sections">
							<div className="rent-title">Get Rent Relief</div>
							<div className="rent-sub">
								Get verified tenants and enjoy hassle-free rent collection
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default Rent;
