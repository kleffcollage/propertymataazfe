import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function UserNav() {
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
						<li className={`${getNavLinkClass("/sell")}`}>
							<Link to="/sell">Sell</Link>
						</li>
						<li className={`${getNavLinkClass("/buy")}`}>
							<Link to="/buy">Buy</Link>
						</li>
						<li className={`${getNavLinkClass("/rent")}`}>
							<Link to="/rent">Rent</Link>
						</li>
						<li className={`${getNavLinkClass("/clean")}`}>
							<Link to="/clean">Clean</Link>
						</li>
						<li className={`mr-0 ${getNavLinkClass("/fix")}`}>
							<Link to="fix" className="mr-0">
								Fix
							</Link>
						</li>
					</ul>
					<div className="logo">
						<Link to="/" src alt="Logo" />
					</div>
					<ul className="right-menu">
						<li className={`${getNavLinkClass("/verify")}`}>
							<Link to="/verify">Verify</Link>
						</li>
						<li className={`${getNavLinkClass("/getloan")}`}>
							<Link to="/getloan">Get Loan</Link>
						</li>
						<li className={`hover-dropdown ${getNavLinkClass("/welcome")}`}>
							My Mattaz <i className="fas fa-chevron-down icon-small" />
							<div className="dropdown-content">
								<ul>
									<li>My Rents</li>
									<li>Show Rents</li>
									<li>Logout</li>
								</ul>
							</div>
						</li>
						<li className={`user-info mr-0 ${getNavLinkClass("/welcome")}`}>
							Folabi
							<div className="avatar">
								<img src alt />
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default UserNav;
