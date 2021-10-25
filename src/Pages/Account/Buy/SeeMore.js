import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Modal from "../../../Utilities/Modal";
import { ReportProperty } from "../../../Components/Generics/ReportProperty";
import { withGoogleMap, GoogleMap, withScriptjs } from "react-google-maps";
import { MapView } from "../../../Components/Generics/MapView";
import { SRLWrapper } from "simple-react-lightbox";
import { MainContext } from "../../../Context/MainContext";
import Naira from "react-naira";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export const SeeMore = ({
  setSeeMore,
  propertyId,
  seller,
  tenant,
  isDraft,
}) => {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [files, setFiles] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showModal, setShowModal ] = useState(false)

  const user = useContext(MainContext);
  console.log({user});
  console.log(propertyDetails);
  console.log({ seller });
  
  const openShareModal = () => {
    setShowModal(!showModal);
  }

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
  
  const url = tenant 
  ? window.origin + `/rent/enquires/${propertyDetails.id}`
  :  window.origin + `/buy/enquires/${propertyDetails.id}`
  
  const handleCopyToClipboard = async () => {
    console.log({url})
    const copied = await navigator.clipboard.writeText(url);
    toast.info("Link copied successfully...")
    // console.log("Copied: ", copied)  
  }

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
      
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="top-section">
          <div className="back">
            <i className="fas fa-chevron-left mr-2"></i>
            <span
              className="backs"
              onClick={() => setShowModal(false)}
            >
              Back
            </span>
          </div>
        </div>
        {/* <ShareSocial 
          // style={style}
          url ={`${tenant ? window.origin + `/rent/enquires/${propertyDetails.id}`
                :  window.origin + `/buy/enquires/${propertyDetails.id}`}
              `}
          socialTypes={['facebook','twitter','instagram', 'whatsapp', 'linkedin']}
        /> */}
        <div>
          <div className="d-flex justify-content-start">
            <FacebookShareButton url={url} className="mb-2 ml-2">
              <FacebookIcon size={32} round></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton url={url} className="mb-2 ml-2">
              <TwitterIcon size={32} round></TwitterIcon>
            </TwitterShareButton>
            <LinkedinShareButton url={url} className="mb-2 ml-2">
              <LinkedinIcon size={32} round></LinkedinIcon>
            </LinkedinShareButton>
            <WhatsappShareButton url={url} className="mb-2 ml-2">
              <WhatsappIcon size={32} round></WhatsappIcon>
            </WhatsappShareButton>
          </div>
          <div className="d-flex align-items-center justify-content-between link-copy p-3 mt-2">
            <h5 className="mb-0 text-white"> { url }</h5>
            <button type="button" onClick={() => handleCopyToClipboard()}>Copy</button>
          </div>
        </div>
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
              <i className="fas fa-chevron-left mr-1" />
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
              {seller ? (
                <div className="activities">
                  <div className="d-flex justify-content-between">
                    <div className="views">
                      <i className="fal fa-eye"></i>
                      <div className="count">{propertyDetails.views}</div>
                      <div className="viewtext">Views</div>
                    </div>
                    <div className="views">
                      <i className="fal fa-eye"></i>
                      <div className="count">{propertyDetails.enquiries}</div>
                      <div className="viewtext">Enquires</div>
                    </div>
                  </div>
                  <div className="views full">
                    <div className="groups d-flex ml-5">
                      <i className="far fa-scroll mr-5"></i>
                      <div className="count">Payment</div>
                    </div>
                    <div className="viewtext">Pending Sale</div>
                  </div>
                </div>
              ) : null}
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
                <div className="feature-title">
                  <Naira>{propertyDetails.price}</Naira>
                </div>
              </div>
              <div className="feature-sing">
                <i className="far fa-award" />
                <div className="feature-title">
                  {propertyDetails.propertyType}
                </div>
              </div>
            </div>
            {!seller ? (
              propertyDetails.sellMyself ? (  
                <div
                  className={`contact-section ${
                    showContact ? "show-info" : ""
                  }`}
                  onClick={() => {
                    setShowContact(!showContact);
                  }}
                >
                  <button className="color-btn w-100 mt-4">
                    Contact Seller
                  </button>
                  <div className="contact-info">
                    <div className="contact-name">{propertyDetails.createdByUser?.fullName}</div>
                    <a href={`tel:${propertyDetails.createdByUser?.phoneNumber}`} className="contact-number">{propertyDetails.createdByUser?.phoneNumber}</a>
                    <a href={`mailto:${propertyDetails.createdByUser?.email}`} className="contact-number">
                      {propertyDetails.createdByUser?.email}
                    </a>
                  </div>
                </div>
              ) : (
                  <>
                    {  (propertyDetails.createdByUser) && 
                        propertyDetails.createdByUser?.id == user.data.user?.id 
                        ? <button className="color-btn w-100 py-2 mt-2" style={{opacity: 0.4 }} disabled>You cannot enquire on owned property</button>
                        : <Link
                          to={
                            tenant
                              ? `/rent/enquires/${propertyDetails.id}`
                              : `/buy/enquires/${propertyDetails.id}`
                          }
                          className="list-color-btn w-100 mt-4 mb-3f "
                          
                        >
                          Enquire
                        </Link>
                      
                    }
                  </>
              )
            ) : null}

            <div className="overview-section">
              <h2 className="property-info">Overview</h2>
              <p>{propertyDetails.description}</p>
            </div>
            <SRLWrapper>
              { files.filter((m) => m.isImage).length > 0  && 
              
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
              }
              
              { files.filter((m) => m.isVideo).length > 0 &&
              
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
              }
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
                {`Information displayed about this property constitutes a mere
                advertisement. PropertyMataaz makes no warranty as to the
                accuracy of the advertisement or any linked or associated
                information. Information about this property is provided and
                maintained by ${user.data.user?.fullName}. PropertyMataaz shall not in any way
                be held liable for the actions of any agent and/or property
                owner/landlord with respect to this property on or off this web
                application, website or App.`}
              </p>
            </div>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="preview-btn"
            >
              Report This Listing
            </button>
            <button className="preview-btn" onClick={() => openShareModal()}>Share This Listing</button>
            
          </div>
        </div>
      )}
    </>
  );
};

export default SeeMore;
