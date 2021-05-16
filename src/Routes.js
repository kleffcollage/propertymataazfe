import React from "react";
import { Switch, Route } from "react-router-dom";
import Buy from "./Pages/Account/Buy/Buy";
import Enquires from "./Pages/Account/Buy/Enquires";
import Sell from "./Pages/Account/Sell/Sell";
import Login from "./Pages/Authentication/Login";
import Reset from "./Pages/Authentication/Reset";
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
			{
				path: "/login/reset",
				key: "AUTH_ROOT",
				exact: true,
				component: () => <Reset />,
			},
			{
				path: "login/reset:code",
				key: "AUTH_ROOT",
				exact: true,
				component: (props) => <Reset {...props} />,
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
			{
				path: "/buy/enquires/:propertyId",
				key: "BUY",
				exact: true,
				component: () => <Enquires />,
			},
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
