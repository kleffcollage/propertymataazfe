import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
	const location = useLocation();
	const getNavLinkClass = (path) =>
		location.pathname.startsWith(path) ? "active" : "";

	const [nav, setNav] = useState(false);
	const navBody = useRef();
	
	const showNav = (e) => {
		if( navBody.current === e.target ) {
			setNav(!nav);
			return
		}
		
		setNav(!nav);
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
			<div className={`overlay-wrapper ${!nav ? "" : "disappear"}`} onClick={showNav} ref={navBody}>
				<nav className={`container ${!nav ? "" : "display"}`}>
					<ul className="left-menu">
						<li>
							<Link to="/login">Sell</Link>
						</li>
						<li>
							<Link to="/Buy">Buy</Link>
						</li>
						<li>
							<Link to="/login">Rent</Link>
						</li>
						<li>
							<Link to="/login">Clean</Link>
						</li>
						{/* <li>
							<Link to="login" className="mr-0">
								Fix
							</Link>
						</li> */}
					</ul>

					<Link to="/">
						<div className="logo">
							<img src="/asset/logo.png" alt="Logo" />
						</div>
					</Link>
					<ul className="right-menu">
						<li>
							<Link to="/login">Verify</Link>
						</li>
						<li>
							<Link to="/login">Get Rent Loan</Link>
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
