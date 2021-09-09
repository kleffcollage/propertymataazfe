import React, { useState } from "react";
import Modal from "../../Utilities/Modal";
import RentForm from "./RentForm";

function RentOption({ setRentOption }) {
	const [rentModal, setRentModal] = useState(false)
	
	const openRentModal = () => {
		setRentModal(!rentModal)
	}
	const close = () => {
		setRentModal(false)
	}
	
	return (
		<div>
			<Modal open={rentModal} close={() => { setRentModal(false)}}>
				<RentForm close={close} />
			</Modal>
			
			<div
				className="close-icon text-right"
				onClick={() => {
					setRentOption(false);
				}}
			>
				<i className="fas fa-times" />
			</div>
			
			<div className="page-title">Choose an option to continue</div>
			<button className="options my-2" onClick={openRentModal}>List property yourself</button>
			<button className="options my-2">Get help listing property</button>
		</div>
	);
}

export default RentOption;
