import React, { useState } from "react";
import Modal from "../../Utilities/Modal";
import RentOption from "./RentOption";

function Rent() {
	const [rentOption, setRentOption] = useState(false);
	return (
		<div>
			<Modal
				open={rentOption}
				close={() => {
					setRentOption(false);
				}}
			>
				<RentOption setRentOption={setRentOption} />
			</Modal>

			<div className="new-intro">What do you want to do?</div>
			<div className="row">
				<div className="col-lg-4">
					<div className="small-cards" onClick={() => setRentOption(true)}>
						<div className="iconsection" />
						<div className="text-sections">
							<div className="rent-title">Rent out your property</div>
							<div className="rent-sub">
								Get verified tenants and enjoy hassle-free rent collection{" "}
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="small-cards">
						<div className="iconsection" />
						<div className="text-sections">
							<div className="rent-title">Rent out your property</div>
							<div className="rent-sub">
								Get verified tenants and enjoy hassle-free rent collection{" "}
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="small-cards">
						<div className="iconsection" />
						<div className="text-sections">
							<div className="rent-title">Rent out your property</div>
							<div className="rent-sub">
								Get verified tenants and enjoy hassle-free rent collection{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Rent;