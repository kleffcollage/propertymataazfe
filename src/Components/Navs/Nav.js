import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
	const location = useLocation();
	const getNavLinkClass = (path) =>
		location.pathname.startsWith(path) ? "active" : "";

	const [nav, setNav] = useState(false);
	const showNav = () => {
		setNav(!nav);
	};
	return (
		<div>
			<div className="white-bg w-100">
				<div className="container">
					<div className="mobile-sec">
						<div className="mobile-logo">
							<img src="" alt="Logo" />
						</div>
						<div class={`hamburger ${!nav ? "" : "opened"}`} onClick={showNav}>
							<div class="burger"></div>
						</div>
					</div>
				</div>
			</div>
			<div className={`overlay-wrapper ${!nav ? "" : "disappear"}`}>
				<nav className={`container ${!nav ? "" : "display"}`}>
					<ul className="left-menu">
						<li>
							<Link to="/login">Sell</Link>
						</li>
						<li>
							<Link to="/login">Buy</Link>
						</li>
						<li>
							<Link to="/login">Rent</Link>
						</li>
						<li>
							<Link to="/login">Clean</Link>
						</li>
						<li>
							<Link to="login" className="mr-0">
								Fix
							</Link>
						</li>
					</ul>
					<div className="logo">
						<Link to="/" src alt="Logo" />
					</div>
					<ul className="right-menu">
						<li>
							<Link to="/login">Verify</Link>
						</li>
						<li>
							<Link to="/login">Get Loan</Link>
						</li>
						<li className={`${getNavLinkClass("/login")}`}>
							<Link to="/login">Login</Link>
						</li>
						<li className={`mr-0 ${getNavLinkClass("/signup")}`}>
							<Link to="/signup" className="mr-0">
								Sign Up
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Nav;
