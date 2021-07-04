import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { MainContext } from "../../Context/MainContext";

function UserNav() {
	const location = useLocation();
	const history = useHistory();
	const { data } = useContext(MainContext);
	const getNavLinkClass = (path) =>
		location.pathname.startsWith(path) ? "active" : "";

	const [nav, setNav] = useState(false);
	const showNav = () => {
		setNav(!nav);
	};

	const logoutUser = () => {
		localStorage.clear();
		history.push("/login");
	};
	return (
		<div>
			<div className="white-bg w-100">
				<div className="container">
					<div className="mobile-sec">
						<Link to="/">
							<div className="mobile-logo">
								<img src="/asset/logo.png" alt="Logo" />
							</div>
						</Link>
						<div class={`hamburger ${!nav ? "" : "opened"}`} onClick={showNav}>
							<div class="burger"></div>
						</div>
					</div>
				</div>
			</div>
			<div className={`overlay-wrapper ${!nav ? "" : "disappear"}`}>
				<nav className={`container ${!nav ? "" : "display"}`}>
					<ul className="left-menu">
						<li className={`hover-dropdown ${getNavLinkClass("/sell")}`}>
							Sell <i className="fas fa-chevron-down icon-small" />
							<div className="dropdown-content">
								<ul>
									<li onClick={() => history.push("/sell")}>My Listings</li>
									<li onClick={() => history.push("/sell/drafts")}>
										My Drafts
									</li>
								</ul>
							</div>
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
					<Link to="/">
						<div className="logo">
							<img src="/asset/logo.png" alt="Logo" />
						</div>
					</Link>
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
									<li onClick={logoutUser}>Logout</li>
								</ul>
							</div>
						</li>
						{data.user  ?
							<li className={`user-info mr-0 ${getNavLinkClass("/welcome")}`}>
							{data.user.firstName}
							<div className="avatar">
								<img src alt />
							</div>
						</li>
						: null}
						
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default UserNav;
