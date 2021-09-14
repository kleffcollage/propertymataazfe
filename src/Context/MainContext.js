import React from "react";

const data = {
	user: {},
	applicationTypes: [],
};

export const MainContext = React.createContext({
	data,
	setUser: () => {},
	setApplication: () => {},
});
