import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Alert from "../../../Utilities/Alert/index";
import Modal from "../../../Utilities/Modal";
import Naira from "react-naira";
import { MapView } from "../../../Components/Generics/MapView";
import { SRLWrapper } from "simple-react-lightbox";
import TenantDetails from "../../../Pages/Rent/Tenant/TenantDetails";

const PropertyApplied = ({ property = {}, close }) => {
  const [show, setShow] = useState(false);
  const [showTenant, setShowTenant] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({});

  const showDetails = () => {
    setShow((prev) => !prev);
  };

  console.log({ property });

  const getApplications = async () => {
    try {
      const data = await Fetch(`Application/list/${property.id}`);
      console.log({ data });
      if (!data.status) {
        console.log({ data });
        return;
      }
      setApplications(data.data.value);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const showApplicantDetails = (application) => {
    setSelectedApplication(application);
    setShowTenant(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getApplications();
    };
    fetchData();
  }, []);

  return (
    <>
      <Modal
        open={showTenant}
        onClose={() => {
          setShowTenant(false);
        }}
      >
        <TenantDetails
          application={selectedApplication}
          close={() => {
            setShowTenant(false);
          }}
        />
      </Modal>

      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left"></i>
          <span className="backs" onClick={close}>
            Back
          </span>
        </div>
      </div>

      <div className="modal-content applied">
        <div className="mt-4">
          <div className="listing-cards">
            <div className="listing-cover-img">
              <img
                alt=""
                src={
                  property.mediaFiles.length !== 0
                    ? property.mediaFiles[0].url
                    : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                }
              />
              <div className="listing-location">{property.area}</div>
            </div>
            <div
              className={`tag ${
                property.isDraft == true ? "draft" : "pending"
              }`}
            >
              <div className="status">
                {property.isDraft == true
                  ? "Only visible to you"
                  : property.verified == true
                  ? "Listing is verified"
                  : "Listing is pending"}
              </div>
              <div className="status" onClick>
                Edit <i className="fas fa-pen ml-2" />
              </div>
            </div>
            <div className="listing-info applicants">
              <div className="title-group flex-column">
                <div className="property-title">{property.name}</div>
                <div className="activities w-100">
                  <div className="property-sub-title">Listing Performance</div>
                  <div className="d-flex justify-content-between">
                    <div className="views mr-1">
                      <i className="fal fa-eye"></i>
                      <div className="count">{property.views}</div>
                      <div className="viewtext">Views</div>
                    </div>
                    <div className="views ml-1">
                      <i className="fal fa-comments"></i>
                      <div className="count">
                        {applications && applications.length}
                      </div>
                      <div className="viewtext">Applications</div>
                    </div>
                  </div>
                </div>
                {/* <div className="listing-title mb-3">{property.property.name}</div> */}
              </div>
              <div className="property-sub-title mt-2 mb-3">
                { (applications.length > 0) ? 'Tenant Applications' : 'No applications yet.' }
              </div>
              {applications &&
                applications.map((application, index) => {
                  return (
                    <div
                      className="d-flex applicants my-3"
                      onClick={() => showApplicantDetails(application)}
                    >
                      <div className="applicants-avi flex-shrink-0">
                        <img src="/asset/@3xGideon.png" alt="gideon" />
                      </div>
                      <div className="applicants-detail mx-3">
                        <h6>{application.user.fullName}</h6>
                        <p className="mb-1">{application.user.maritalStatus}</p>
                        <p className="mb-1">{application.user.occupation}</p>
                        <p className="mb-1">Earns <Naira>{application.user.annualIncome}</Naira> per year</p>
                      </div>
                    </div>
                  );
                })}
              {show && (
                <>
                  <div className="overview-section">
                    <h2 className="property-info">Property Details</h2>
                    <div className="feature-group mt-4">
                      <div className="feature-sing">
                        <i className="far fa-bed" />
                        <div className="feature-title">{`${property.numberOfBedrooms} Bedrooms`}</div>
                      </div>
                      <div className="feature-sing">
                        <i className="far fa-toilet" />
                        <div className="feature-title">
                          {" "}
                          {`${property.numberOfBathrooms} Bathrooms`}
                        </div>
                      </div>
                      <div className="feature-sing">
                        <i className="far fa-tags" />
                        <div className="feature-title">
                          <Naira>{property.price}</Naira>
                        </div>
                      </div>
                      <div className="feature-sing">
                        <i className="far fa-award" />
                        <div className="feature-title">
                          {property.propertyType}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overview-section">
                    <h2 className="property-info">Description</h2>
                    <p>{property.description}</p>
                  </div>
                  <SRLWrapper>
                    <div className="picture-overview">
                      <h2 className="property-info">Pictures</h2>
                      <div className="image-gallery">
                        {property.mediaFiles
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
                        {property.mediaFiles
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
                  <div className="map-overview mb-3">
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
                </>
              )}

              <button
                className="btn-outlined show-property-details"
                onClick={showDetails}
              >
                {show ? " Close details" : "Show property details"}
              </button>
            </div>
          </div>

          {/* <Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="mt-4">
                        <button className="btn-outlined mr-2" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Download" }</button>
                        <button className="btn-outlined ml-2" type="submit" onClick={handlePayment}>{ loading ? <Spinner /> : "Print" }</button>
                    </Box> */}
        </div>
      </div>
    </>
  );
};

export default PropertyApplied;
