import React, { useContext } from "react";
import { MainContext } from "../Context/MainContext";

function Alert(props) {
	const { data } = useContext(MainContext);
	return (
		<>
			{data.alert.show ? (
				<div className={`alert alert-${data.alert.type}`} role="alert">
					<h4 className="alert-heading">{data.alert.title}</h4>
					<p>{data.alert.message}</p>
				</div>
			) : null}
		</>
	);
}

export default Alert;
