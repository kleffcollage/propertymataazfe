import { useEffect, useState } from "react";
import ROUTES, { RenderRoutes } from "../../Routes";
import { MainContext } from "../../Context/MainContext";
import Template from "../Generics/Template";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
	const sampledata = {
		user: {},
		alert: {},
	};

	const [data, setContextData] = useState(sampledata);
	const setUser = (user) => {
		setContextData({ ...data, user: user });
	};

	const showAlert = (type, message, title) => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
		let alert = {
			type: type,
			message: message,
			title: title,
			show: true,
		};
		setContextData({ ...data, alert: alert });
		setTimeout(() => {
			setContextData({ ...data, alert: {} });
		}, 5000);
	};
	useEffect(() => {
		let user = localStorage.getItem("user");
		setUser(JSON.parse(user));
		console.log(JSON.parse(user));
	}, []);

	return (
		<>
			<MainContext.Provider value={{ data, setUser, showAlert }}>
				<ToastContainer/>
				<Template>
					<RenderRoutes routes={ROUTES} />
				</Template>
			</MainContext.Provider>
		</>
	);
}

export default App;
