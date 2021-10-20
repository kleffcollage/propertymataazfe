import React, {useState} from "react";
import ListedCard from "../../Components/Generics/ListedCard";
import Modal from "../../Utilities/Modal";
import SeeMore from "../Account/Buy/SeeMore"

function Body({ properties }) {
	const [seemore,setSeeMore] = useState(false);
	const [propertyId,setPropertyId] = useState(0);
  console.log({ properties });

  const showPopUp =(id) => { 
	setPropertyId(id);
	setSeeMore(true);
  }
  return (
    <>
	<Modal
        open={seemore}
        onClose={() => {
          setSeeMore(false);
        }}
      >
        <SeeMore
          propertyId={propertyId}
          setSeeMore={setSeeMore}
          seller={false}
          tenant={false}
        />
      </Modal>
      <div>
        <div className="container-fluid">
          <div className="container">
            {properties.length < 1 && (
              <div className="row">
                <div className="col-lg-6">
                  <div className="cards">
                    <div className="placeholder">
                      <img
                        src="/asset/sell_illustration.png"
                        alt="placeholder"
                      />
                    </div>
                    <div className="side-info">
                      <h3>
                        <span>Sell </span>your property
                      </h3>
                      <p className="sub-text">
                        List your property on PropertyMataaz and get the
                        attention of thousands of propspective buyers with the
                        best offers in the market.
                      </p>
                      <button className="primary-btn">
                        List your Property
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="cards">
                    <div className="placeholder">
                      <img
                        src="/asset/buy_illustration.png"
                        alt="placeholder"
                      />
                    </div>
                    <div className="side-info">
                      <h3>
                        <span>Buy </span>property with 103% money-back guarantee
                      </h3>
                      <p className="sub-text">
                        Browse our inventory of verified properties or make a
                        request based on your preferences. Whatever your choice,
                        we’ll do you a 103% refund if legal issues arise
                      </p>
                      <button className="primary-btn">Browse Properties</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="cards">
                    <div className="placeholder">
                      <img
                        src="/asset/rent_illustration.png"
                        alt="placeholder"
                      />
                    </div>
                    <div className="side-info">
                      <h3>
                        All your <span>rent</span> problems solved
                      </h3>
                      <p className="sub-text">
                        Access vetted tenants, guaranteed rental income,
                        affordable rent, 0 agency fees and quick rent loans.
                      </p>
                      <button className="primary-btn">Get Started</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="cards">
                    <div className="placeholder">
                      <img
                        src="/asset/clean_illustration.png"
                        alt="placeholder"
                      />
                    </div>
                    <div className="side-info">
                      <h3>
                        Enjoy top-notch <span>cleaning </span> and janitorial
                        services
                      </h3>
                      <p className="sub-text">Professional cleaning services</p>
                      <button className="primary-btn">
                        Schedule a Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row mt-5">
              {properties &&
                properties.length > 0 &&
                properties.map((property, index) => {
                  return <ListedCard property={property} seeMore={() =>showPopUp(property.id)}/>;
                })}
            </div>
          </div>
        </div>
        <div className="getapp">
          <div className="content">
            <div className="texts">
              <h1>Get the app!</h1>
              <p>
                Download our Android or iOS app and take PropertyMataaz with you
                wherever you go.
              </p>
            </div>
            <div className="dl-icons">
              <img src="/asset/iOS+App+Store+badge-min.png" alt="iOS" />
              <img src="/asset/Google+Play+badge-min.png" alt="Google" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
