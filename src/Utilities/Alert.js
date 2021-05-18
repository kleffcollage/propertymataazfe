import React, { useContext } from "react";
import { MainContext } from "../Context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
