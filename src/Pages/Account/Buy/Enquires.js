import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Fetch from "../../../Utilities/Fetch";
import { SRLWrapper } from "simple-react-lightbox";
import { MapView } from "../../../Components/Generics/MapView";
import Modal from "../../../Utilities/Modal";
import MiniModal from "../../../Utilities/Alert/MiniModal";
import ApplicationForm from "./Application";
import Pay from "./Pay";
import Naira from "react-naira";
import ScheduleInspect from "./Schedule/ScheduleInspect";
import Reciept from "./Receipt";
import Documentation from "./Documents";

function Enquires({ isRent }) {
  const { propertyId } = useParams();
  // console.log(propertyId);

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openDocumentation, setOpenDocumentation] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [enquiryStatus, setEnquiryStatus] = useState({});

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

  const incrementEnquire = async () => {
    var sendData = await Fetch(`Property/addenquiries/${propertyId}`, "get");

    if (!sendData.status) {
      console.log(sendData.message);
      return;
    }
    if (sendData.status != 400) {
      console.log("Issokay");
    }
  };

  const getEnquiryStatus = async () => {
    try {
      const data = await Fetch(`Application/get/user/property/${propertyId}`);
      console.log({ data });
      if (!data.status) {
        console.error(data);
        return;
      }
      setEnquiryStatus(data.data);
      return;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPropertyDetails();
    const fetchData = async () => {
      await getPropertyDetails();
      await getEnquiryStatus();
      await incrementEnquire();
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Application modal */}
      <Modal
        open={seeMore}
        onClose={() => {
          setSeeMore(false);
        }}
      >
        <ApplicationForm
          property={propertyDetails}
          isRentForm={isRent}
          propertyId={propertyId}
          close={() => setSeeMore(false)}
        />
      </Modal>

      {/* Payment modal */}
      <Modal open={payModal} onClose={() => setPayModal(false)}>
        <Pay
          close={() => setPayModal(false)}
          isRent={isRent}
          property={propertyDetails}
        />
      </Modal>

      {/* Schedule inspection component  */}
      {/* <Modal open={scheduleModal} onClose={() => setScheduleModal(false)}>
        <ScheduleInspect close={() => setScheduleModal(false)} property={propertyDetails} />
      </Modal> */}
      <MiniModal
        showAlert={scheduleModal}
        setShowAlert={() => setScheduleModal(false)}
      >
        <ScheduleInspect
          close={() => setScheduleModal(false)}
          property={propertyDetails}
        />
      </MiniModal>

      {/* View receipt modal */}
      <Modal
        width="60% "
        open={openReceipt}
        onClose={() => setOpenReceipt(false)}
      >
        <Reciept
          close={() => setOpenReceipt(false)}
          property={propertyDetails}
        />
      </Modal>

      {/* View Documentation modal */}
      <Modal
        open={openDocumentation}
        onClose={() => setOpenDocumentation(false)}
      >
        <Documentation
          close={() => setOpenDocumentation(false)}
          isRent={isRent}
          property={propertyDetails}
        />
      </Modal>

      <div className="row mt-5">
        <div className="col-lg-4">
          <div className="steps passed">
            <div className="steps-show">
              <div className="oval">
                <i className="fas fa-check" />
              </div>
              <div className="lengthy" />
            </div>
            <div className="steps-content">
              <h2 className="property-info">Step 1 - Enquiries</h2>
              <button className="single-step">
                <i className="far fa-video" />
                Watch Interactive 3D Videos
              </button>
              <button
                className="single-step"
                onClick={() => setScheduleModal(true)}
              >
                <i className="far fa-calendar" />
                Schedule Live Inspection
              </button>
              <div className="img-step">
                <div className="agent-avatar">
                  <img src alt />
                </div>
                <div className="cont">
                  <p className="ss">Speak with a Representative</p>
                  <div className="agent-info">
                    <div className="agent-name">Toluwani</div>
                    <div className="agent-number">+234 806 430 1234</div>
                    <div className="agent-number">segepampam@gmail.com.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              enquiryStatus && enquiryStatus.hasPaid ? "steps passed" : "steps"
            }
          >
            <div className="steps-show">
              <div className="oval">
                {enquiryStatus && enquiryStatus.hasPaid ? (
                  <i className="fas fa-check" />
                ) : (
                  <i className="far fa-hourglass-start" />
                )}
              </div>
              <div className="lengthy" />
            </div>
            <div className="steps-content">
              <h2 className="property-info">Step 2 - Payment</h2>
              <button
                className="single-step disabled"
                onClick={() => setSeeMore(true)}
                disabled={
                  enquiryStatus && enquiryStatus.hasApplied ? true : false
                }
              >
                <i className="far fa-paper-plane" />
                {enquiryStatus &&
                enquiryStatus.hasApplied &&
                !enquiryStatus.hasPaid ? (
                  <span>Application is being reviewed</span>
                ) : (
                  "Submit Application"
                )}
              </button>
              {propertyDetails.isForRent ? (
                <button
                  className="single-step"
                  onClick={() => setPayModal(true)}
                  disabled={
                    enquiryStatus &&
                    enquiryStatus.hasApplied &&
                    enquiryStatus.applicationStatus == "APPROVED" &&
                    !enquiryStatus.hasPaid
                      ? false
                      : true
                  }
                >
                  <i className="far fa-lock" />
                  Pay securely
                </button>
              ) : (
                <button
                  className="single-step"
                  onClick={() => setPayModal(true)}
                >
                  <i className="far fa-lock" />
                  Pay securely
                </button>
              )}
            </div>
          </div>
          <div className="steps">
            <div className="steps-show">
              <div className="oval">
                <i className="far fa-hourglass-start" />
              </div>
              {/* <div class="lengthy"></div> */}
            </div>
            <div className="steps-content">
              <h2 className="property-info">Step 3 - Confirmation</h2>
              <button
                className="single-step"
                onClick={() => setOpenReceipt(true)}
                disabled={
                  enquiryStatus && !enquiryStatus.hasPaid ? true : false
                }
              >
                <i className="far fa-scroll" />
                View Receipt
              </button>
              <button
                className="single-step"
                onClick={() => setOpenDocumentation(true)}
                disabled={
                  enquiryStatus && !enquiryStatus.hasPaid ? true : false
                }
              >
                <i className="far fa-file-alt" />
                View Documentation
              </button>
            </div>
          </div>
          <button className="single-step justify-content-center">
            Cancel Request
          </button>
        </div>
        <div className="col-lg-8">
          <div className="d-flex h-100">
            <div className="divider" />
            <div className="enq-stp">
              <div className="cover-img">
                <img
                  src={
                    files.length > 0
                      ? files[0].url
                      : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                  }
                  alt={propertyDetails.name}
                />
                <div
                  className={
                    propertyDetails.area == null ? "d-none" : "listing-location"
                  }
                >
                  {propertyDetails.area}
                </div>
              </div>
              <div className="content-section w-100">
                <div className="property-title">{propertyDetails.name}</div>
                <div className="feature-group">
                  <div className="feature-sing">
                    <i className="far fa-bed" />
                    <div className="feature-title">{`${propertyDetails.numberOfBedrooms} Bedrooms`}</div>
                  </div>
                  <div className="feature-sing">
                    <i className="far fa-bed" />
                    <div className="feature-title">{`${propertyDetails.numberOfBathrooms} Bathrooms`}</div>
                  </div>
                  <div className="feature-sing">
                    <i className="far fa-bed" />
                    <div className="feature-title">
                      <Naira>{propertyDetails.price}</Naira>
                    </div>
                  </div>
                  <div className="feature-sing">
                    <i className="far fa-bed" />
                    <div className="feature-title">
                      {propertyDetails.propertyType}
                    </div>
                  </div>
                </div>
                <div className="overview-section">
                  <h2 className="property-info">Overview</h2>
                  <p>{propertyDetails.description}</p>
                </div>
                <SRLWrapper>
                  {files.filter((m) => m.isImage).length > 0 && (
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
                  )}

                  {files.filter((m) => m.isVideo).length > 0 && (
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
                  )}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Enquires;
