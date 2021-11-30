import React from 'react';
import { toast } from 'react-toastify';
import {useHistory }from 'react-router-dom'


export default function Fetch(
	Url,
	Method = "get",
	Data = null,
	isFormData = false,
	stringify = true
) {
	// const history = useHistory();
	if (Data && stringify) {
		Data = JSON.stringify(Data);
	}

	let headers = {
		cor: "no-cors",
		Authorization: `Bearer ${
			localStorage.getItem("token") ? localStorage.getItem("token") : ""
		}`,
	};

	if (!isFormData) {
		headers = { ...headers, "content-type": "application/json" };
	}

	var ModifiedUrl = process.env.REACT_APP_APIBASEURl + Url;

	var Response = fetch(ModifiedUrl, {
		method: Method,
		body: Data,
		headers: headers,
	});

	Response.then((data) => {
		if (data.status == 401 || data.statusText == "Unauthorized") {
			toast.info("PLease login or create and account to perform this actions",{autoClose:false});
			localStorage.clear();
			localStorage.setItem("Unauthorized","true");
			// history.push("/login");
			window.location.href = "/";
		}
	});
	Response = Response.then((res) => res.json());
	return Response;
}
