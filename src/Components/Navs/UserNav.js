import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { MainContext } from "../../Context/MainContext";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function UserNav() {
  const location = useLocation();
  const history = useHistory();
  const { data } = useContext(MainContext);
  const navBody = useRef();

  const getNavLinkClass = (path) =>
    location.pathname.startsWith(path) ? "active" : "";
  const getNavAnchorClass = (path) =>
    location.pathname.startsWith(path) ? "active-link" : "";

  const [nav, setNav] = useState(false);

  const showNav = (e) => {
    if (navBody.current == e.target) {
      setNav(!nav);
      return;
    }
    setNav(!nav);
  };

  const logoutUser = () => {
    localStorage.clear();
	window.location.href = '/';
    history.go("/");
  };
  return (
    <div>
      <div className="white-bg w-100">
        <style></style>
        <div className="container">
          <div className="mobile-sec">
            <Link to="/">
              <div className="mobile-logo">
                <img src="/asset/logo.png" alt="Logo" />
              </div>
            </Link>
            <div
              className={`hamburger ${!nav ? "" : "opened"}`}
              onClick={showNav}
            >
              <div className="burger"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`overlay-wrapper ${!nav ? "" : "disappear"}`}
        onClick={showNav}
        ref={navBody}
      >
        <nav className={`container ${!nav ? "" : "display"}`}>
          <ul className="left-menu">
            <li className={`hover-dropdown ${getNavLinkClass("/sell")}`}>
              <Link to="" className={getNavAnchorClass("/sell")}>
                Sell
              </Link>
              <i className="fas fa-chevron-down icon-small" />
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
              <Link to="/buy" className={getNavAnchorClass("/buy")}>
                Buy
              </Link>
            </li>
            <li className={`${getNavLinkClass("/rent")}`}>
              <Link to="/rent" className={getNavAnchorClass("/rent")}>
                Rent
              </Link>
            </li>
            <li className={`${getNavLinkClass("/clean")}`}>
              <Link to="/clean" className={getNavAnchorClass("/clean")}>
                Clean
              </Link>
            </li>
            <li className={`mr-0 ${getNavLinkClass("/fix")}`}>
              <Link to="fix" className={`mr-0 ${getNavAnchorClass("/fix")}`}>
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
            {/* <li className={`${getNavLinkClass("/verify")}`}>
							<Link to="/verify">Verify</Link>
						</li>
						<li className={`${getNavLinkClass("/getloan")}`}>
							<Link to="/getloan">Get Rent Loan</Link>
						</li> */}
            <li className={`hover-dropdown ${getNavLinkClass("/welcome")}`}>
              <a href="#" className={`mr-1 ${getNavAnchorClass("/my")}`}>
                {" "}
                My Mataaz{" "}
              </a>
              <i className="fas fa-chevron-down icon-small" />
              <div className="dropdown-content">
                <ul>
                  <li>
                    <Link to="/listings">Listings</Link>
                  </li>
                  <li>
                    <Link to="/my-rent">Rent</Link>
                  </li>
                  <li>
                    <Link to="/sessions">Sessions</Link>
                  </li>
                </ul>
              </div>
            </li>

            {data.user ? (
              <>
                <li
                  className={` hover-dropdown ${getNavLinkClass("/welcome")}`}
                >
                  <div className="user-info">
                    <a href="#" className="mr-2">
                      {data.user.firstName}
                    </a>
                    <div className="avatar ml-0">
                      <img
                        src="/asset/user/user-icon.png"
                        alt={data.user ? data.user.firstName : "default-user"}
                      />
                    </div>
                    <i className="fas fa-chevron-down icon-small" />
                  </div>
                  <div className="dropdown-content">
                    <ul>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      {/* <li>Settings</li> */}
                      <li onClick={logoutUser}>Logout</li>
                    </ul>
                  </div>
                </li>
              </>
            ) : null}

            {/* { data.user  ?
							<li className={`user-info mr-0 ${getNavLinkClass("/welcome")}`}>
							{ data.user.firstName }
							<div className="avatar">
								<img src="/asset/user/user-icon.png" alt={ data.user ? data.user.firstName : "default-user"} />
							</div>
						</li>
						: null} */}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserNav;
