import React from "react";

const data = {
	user: {},
	alert: {},
};

export const MainContext = React.createContext({
	data,
	setUser: () => {},
	showAlert: () => {},
});
