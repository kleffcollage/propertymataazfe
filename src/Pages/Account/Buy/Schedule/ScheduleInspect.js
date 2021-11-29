import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "../../../../Context/MainContext";
import Fetch from "../../../../Utilities/Fetch";
import Spinner from "../../../../Utilities/Spinner";
import DateWrap from "./Date";
import { Wrapper } from "./styles";
import Moment from "react-moment";
import moment from "moment";
import { Box } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomRightArrow, CustomLeftArrow } from "./carouselButtons/Arrows";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 7,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ScheduleInspect = ({ close }) => {
  let { propertyId } = useParams();
  const { user } = useContext(MainContext).data;
  const [loading, setLoading] = useState(false);
  const [inspectDate, setInspectDate] = useState([]);
  const [tab, setTab] = useState("person");
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const currentTab = (tab) => {
    setTab(tab);
  };

  const scheduleData = {
    inspectionDateId: 0,
    inspectionTimeId: 0,
    userId: 0,
    propertyId: 0,
  };

  const getInspectionDate = async () => {
    setLoading(true);

    try {
      let data = await Fetch(`Property/inspectiondates/list/${propertyId}`);

      if (!data.status) {
        setLoading(false);
        return;
      }
      if (data.status != 400) {
        setLoading(true);
        setInspectDate(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestInspection = async (values) => {
    setSubmitting(true);
    values.inspectionDateId = selectedDate.id;
    values.propertyId = propertyId;
    values.userId = user.id;
    if(values.inspectionTimeId == 0)
    {
      toast.warning("please select a time to continue");
      return;
    }
    try {
      const data = await Fetch(`Property/inspections/schedule`, "post", values);
      if (!data.status) {
        toast.error(data.message);
        setSubmitting(false);
        return;
      }
      toast.success(data.message);
      setSubmitting(false);
      close();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    getInspectionDate();
  }, []);

  return (
    <>
      {/* <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left"></i>
          <span className="backs" onClick={close}>
            Back
          </span>
        </div>
      </div> */}

      <div className="tabs mt-4">
        <div
          className={`texts ${tab == "person" ? "current" : ""}`}
          onClick={() => currentTab("person")}
        >
          In-person
        </div>

        <div
          className={`texts ${tab == "video" ? "current" : ""}`}
          onClick={() => currentTab("video")}
        >
          Video Tour
        </div>

        <div className={tab == "person" ? "tab-bar" : "tab-bar req"} />
      </div>

      {inspectDate.length > 0 ? (
        <div className="row w-100">
          {tab == "person" ? (
            <Formik
              initialValues={scheduleData}
              onSubmit={async (values, { setSubmitting }) => {
                await requestInspection(values);
              }}
            >
              <Form>
                <h5 className="field-title pl-2">Select a date</h5>
                <div className="mb-5">
                  <Carousel responsive={responsive}>
                    {inspectDate.map((date, i) => {
                      return (
                        <DateWrap
                          key={i}
                          dates={date}
                          setSelectedDate={setSelectedDate}
                        />
                      );
                    })}
                  </Carousel>
                </div>

                {selectedDate && (
                  <div className="input-box">
                    <label htmlFor="time" className="input-label">
                      Select a time
                    </label>
                    <div className="select-box">
                      <Field
                        name="inspectionTimeId"
                        as="select"
                        className="formfield"
                      >
                        <option value={0}>Select a convenient time</option>
                        {selectedDate.times.map((time, i) => {
                          const formattedTime = moment(time.time).format("LT");
                          return (
                            // <Moment format="h:m" date="2021-08-13T02:42:04.584" />
                            <option key={i} value={time.id}>
                              {formattedTime}
                              {/* <Moment format="h:m" date="2021-08-13T02:42:04.584" />  */}
                            </option>
                          );
                        })}
                      </Field>
                      <div className="arrows"></div>
                    </div>
                    <ErrorMessage name="time" />
                  </div>
                )}
                <button className="secondary-btn" type="submit">
                  {submitting ? <Spinner /> : "Request this time"}
                </button>
              </Form>
            </Formik>
          ) : tab == "video" ? (
            "Video"
          ) : 
          <p>Video</p>
          }
        </div>
      ) : <p className="w-50 text-center">There are no inspection dates at the moment. Please check back later.</p>}
    </>
  );
};

export default ScheduleInspect;
