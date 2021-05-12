import React from "react";
import { RotateSpinner } from "react-spinners-kit";

function Spinner(props) {
	const { size, color } = props;
	return (
		<RotateSpinner
			size={!size ? 20 : size}
			color={!color ? "#fff" : color == "primary" ? "#0042FF" : color}
			loading={true}
		/>
	);
}

export default Spinner;
