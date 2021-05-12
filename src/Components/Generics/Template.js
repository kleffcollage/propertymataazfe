import React from "react";
import { useLocation } from "react-router";
import UserNav from "../Navs/UserNav";

function Template(props) {
	const location = useLocation();
	return (
		<>
			{location.pathname == "/" ||
			location.pathname == "/login" ||
			location.pathname == "/signup" ? (
				<>{props.children}</>
			) : (
				<>
					<UserNav />
					<div className="container-fluid mar-7">
						<div className="container">{props.children}</div>
					</div>
				</>
			)}
		</>
	);
}

export default Template;
