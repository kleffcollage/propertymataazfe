import React from "react";
import { Link } from "react-router-dom";

function Hero({search, setSearch, trigger, properties, clear }) {
  const handleKeyPress = (e) => {
    console.log({ e });
    if (e.charCode !== 13) return;
    trigger();
  };
  return (
    <div className="hero">
      <div className="content">
        <h1>Find property to rent or buy</h1>
        <div className="input-box">
          <input
            type="text"
            className="homesearch"
            placeholder="Enter an address, state, neighbourhood or area"
			value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          {properties.length <= 0 ? (
            <div className="home-search-icon" onClick={() => trigger()}>
              <img src="/asset/searchicon.svg" alt="search" />
            </div>
          ) : (
            <div className="home-search-icon" onClick={() => clear()}>
              <i className="far fa-times" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
