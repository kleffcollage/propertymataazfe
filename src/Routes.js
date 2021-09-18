import React from "react";
import { Switch, Route } from "react-router-dom";
import Buy from "./Pages/Account/Buy/Buy";
import Enquires from "./Pages/Account/Buy/Enquires";
import ConfirmPay from "./Pages/Account/Buy/ConfirmPay";
import Drafts from "./Pages/Account/Sell/Drafts";
import Sell from "./Pages/Account/Sell/Sell";
import Login from "./Pages/Authentication/Login";
import Reset from "./Pages/Authentication/Reset";
import SignUp from "./Pages/Authentication/SignUp";
import Home from "./Pages/LandingPage/Home";
import Rent from "./Pages/Rent/Rent";
import RentPropertyList from "./Pages/Rent/RentPropertyList";
import Dashboard from "./Pages/Account/Dashboard";
import Verify from "./Pages/Verify";
import Clean from "./Pages/Clean";
import Fix from "./Pages/Fix";
import NotFound from "./Components/Generics/NotFound";

const ROUTES = [
	{ path: "/", key: "ROOT", exact: true, component: () => <Home /> },
	{ path: "/verify", key: "ROOT", exact: true, component: () => <Verify /> },
	{ path: "/clean", key: "ROOT", exact: true, component: () => <Clean /> },
	{ path: "/fix", key: "ROOT", exact: true, component: () => <Fix /> },
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
				path: "/login/reset/:code",
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
			{
				path: "/sell/drafts",
				key: "SELL",
				exact: true,
				component: () => <Drafts />,
			},
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
				component: () => <Enquires isRent={false} />,
			},
		],
	},
	{
		path: "/rent",
		key: "RENT",
		component: RenderRoutes,
		routes: [
			{ path: "/rent", key: "RENT", exact: true, component: () => <Rent /> },
			{ path: "/rent/rentProperty", key: "RENT", exact: true, component: () => <RentPropertyList /> },
			{ path: "/rent/enquires/:propertyId", key: "RENT", exact: true, component: () => <Enquires isRent={true} /> },
		],
	},
	{ path: "/my-mattaz", key: "ROOT", exact: true, component: () => <Dashboard /> },
	{ path: "/payment-confirm", key: "ROOT", exact: true,  component: () => <ConfirmPay /> },
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
				<Route component={() => <NotFound /> } />
			</Switch>
		</>
	);
}
