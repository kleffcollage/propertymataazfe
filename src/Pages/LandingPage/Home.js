import React from "react";
import Hero from "./Hero";
import Body from "./Body";
import Footer from "./Footer";
import Nav from "../../Components/Navs/Nav";

function Home() {
	return (
		<div>
			<Nav />
			<Hero />
			<Body />
			<Footer />
		</div>
	);
}

export default Home;
