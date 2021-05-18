import React from "react";

function RentOption({ setRentOption }) {
	return (
		<div>
			<div
				className="close-icon text-right"
				onClick={() => {
					setRentOption(false);
				}}
			>
				<i className="fas fa-times" />
			</div>
			<div className="page-title">Choose an option to continue</div>
			<button className="options">List property yourself</button>
			<button className="options">Get help listing property</button>
		</div>
	);
}

export default RentOption;
