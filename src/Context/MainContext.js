import React from "react";

const data = {
	user: {},
};

export const MainContext = React.createContext({
	data,
	setUser: () => {},
});
