import React, { useState, useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dropzone from "react-dropzone";
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";

fff
function ApplicationForm({ property, isRentForm, close }) {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const user = useContext(MainContext)
  console.log(user);

  const [userDetails, setUserDetails] = useState({
    firstName: user.data.user.firstName,
    middleName: "",
    lastName: user.data.user.lastName,
    email: user.data.user.email,
    mobileNumber: user.data.user.phoneNumber,
    address: "",
    nationality: "",
    dateOfBirth: "",
    maritalStatus: "",
    employer: "",
    occupation: "",
    workAddress: "",
    annualIncome: "",
    passport: [],
    workId: [],
  });
  
  const [nok, setNok] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    relationship: ""
  });
  
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
		console.log(userDetails);
  };
  
  const handleNok = (e) => {
    const { name, value } = e.target;
    setNok({ ...nok, [name]: value });
    console.log(userDetails);
  };
    
  const formSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const data = {
        register: userDetails,
        nextOfKin: nok
    }
    console.log(data);
    
    try {
      let res = await Fetch("Application/new", "post", data);
      console.log(res);
      if (!data.status) {
        setLoading(false);
        setErrorMessage(data.message);
        console.log(errorMessage);
        return;
      }
      if (data.status != "400") {
        setLoading(false);
        console.log(data);
      } else {
        toast.error(errorMessage)
        console.log(errorMessage);
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }
  
  const grabUploadedFile = (uploadedFiles, isPassport = true ) => {
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
    
    if(isPassport) {
      setUserDetails({
        ...userDetails,
        passport: [...userDetails.passport, newMedia],
      });
      return
    }
    
    setUserDetails({
      ...userDetails,
      workId: [...userDetails.workId, newMedia],
    });
  };

  const getFileExtention = (fileName) => {
    return fileName.split(".")[1];
  };

    // useEffect(() => {
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    // }, [page])

  return (
    <>
      <ToastContainer />
      
      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left"></i>
          <span className="backs" onClick={
              page == "2" ? () => { setPage(page - 1 ); } : close
            }
          >
            Back          
          </span>
        </div>
        <div className="logo">
          <img src="../../asset/logo.png" alt="Logo" />
        </div>
      </div>
      
      <Formik
        initialValues={{ 
            firstName: user.data.user.firstName,
            middleName: "",
            lastName: user.data.user.lastName,
            email: user.data.user.email,
            mobileNumber: user.data.user.phoneNumber,
            address: "",
            state: "",
            
            typeofBuilding: "",
            stateofBuilding: "",
            timeforCleaning: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            }, 400);
        }}
      >
        <Form>
          {page == 1 ? (
            <div className="modal-content">
              <div className="content-section mt-4">
                <div className="schedule-title mb-4">
                  { property ? property.name : null }
                </div>
                
                <h3 className="section-title"> Application Form</h3>
                
                <div className="input-box">
                    <label htmlFor="firstName" className="input-label">First Name</label>
                    <Field name="firstName" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="firstName" />
                </div>
                <div className="input-box">
                    <label htmlFor="middleName" className="input-label">Middle Name</label>
                    <Field name="middleName" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="middleName" />
                </div>
                <div className="input-box">
                    <label htmlFor="lastName" className="input-label">Last Name</label>
                    <Field name="lastName" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="lastName" />
                </div>
                <div className="input-box">
                    <label htmlFor="mobileNumber" className="input-label">Mobile Number</label>
                    <Field name="mobileNumber" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="mobileNumber" />
                </div>
                <div className="input-box">
                    <label htmlFor="email" className="input-label">Email Address</label>
                    <Field name="email" type="email" placeholder="Your email address" className="formfield" />
                    <ErrorMessage name="email" />
                </div>
				<div className="input-box">
                    <label htmlFor="address" className="input-label">Residential Address</label>
                    <Field name="address" placeholder="Ezra" className="formfield" />
                    <ErrorMessage name="address" />
                </div>
				<div className="input-box">
                    <label htmlFor="dateOfBirth" className="input-label">Date of Birth</label>
                    <Field name="dateOfBirth" type="date" className="formfield" />
                    <ErrorMessage name="dateOfBirth" />
                </div>
				<div className="input-box">
                    <label htmlFor="nationality" className="input-label">Nationality</label>
                    <Field name="nationality" type="date" className="formfield" />
                    <ErrorMessage name="nationality" />
                </div>
				<div className="input-box">
                    <label htmlFor="maritalStatus" className="input-label">Marital status</label>
                    <div className="select-box">
                        <Field name="maritalStatus" as="select" className="formfield">
                            <option>Choose an option</option>
                            <option>Single</option>
							<option>Married</option>
							<option>Divorced</option>
                        </Field>
                        <div className="arrows"></div>
                    </div>
                    <ErrorMessage name="maritalStatus" />
                </div>
				
                <button className="secondary-btn" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </div>
            </div>
          ) : page == 2 ? (
            <div className="modal-content">
            	<div className="content-section mt-4">
                	<div className="input-box">
				
						<div className="input-box">
							<label htmlFor="occupation" className="input-label">Occupation</label>
							<Field name="occupation" type="date" className="formfield" />
							<ErrorMessage name="occupation" />
						</div>
						<div className="input-box">
							<label htmlFor="employer" className="input-label">Employer</label>
							<Field name="employer" type="text" className="formfield" />
							<ErrorMessage name="employer" />
						</div>
						<div className="input-box">
							<label htmlFor="workAddress" className="input-label">Work Address</label>
							<Field name="workAddress" type="text" className="formfield" />
							<ErrorMessage name="workAddress" />
						</div>
						
					
						{ isRentForm ?
						<>
						
							<div className="input-box">
						<label htmlFor="annualIncome" className="input-label">What is your annual income?</label>
							<Field name="annualIncome" type="text" placeholder="This can be your annual salary of an estimated income" className="formfield" />
							<ErrorMessage name="annualIncome" />
						    </div>
							
							
							<Dropzone
							accept="image/jpeg, image/png"
							maxFiles={1}
							onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles)}
							>
							{ ({ getRootProps, getInputProps }) => (
								<section>
									<div
									{...getRootProps()}
									className={
										userDetails.passport.filter((m) => m.isImage).length >
										0
										? "do-upload uploaded"
										: "do-upload"
									}
									>
									<input {...getInputProps()} />
									{userDetails.passport.filter((m) => m.isImage).length >
									0 ? (
										<>
										<i className="far fa-check" />
										{`${
											userDetails.passport.filter((m) => m.isImage)
											.length
										}  Passport Uploaded`}
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
								onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles, false)}
							>
								{({ getRootProps, getInputProps }) => (
								<section>
									<div
										{...getRootProps()}
										className={
											userDetails.workId.filter((m) => m.isImage).length >
											0
											? "do-upload uploaded"
											: "do-upload"
										}
									>
									<input {...getInputProps()} />
									{userDetails.workId.filter((m) => m.isImage).length >
									0 ? (
										<>
											<i className="far fa-check" />
											{`${
												userDetails.workId.filter((m) => m.isImage)
												.length
											}  Copy of Work Id Uploaded`}
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
						: null }
					
						<div className="schedule-title my-4">Next of Kin</div>
						
						<div className="input-box">
							<label htmlFor="nokFirstName" className="input-label">First Name</label>
							<Field name="nokFirstName" type="text" className="formfield" />
							<ErrorMessage name="nokFirstName" />
						</div>
						<div className="input-box">
							<label htmlFor="nokMiddleName" className="input-label">Middle Name</label>
							<Field name="nokMiddleName" type="text" className="formfield" />
							<ErrorMessage name="nokMiddleName" />
						</div>
						<div className="input-box">
							<label htmlFor="nokLastName" className="input-label">Surname</label>
							<Field name="nokLastName" type="text" className="formfield" />
							<ErrorMessage name="nokLastName" />
						</div>
						<div className="input-box">
							<label htmlFor="nokMobileNumber" className="input-label">Mobile Number</label>
							<Field name="nokMobileNumber" type="text" className="formfield" />
							<ErrorMessage name="nokMobileNumber" />
						</div>
						<div className="input-box">
							<label htmlFor="nokEmail" className="input-label">Email</label>
							<Field name="nokEmail" type="email" className="formfield" />
							<ErrorMessage name="nokEmail" />
						</div>
						<div className="input-box">
							<label htmlFor="nokRelationship" className="input-label">Relationship</label>
							<Field name="nokRelationship" type="text" className="formfield" />
							<ErrorMessage name="nokRelationship" />
						</div>
					
						<button className="secondary-btn mt-5" type="submit">{ loading ? <Spinner /> : "Submit" }</button>
					</div>
            	</div>
            </div>
          ) : null }
        </Form>
      </Formik>
    </>
  );
}

export default ApplicationForm;
