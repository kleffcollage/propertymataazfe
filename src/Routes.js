import React from "react";
import { Switch, Route } from "react-router-dom";
import Buy from "./Pages/Account/Buy";
import Sell from "./Pages/Account/Sell/Sell";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import Home from "./Pages/LandingPage/Home";

const ROUTES = [
	{ path: "/", key: "ROOT", exact: true, component: () => <Home /> },
	{ path: "/signup", key: "ROOT", exact: true, component: () => <SignUp /> },
	{
		path: "/login",
		key: "AUTH",
		component: RenderRoutes,
		routes: [
			{
				path: "/login",
				key: "AUTH_ROOT",
				exact: true,
				component: () => <Login />,
			},
		],
	},
	{
		path: "/sell",
		key: "SELL",
		component: RenderRoutes,
		routes: [
			{ path: "/sell", key: "SELL", exact: true, component: () => <Sell /> },
		],
	},
	{
		path: "/buy",
		key: "BUY",
		component: RenderRoutes,
		routes: [
			{ path: "/buy", key: "BUY", exact: true, component: () => <Buy /> },
		],
	},
];
export default ROUTES;

function RouteWithSubRoutes(route) {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => <route.component {...props} routes={route.routes} />}
		/>
	);
}

export function RenderRoutes({ routes }) {
	return (
		<>
			<Switch>
				{routes.map((route, i) => {
					return <RouteWithSubRoutes key={route.key} {...route} />;
				})}
				<Route component={() => <h1>Not Found!</h1>} />
			</Switch>
		</>
	);
}
