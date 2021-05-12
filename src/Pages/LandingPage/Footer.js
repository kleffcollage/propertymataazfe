import React from "react";

function Footer() {
	return (
		<footer className="container-fluid">
			<div className="container">
				<div className="row">
					<div className="col">
						<label className="foot-title">Liquede</label>
						<ul className="footer">
							<li>
								<a href="#" />
								About Us
							</li>
							<li>
								<a href="#" />
								Contact Us
							</li>
							<li>
								<a href="#" />
								Career
							</li>
							<li>
								<a href="#" />
								CSR
							</li>
						</ul>
					</div>
					<div className="col">
						<label className="foot-title">Legal</label>
						<ul className="footer">
							<li>
								<a href="#" />
								Privacy Policy
							</li>
							<li>
								<a href="#" />
								Terms &amp; Conditions
							</li>
						</ul>
					</div>
					<div className="col">
						<label className="foot-title">Products</label>
						<ul className="footer">
							<li>
								<a href="#" />
								Savings
							</li>
							<li>
								<a href="#" />
								Loans
							</li>
							<li>
								<a href="#" />
								Investments
							</li>
							<li>
								<a href="#" />
								Payments
							</li>
						</ul>
					</div>
					<div className="col">
						<label className="foot-title">Enquiry</label>
						<ul className="footer">
							<li>
								<a href="#" />
								Chat
							</li>
							<li>
								<a href="#" />
								FAQs
							</li>
						</ul>
					</div>
					<div className="col">
						<label className="foot-title">Social media</label>
						<ul className="footer">
							<li>
								<i className="fab fa-facebook" />
								<a href="#" />
								propertymataaz
							</li>
							<li>
								<i className="fab fa-twitter" />
								<a href="#" />
								propertymataaz
							</li>
							<li>
								<i className="fab fa-linkedin" />
								<a href="#" />
								propertymataaz
							</li>
							<li>
								<i className="fab fa-instagram" />
								<a href="#" />
								propertymataaz
							</li>
						</ul>
					</div>
				</div>
				<div className="site-description">
					PropertyMataaz is a product of PropertyMataaz Limited, a subsidiary of
					Oxygen Holdings. Banking services on Liquede are provided by Bank
					Limited, which is registered with the Central Bank of Nigeria.
					Payments on Liquede are made via Interswitch; a PCI DSS certified
					payment platform with bank-level security to ensure your transactions
					and financial information are kept safe at all times.
				</div>
				<div className="copyright">
					© 2020 PropertyMataaz Limited. All rights reserved.
				</div>
			</div>
		</footer>
	);
}

export default Footer;
