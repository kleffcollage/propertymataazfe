import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dropzone from "react-dropzone";
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";


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
  
  const grabUploadedWorkId = (uploadedFiles) => {
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
        console.log(reader.result);
        //console.log(binaryStr);
        console.log(binaryStr);
        composeMedia(binaryStr, file);
      };
      console.log(file);
      reader.readAsDataURL(file);
    });
  };
  const grabUploadedFile = (uploadedFiles) => {
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
        composeMedia(binaryStr, file);
      };
      console.log(file);
      reader.readAsDataURL(file);
    });
  };
  
  const composeMedia = (bytes, file) => {
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
    setUserDetails({
      ...userDetails,
      passport: [...userDetails.passport, newMedia],
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
      
      {page == 1 ? (
        <div className="modal-content">
          <div className="content-section mt-4">
            <div className="schedule-title mb-4">
              { property ? property.name : null }
            </div>
            <h3 className="section-title"> Application Form</h3>
            <div className="input-box">
              <div className="input-label">First Name</div>
              <input type="text" className="formfield" placeholder="Ezra" name="firstName" value={userDetails.firstName} onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Middle Name</div>
              <input type="text" className="formfield" placeholder="John" name="middleName" onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Mobile Number</div>
              <input type="text" className="formfield" placeholder="Ezra" name="mobileNumber" value={userDetails.mobileNumber} onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Surname</div>
              <input type="text" className="formfield" placeholder="John" name="lastName" value={userDetails.lastName} onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Email Address</div>
              <input type="text" className="formfield" placeholder="Ezra" name="email" value={userDetails.email} onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Residential Address</div>
              <input type="text" className="formfield" placeholder="John" name="address" onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Date of Birth</div>
              <input type="date" className="formfield" placeholder="John" name="dateOfBirth" onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Nationality</div>
              <input type="text" className="formfield" placeholder="John" name="dateOfBirth" onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Marital status</div>
              <div className="select-box">
                <select className="formfield" name="maritalStatus" onChange={handleOnChange} required>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                </select>
                <div className="arrows"></div>
              </div>
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
              <div className="input-label">Occupation</div>
              <input type="text" className="formfield" placeholder="Ezra" name="occupation" onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Employer</div>
              <input type="text" className="formfield" placeholder="John" name="employer" onChange={handleOnChange} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Work adress</div>
              <input type="text" className="formfield" placeholder="Ezra" name="workAddress" onChange={handleOnChange} required/>
            </div>
            
            { isRentForm ?
              <>
                <div className="input-box">
                  <div className="input-label">What is your annual income?</div>
                  <input type="text" className="formfield" placeholder="This can be your annual salary of an estimated income" name="annualIncome" onChange={handleOnChange} required/>
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
                              }  Pictures Uploaded`}
                              </>
                          ) : (
                              <>
                              <i className="far fa-image" />
                              'Upload pictures'
                              </>
                          )}
                          </div>
                      </section>
                  )}
                </Dropzone>
              
                <Dropzone
                    accept="image/jpeg, image/png"
                    maxFiles={1}
                    onDrop={(acceptedFiles) => grabUploadedWorkId(acceptedFiles)}
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
                                }  Videos Uploaded`}
                            </>
                        ) : (
                            <>
                                <i className="far fa-video" />
                                Upload Videos
                            </>
                        )}
                        </div>
                    </section>
                    )}
                </Dropzone>
              </>
            : null}
            
            <div className="schedule-title my-4">Next of Kin</div>
            <div className="input-box">
              <div className="input-label">First Name</div>
              <input type="text" className="formfield" placeholder="John" name="firstName" value={nok.firstName} onChange={handleNok} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Surname</div>
              <input type="text" className="formfield" placeholder="John" name="lastName" value={nok.lastName} onChange={handleNok} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Mobile Number</div>
              <input type="text" className="formfield" placeholder="John" name="phoneNumber" value={nok.phoneNumber} onChange={handleNok} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Email</div>
              <input type="text" className="formfield" placeholder="Ezra" name="email" value={nok.email} onChange={handleNok} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Middle Name</div>
              <input type="text" className="formfield" placeholder="John" name="middleName" value={nok.middleName} onChange={handleNok} required/>
            </div>
            <div className="input-box">
              <div className="input-label">Relationship</div>
              <input type="text" className="formfield" placeholder="John" name="relationship" value={nok.relationship} onChange={handleNok} required/>
            </div>
            
            <button className="secondary-btn mt-5" onClick={formSubmit}>{loading ? <Spinner /> : "Submit"}</button>
            
          </div>
        </div>
      ) : null }
    </>
  );
}

export default ApplicationForm;
