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
  
  const myMataazMenu = {
    title: "My Mataaz",
    subMenus: [
      {
        title: 'Listings',
        path: '/listings',
        callback: null,
      },
      {
        title: 'Drafts',
        path: '/sell/drafts',
        callback: null,
      },
      {
        title: 'Rent',
        path: '/my-rent',
        callback: null,
      },
      {
        title: 'Sessions',
        path: '/sessions',
        callback: null,
      },
    ]
  }
  const profileMenu = {
    title: `${data.user.firstName}`,
    subMenus: [
      {
        title: 'Profile',
        path: '/profile',
        callback: null,
      },
      {
        title: 'Logout',
        path: '/',
        callback: () => logoutUser(),
      },
    ]
  }

  const logoutUser = () => {
    localStorage.clear();
	  window.location.href = '/';
    history.go("/");
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
              <Link to="/sell" className={getNavAnchorClass("/sell")}>
                Sell
              </Link>
              {/* <i className="fas fa-chevron-down icon-small" />
              <div className="dropdown-content">
                <ul>
                  <li onClick={() => history.push("/sell")}>My Listings</li>
                  <li onClick={() => history.push("/sell/drafts")}>
                    My Drafts
                  </li>
                </ul>
              </div> */}
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
            <DropdownContent 
              getNavLinkClass={getNavLinkClass}
              getNavAnchorClass={getNavLinkClass}
              navigation={myMataazMenu}
            />

            {data.user ? (
              <>
                <DropdownContent 
                  getNavLinkClass={getNavLinkClass}
                  getNavAnchorClass={getNavLinkClass}
                  navigation={profileMenu}
                  avatar={`${data.user.profilePicture}`}
                />
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



export const DropdownContent = ({ getNavLinkClass, getNavAnchorClass, navigation, avatar = null, }) => {
  const { data } = useContext(MainContext);
  const [ showDropdown, setShowDropdown] = useState(false);
  const ddRef = useRef();
  
  const closeDropdownContent = (e) => {
    if(ddRef.current === e.target ) {
      setShowDropdown(!showDropdown)
    }
  }
  
  return (
    <li onClick={(e) => closeDropdownContent(e)} ref={ddRef} className={`hover-dropdown ${getNavLinkClass("/welcome")}`}>
      {(navigation.title != `${data.user.firstName}`) ? (
        <>
          <a className={`mr-1 ${getNavAnchorClass("/my")}`}>
            {navigation.title}
          </a>
          <i className="fas fa-chevron-down icon-small" />
        </>
      )      
      : (
        <div className="user-info">
          <a href="#" className="mr-2">
            {data.user.firstName}
          </a>
          <div className="avatar ml-0">
            <img
              src={`${ data.user.profilePicture ?  data.user.profilePicture : "/asset/user/user-icon.png" }`}  
              alt={data.user ? data.user.firstName : "default-user"}
            />
          </div>
          <i className="fas fa-chevron-down icon-small" />
        </div>
      )}
      
      <div className={`dropdown-content ${showDropdown ? 'visible' : ''}`}>
        <ul>
          {navigation.subMenus.map((menu, index) => {
            return <li key={index} onClick={ menu.callback && menu.callback}>
                <Link to={menu.path}>{menu.title}</Link>
              </li>
          })}
        </ul>
      </div>
    </li>
  )
}