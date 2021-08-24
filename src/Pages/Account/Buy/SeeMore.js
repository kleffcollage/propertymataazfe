import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Statuses } from "../../../Utilities/Enums";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Modal from "../../../Utilities/Modal";
import { ReportProperty } from "../../../Components/Generics/ReportProperty";
import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps";
import { MapView } from "../../../Components/Generics/MapView";
import { SRLWrapper } from "simple-react-lightbox-pro";

export const SeeMore = ({ setSeeMore, propertyId }) => {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [files, setFiles] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const getPropertyDetails = async () => {
    setLoading(true);
    var data = await Fetch(`Property/get/${propertyId}`, "get");
    console.log(data);
    if (!data.status) {
      setLoading(false);
      console.log(data.message);
      return;
    }
    if (data.status != 400) {
      setLoading(false);
      setFiles(data.data.mediaFiles);
      setPropertyDetails(data.data);
      // setId(data.data);
    }
  };

  const incrementEnquire = async (id) => {
    var sendData = await Fetch(`Property/addenquiries/${id}`, "get");

    if (!sendData.status) {
      console.log(sendData.message);
      return;
    }
    if (sendData.status != 400) {
      console.log("Issokay");
    }
  };

  useEffect(() => {
    console.log("asdfghjkjhgfdsa");
    console.log(propertyId);
    getPropertyDetails();
  }, []);

  return (
    <>
      <Modal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      >
        <ReportProperty
          property={propertyDetails}
          close={() => setIsReportModalOpen(false)}
        />
      </Modal>
      {loading ? (
        <div className="loading">
          {" "}
          <Spinner size={40} color={"primary"} />{" "}
        </div>
      ) : (
        <div>
          <div className="top-section">
            <div
              className="back"
              onClick={() => {
                setSeeMore(false);
              }}
            >
              <i className="fas fa-chevron-left" />
              <span className="backs">Back</span>
            </div>
            <div className="logo">
              <img src="/asset/logo.png" alt="Logo" />
            </div>
          </div>
          <div className="cover-img">
            {files.length > 0 ? (
              <img src={files[0].url} />
            ) : (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                }
              />
            )}
            <div
              className={
                propertyDetails.area == null ? "d-none" : "listing-location"
              }
            >
              {propertyDetails.area}
            </div>
          </div>
          <div className="content-section">
            <div className="property-title">{propertyDetails.name}</div>
            <div className="feature-group">
              <div className="feature-sing">
                <i className="far fa-bed" />
                <div className="feature-title">{`${propertyDetails.numberOfBedrooms} Bedrooms`}</div>
              </div>
              <div className="feature-sing">
                <i className="far fa-toilet" />
                <div className="feature-title">
                  {" "}
                  {`${propertyDetails.numberOfBathrooms} Bathrooms`}
                </div>
              </div>
              <div className="feature-sing">
                <i className="far fa-tags" />
                <div className="feature-title">{`₦${propertyDetails.price}`}</div>
              </div>
              <div className="feature-sing">
                <i className="far fa-award" />
                <div className="feature-title">
                  {propertyDetails.propertyType}
                </div>
              </div>
            </div>
            {propertyDetails.status != Statuses.VERIFIED ? (
              <div
                className={`contact-section ${showContact ? "show-info" : ""}`}
                onClick={() => {
                  setShowContact(!showContact);
                }}
              >
                <button className="color-btn w-100 mt-4">Contact Seller</button>
                <div className="contact-info">
                  <div className="contact-name">Segun Apampa</div>
                  <div className="contact-number">+234 806 430 1234</div>
                  <div className="contact-number">segepampam@gmail.com.com</div>
                </div>
              </div>
            ) : (
              <Link
                to={`/buy/enquires/${propertyDetails.id}`}
                className="list-color-btn w-100"
                onClick={async () => {
                  await incrementEnquire(propertyId);
                }}
              >
                Enquire
              </Link>
            )}

            <div className="overview-section">
              <h2 className="property-info">Overview</h2>
              <p>{propertyDetails.description}</p>
            </div>
            <SRLWrapper>
              <div className="picture-overview">
                <h2 className="property-info">Pictures</h2>
                <div className="image-gallery">
                  {files
                    .filter((m) => m.isImage)
                    .map((singleImage, i) => {
                      return (
                        <div className="single-img">
                          <img src={singleImage.url} alt="" />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="video-overview">
                <h2 className="property-info">Video Tour</h2>
                <div className="video-gallery">
                  {files
                    .filter((m) => m.isVideo)
                    .map((video, index) => {
                      return (
                        <div className="single-img">
                          <video
                            src={video.url}
                            className="single-img"
                            srl_video_controls={true}
                            controls
                          >
                            <source src={video.url} />
                          </video>
                        </div>
                      );
                    })}
                </div>
              </div>
            </SRLWrapper>
            <div className="map-overview">
              <h2 className="property-info">Map/Street view</h2>
              <div className="map-box">
                <MapView
                  isMarkerShown
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
            </div>
            <div className="disclaimer">
              <h3>Disclaimer</h3>
              <p>
                Information displayed about this property constitutes a mere
                advertisement. PropertyMataaz makes no warranty as to the
                accuracy of the advertisement or any linked or associated
                information. Information about this property is provided and
                maintained by Segun Apampa. PropertyMataaz shall not in any way
                be held liable for the actions of any agent and/or property
                owner/landlord with respect to this property on or off this web
                application, website or App.
              </p>
            </div>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="preview-btn"
            >
              Report This Listing
            </button>
            <button className="preview-btn">Share This Listing</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SeeMore;
