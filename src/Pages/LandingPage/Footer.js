import React from "react";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="container-fluid">
			<div className="container">
				<div className="row">
					<div className="col-6 col-md-2 mt-3 mt-sm-0">
						<label className="foot-title">PropertyMataaz</label>
						<ul className="footer">
							<li>
								<a href="#">About Us</a>								
							</li>
							<li>
								<a href="#">Contact Us</a>								
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-2 mt-3 mt-sm-0">
						<label className="foot-title">Legal</label>
						<ul className="footer">
							<li>
								<a href="asset/disclaimers/PRIVACY_POLICY.docx">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" />
								Terms &amp; Conditions
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-2 mt-3 mt-sm-0">
						<label className="foot-title">Features</label>
						<ul className="footer">
							<li>
								<Link to="/">
									Buy Property
								</Link>
							</li>
							<li>
								<Link to="/">
									Sell Property
								</Link>
							</li>
							<li>
								<Link to="/">
									Rent
								</Link>
							</li>
							<li>
								<Link to="/">
									Cleaning &amp; Repairs
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-2 mt-3 mt-sm-0">
						<label className="foot-title">Enquiry</label>
						<ul className="footer">
							<li>
								<Link to="/">
									Chat with us
								</Link>
							</li>
							<li>
								<Link to="/">
									FAQs
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-2 mt-3 mt-sm-0">
						<label className="foot-title">Social media</label>
						<ul className="footer">
							<li>
								<i className="fab fa-facebook" />
								<a href="https://www.facebook.com/propertymataaz">
									propertymataaz
								</a>
							</li>
							{/* <li>
								<i className="fab fa-twitter" />
								<a href="#" />
								propertymataaz
							</li> */}
							<li>
								<i className="fab fa-linkedin" />
								<a href="https://www.linkedin.com/company/the-property-box-limited">
									propertymataaz
								</a>
							</li>
							<li>
								<i className="fab fa-instagram" />
								<a href="https://www.instagram.com/propertymataaz/">
									propertymataaz
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="site-description">
					PropertyMataaz is a product of PropertyMataaz Limited, a subsidiary of Oxygen Holdings.  Payments on PropertyMataaz are made via Interswitch; a PCI DSS certified payment platform with bank-level security to ensure your transactions and financial information are kept safe at all times.
				</div>
				<div className="copyright">
					© 2020 PropertyMataaz Limited. All rights reserved.
				</div>
			</div>
		</footer>
	);
}

export default Footer;
