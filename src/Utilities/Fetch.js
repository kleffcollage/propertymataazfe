export default function Fetch(
	Url,
	Method = "get",
	Data = null,
	isFormData = false,
	stringify = true
) {
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
	console.log(process.env.REACT_APP_APIBASEURl);
	var ModifiedUrl = process.env.REACT_APP_APIBASEURl + Url;
	console.log(ModifiedUrl);
	var Response = fetch(ModifiedUrl, {
		method: Method,
		body: Data,
		headers: headers,
	});

	Response.then((data) => {
		if (data.status == 401 || data.statusText == "Unauthorized") {
			localStorage.clear();
			window.location.href = "/login";
		}
	});
	Response = Response.then((res) => res.json());
	return Response;
}
