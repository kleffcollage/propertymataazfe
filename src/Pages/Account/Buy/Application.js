import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone";
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import DatePicker from "react-datepicker";
import Naira from "react-naira";
import * as Yup from "yup"

import "react-datepicker/dist/react-datepicker.css";

function ApplicationForm({ property, isRentForm, close, propertyId }) {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useContext(MainContext);
  const [dob,setDob] = useState(new Date());
  // const applicationTypes = useContext(MainContext)
  // console.log({user});
  // console.log({applicationTypes});
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [mediafiles, setMediaFiles] = useState({
    passport: null,
    workId: null,
  });

  const userDetails = {
    register: {
      firstName: user.data.user.firstName,
      middleName: "",
      lastName: user.data.user.lastName,
      email: user.data.user.email,
      mobileNumber: user.data.user.phoneNumber || '',
      address: "",
      nationality: "",
      dateOfBirth: "",
      nationality: "",
      maritalStatus: "",
      occupation: "",
      employer: "",
      workAddress: "",
      annualIncome: "",
      passport: mediafiles.passport,
      workId: mediafiles.workId,
    },
    nextOfKin: {
      nokFirstName: "",
      nokLastName: "",
      nokEmail: "",
      nokMobileNumber: "",
      nokRelationship: "",
    },
    propertyId: 0,
    applicationTypeId: 0,
  };
  
  const userDetailsValidationSchema = Yup.object().shape({
    register: Yup.object({
      firstName: Yup.string().required('First name is required'),
      middleName: Yup.string().required('Middle name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      mobileNumber: Yup.string().required('Mobile number is required'),
      address: Yup.string().required('Address is required'),
      nationality: Yup.string().required('Nationality is required'),
      dateOfBirth: Yup.date().default(() => { return new Date() }).required('Mobile number is required'),
      maritalStatus: Yup.string()
        .oneOf(
          ['Single', 'Married', 'Divorced', 'Others'],
          'Invalid Marital Status'
        ).required('Marital status is required'),
      occupation: Yup.string().required('Occupation is required'),
      employer: Yup.string().required('Employer is required'),
      workAddress: Yup.string().required('Work Address is required'),
      annualIncome: Yup.string().required('Annual Income is required'),
    }),
    nextOfKin: Yup.object({
      nokFirstName: Yup.string().required('First name is required'),
      nokLastName: Yup.string().required('Last name is required'),
      nokEmail: Yup.string().email('Invalid email address').required('Email is Required'),
      nokMobileNumber: Yup.string().required('Mobile number is required'),
      nokRelationship: Yup.string().required('Relationship is required'),
    })
  })

  const getApplicationTypes = async () => {
    try {
      let { data } = await Fetch("Application/types");
      // console.log("Application types: ", data);
      setApplicationTypes(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(userDetails.workId.length)

  const formSubmit = async (values) => {
    setLoading(true);

    values.register.passport = mediafiles.passport;
    values.register.workId = mediafiles.workId;
    values.propertyId = propertyId;
    values.applicationTypeId = isRentForm
      ? applicationTypes.find((type) => type.name == "RENT").id
      : applicationTypes.find((type) => type.name == "BUY").id;

    console.log({ values });

    try {
      if(isRentForm) {
        const { workId, passport } = values.register;
        if (workId == null || passport == null) {
          toast.info("Please, upload a copy of work Id and a passport.");
          setLoading(false);
          return;
        }
      }

      let data = await Fetch("Application/new", "post", values);
      console.log("Enquire Rent:", data);

      if (!data.status) {
        setLoading(false);
        setErrorMessage(data.message);
        console.log(errorMessage);
        return;
      }
      if (data.status != "400") {
        setLoading(false);
        toast.success("Application has been submitted successfully.");
        console.log(data);
        close(true);
        history.go(0);
      } else {
        setLoading(false);
        toast.error(errorMessage);
        console.log(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const grabUploadedFile = (uploadedFiles, isPassport = true) => {
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onerror = () => {
        console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result.split(",")[1];
        // console.log(reader.result);
        //console.log(binaryStr);
        // console.log("GrabUp", binaryStr);
        composeMedia(binaryStr, file, isPassport);
      };
      console.log(file);
      reader.readAsDataURL(file);
    });
  };

  const composeMedia = (bytes, file, isPassport) => {
    var files = [];

    var newMedia = {
      name: file.name,
      extention: getFileExtention(file.name),
      base64String: bytes,
      propertyId: 0,
      isImage:
        getFileExtention(file.name) == "jpeg" ||
        getFileExtention(file.name) == "jpg" ||
        getFileExtention(file.name) == "png"
          ? true
          : false,
      isVideo: getFileExtention(file.name) == "mp4" ? true : false,
      isDocument: getFileExtention(file.name) == "pdf" ? true : false,
    };

    files.push(newMedia);
    console.log(files);

    if (isPassport) {
      setMediaFiles({
        ...mediafiles,
        passport: newMedia,
      });
      return;
    }

    setMediaFiles({
      ...mediafiles,
      workId: newMedia,
    });
  };

  const getFileExtention = (fileName) => {
    return fileName.split(".")[1];
  };

  useEffect(() => {
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    const fetchData = async () => {
      await getApplicationTypes();
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left mr-2"></i>
          <span
            className="backs"
            onClick={
              page == "2"
                ? () => {
                    setPage(page - 1);
                  }
                : close
            }
          >
            Back
          </span>
        </div>
      </div>
      
      
      <Formik
        initialValues={userDetails}
        // validationSchema={userDetailsValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          values.register.dateOfBirth = dob;
          await formSubmit(values);
          // console.log({values})
          // alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          { page == 1 ? (
            <div className="modal-content">
              <div className="content-section mt-4">
                <div className="schedule-title mb-4">
                  {property ? property.name : null}
                </div>

                <h3 className="section-title"> Application Form</h3>

                <div className="input-box">
                  <label htmlFor="register.firstName" className="input-label">
                    First Name
                  </label>
                  <Field
                    name="register.firstName"
                    placeholder="Ezra"
                    className="formfield"
                  />
                  <ErrorMessage component="span" name="register.firstName" />
                </div>
                <div className="input-box">
                  <label htmlFor="middleName" className="input-label">
                    Middle Name
                  </label>
                  <Field
                    name="register.middleName"
                    placeholder="Ezra"
                    className="formfield"
                  />
                  <ErrorMessage component="span" name="register.middleName" />
                </div>
                <div className="input-box">
                  <label htmlFor="register.lastName" className="input-label">
                    Last Name
                  </label>
                  <Field
                    name="register.lastName"
                    placeholder="Ezra"
                    className="formfield"
                  />
                  <ErrorMessage component="span" name="register.lastName" />
                </div>
                <div className="input-box">
                  <label
                    htmlFor="register.mobileNumber"
                    className="input-label"
                  >
                    Mobile Number
                  </label>
                  <Field
                    name="register.mobileNumber"
                    placeholder="Ezra"
                    className="formfield"
                  />
                  <ErrorMessage component="span" name="register.mobileNumber" />
                </div>
                <div className="input-box">
                  <label htmlFor="register.email" className="input-label">
                    Email Address
                  </label>
                  <Field
                    name="register.email"
                    type="email"
                    placeholder="Your email address"
                    className="formfield"
                  />
                  <ErrorMessage component="span" name="email" />
                </div>
                <div className="input-box">
                  <label htmlFor="register.address" className="input-label">
                    Residential Address
                  </label>
                  <Field
                    name="register.address"
                    placeholder="Ezra"
                    className="formfield"
                  />
                  <ErrorMessage component="span" name="register.address" />
                </div>
                <div className="input-box">
                  <label htmlFor="register.dateOfBirth" className="input-label">
                    Date of Birth
                  </label>
                  <DatePicker selected={dob} onChange={(date) => setDob(date)} className="formfield"/>
                  <ErrorMessage component="span" name="register.dateOfBirth" />
                </div>
                <div className="input-box">
                  <label htmlFor="register.nationality" className="input-label">
                    Nationality
                  </label>
                  <Field
                    name="register.nationality"
                    type="text"
                    className="formfield"
                  />
                  <ErrorMessage component="span" name="register.nationality" />
                </div>
                <div className="input-box">
                  <label
                    htmlFor="register.maritalStatus"
                    className="input-label"
                  >
                    Marital status
                  </label>
                  <div className="select-box">
                    <Field
                      name="register.maritalStatus"
                      as="select"
                      className="formfield"
                    >
                      <option>Choose an option</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                      <option>Others</option>
                    </Field>
                    <div className="arrows"></div>
                  </div>
                  <ErrorMessage component="span" name="register.maritalStatus" />
                </div>

                <button
                  className="secondary-btn"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          ) : page == 2 ? (
            <div className="modal-content">
              <div className="content-section mt-4">
                <div className="input-box">
                  <div className="input-box">
                    <label
                      htmlFor="register.occupation"
                      className="input-label"
                    >
                      Occupation
                    </label>
                    <Field
                      name="register.occupation"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="register.occupation" />
                  </div>
                  <div className="input-box">
                    <label htmlFor="register.employer" className="input-label">
                      Employer
                    </label>
                    <Field
                      name="register.employer"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="register.employer" />
                  </div>
                  <div className="input-box">
                    <label
                      htmlFor="register.workAddress"
                      className="input-label"
                    >
                      Work Address
                    </label>
                    <Field
                      name="register.workAddress"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="register.workAddress" />
                  </div>

                  {isRentForm ? (
                    <>
                      <div className="input-box">
                        <label
                          htmlFor="register.annualIncome"
                          className="input-label"
                        >
                          What is your annual income?
                        </label>
                        <Field
                          name="register.annualIncome"
                          type="text"
                          as="select"
                          placeholder="This can be your annual salary of an estimated income"
                          className="formfield"
                        > 
                          <option>Choose an option</option>
                          <option value="50,000 - 250,000">&#8358;{"50,000"} - &#8358;{"250,000"}</option>
                          <option value="250,000 - 500,000">&#8358;{"250,000"} - &#8358;{"500,000"}</option>
                          <option value="500,000 - 750,000">&#8358;{"500,000"} - &#8358;{"750,000"}</option>
                          <option value="750,000 - 1m">&#8358;{"750,000"} - &#8358;{"1,000,000"}</option>
                          <option value="1m and above">&#8358;{"1m and above"}</option>
                        </Field>
                        {/* <Naira>10000</Naira> */}
                        <ErrorMessage component="span" name="register.annualIncome" />
                      </div>

                      <Dropzone
                        accept="image/jpeg, image/png"
                        maxFiles={1}
                        onDrop={(acceptedFiles) =>
                          grabUploadedFile(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className={
                                mediafiles.passport
                                  ? "do-upload uploaded"
                                  : "do-upload"
                              }
                            >
                              <input {...getInputProps()} />
                              {mediafiles.passport ? (
                                <>
                                  <i className="far fa-check" />
                                  {`Passport Uploaded`}
                                </>
                              ) : (
                                <>
                                  <i className="far fa-image" />
                                  Upload Passport Photograph
                                </>
                              )}
                            </div>
                          </section>
                        )}
                      </Dropzone>

                      <Dropzone
                        accept="image/jpeg, image/png"
                        maxFiles={1}
                        onDrop={(acceptedFiles) =>
                          grabUploadedFile(acceptedFiles, false)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className={
                                mediafiles.workId
                                  ? "do-upload uploaded"
                                  : "do-upload"
                              }
                            >
                              <input {...getInputProps()} />
                              {mediafiles.workId ? (
                                <>
                                  <i className="far fa-check" />
                                  {`Copy of Work Id Uploaded`}
                                </>
                              ) : (
                                <>
                                  <i className="far fa-video" />
                                  Upload a Copy of Work Id
                                </>
                              )}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </>
                  ) : null}

                  <div className="schedule-title my-4">Next of Kin</div>

                  <div className="input-box">
                    <label
                      htmlFor="nextOfKin.nokFirstName"
                      className="input-label"
                    >
                      First Name
                    </label>
                    <Field
                      name="nextOfKin.nokFirstName"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="nextOfKin.nokFirstName" />
                  </div>
                  <div className="input-box">
                    <label
                      htmlFor="nextOfKin.nokMiddleName"
                      className="input-label"
                    >
                      Middle Name
                    </label>
                    <Field
                      name="nextOfKin.nokMiddleName"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="nextOfKin.nokMiddleName" />
                  </div>
                  <div className="input-box">
                    <label
                      htmlFor="nextOfKin.nokLastName"
                      className="input-label"
                    >
                      Surname
                    </label>
                    <Field
                      name="nextOfKin.nokLastName"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="nextOfKin.nokLastName" />
                  </div>
                  <div className="input-box">
                    <label
                      htmlFor="nextOfKin.nokMobileNumber"
                      className="input-label"
                    >
                      Mobile Number
                    </label>
                    <Field
                      name="nextOfKin.nokMobileNumber"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="nextOfKin.nokMobileNumber" />
                  </div>
                  <div className="input-box">
                    <label htmlFor="nextOfKin.nokEmail" className="input-label">
                      Email
                    </label>
                    <Field
                      name="nextOfKin.nokEmail"
                      type="email"
                      className="formfield"
                    />
                    <ErrorMessage component="span" name="nextOfKin.nokEmail" />
                  </div>
                  <div className="input-box">
                    <label
                      htmlFor="nextOfKin.nokRelationship"
                      className="input-label"
                    >
                      Relationship
                    </label>
                    <Field
                      name="nextOfKin.nokRelationship"
                      type="text"
                      className="formfield"
                    />
                    <ErrorMessage component="span" component="span" name="nextOfKin.nokRelationship" />
                  </div>

                  <button className="secondary-btn mt-5" type="submit">
                    {loading ? <Spinner /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </Form>
      </Formik>
    </>
  );
}

export default ApplicationForm;
