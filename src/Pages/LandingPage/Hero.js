import React from "react";

function Hero({setSearch, trigger}) {
	return (
		<div className="hero">
			<div className="content">
				<h1>Find property to rent or buy</h1>
				<div className="input-box">
					<input
						type="search"
						className="homesearch"
						placeholder="Enter an address, state, neighbourhood or area"
						onChange={e => setSearch(e.target.value)}
					/>
					<div className="home-search-icon" onClick={() => trigger()}>
						<img src="/asset/searchicon.svg" alt="search" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
