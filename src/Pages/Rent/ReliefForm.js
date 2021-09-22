import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import Dropzone from "react-dropzone";
import Alert from "../../Utilities/Alert";
import { MainContext } from "../../Context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Geocode from "react-geocode";
import NaijaStates from "naija-state-local-government";
import { Box } from "@material-ui/core";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

function ReliefForm({ close }) {
  const history = useHistory();
  const { showAlert } = useContext(MainContext);
  const [drafting, setDrafting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [step, setStep] = useState(1);

  console.log(NaijaStates.states());
  const [errors, setErrors] = useState({
    Name: [],
    PropertyTypeId: [],
    Address: [],
    Title: [],
    State: [],
    Description: [],
    Lga: [],
    Area: [],
    Price: [],
  });
  const [reliefData, setReliefData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    propertyAddress: "",
    nationality: "",
    martialStatus: "",
    occupation: "",
    employer: "",
    workAddress: "",
    annualIncome: "",
    
    nk_firstName: "",
    nk_lastName: "",
    nk_email: "",
    nk_phoneNumber: "",
    nk_address: "",
    nk_relationship: "",
    
    reliefAmount: "",
    paybackDate: "",
    paybackMethod: "",
    
    
    isDraft: false,
    isActive: true,
    isForRent: true,
    isForSale: false,
    workId: [],
    passport: [],
    longitude: 0,
    latitude: 0,
  });

  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [cities, setCities] = useState([]);

  const handleOnChange = (e) => {
    // showAlert("success", "Something toasted", "Everything works ");
    const { name, value } = e.target;
    setReliefData({ ...reliefData, [name]: value });
    console.log(reliefData);
  };


  const currentStep = async () => {
    if (step < 3 ) {
      setStep( step + 1);
      return;
    }
    if (step == 3) {
      close(true);
      history.push("/rent");
      return;
    }
  };

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
    console.log('Compose file: ', files);
    if(isPassport) {
      setReliefData({
        ...reliefData,
        passport: [...reliefData.passport, newMedia],
      });
      return
    }
    
    setReliefData({
      ...reliefData,
      workId: [...reliefData.workId, newMedia],
    });
  };

  const getFileExtention = (fileName) => {
    return fileName.split(".")[1];
  };

  const getStates = async () => {
    try {
      let data = await fetch(
        "http://locationsng-api.herokuapp.com/api/v1/states"
      );
      data = await data.json();
      console.log(data);
      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLongAndLat = async (address) => {
    const { results } = await Geocode.fromAddress(address);
    setReliefData({
      ...reliefData,
      latitude: results[0].geometry.location.lat,
      longitude: results[0].geometry.location.lng,
    });
    console.log(results);
  };

  const submitRentRequest = async (e) => {
    console.log(reliefData);
    
    e.preventDefault();
    setLoading(true);
    await getLongAndLat(reliefData.address);
    console.log(reliefData);
    
    var data = await Fetch("Property/create", "post", reliefData);
    console.log('Rent property: ', data);
    if (!data.status) {
      setLoading(false);
      setErrormessage(data.message);
      return;
    }
    if (data.status != 400) {
      setLoading(false);
    //   setListingDetails({});
	close(true);
      history.push("/rent");
      toast.success(data.message);
      // history.push("/sell");
      await currentStep();
    }
    handleValidationErrors(data.errors);
    setLoading(false);
  };

  const grabUploadedVideoFile = (uploadedFiles) => {
    console.log(uploadedFiles);
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onerror = () => {
        console.log("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result.split(",")[1];
        console.log(reader.result);
        //console.log(binaryStr);
        console.log(binaryStr);
        await composeMedia(binaryStr, file);
      };
      console.log(file);
      reader.readAsDataURL(file);
    });
  };

  const submitRentToDraft = async (e) => {
    console.log(reliefData);
    e.preventDefault();
    setDrafting(true);
    var data = await Fetch("Property/create", "post", reliefData);
    console.log(data);
    if (!data.status) {
      setDrafting(false);
      setErrormessage(data.message);
      return;
    }
    if (data.status != 400) {
      setDrafting(false);
      setReliefData({});
      history.push("/rents");
    }
    handleValidationErrors(data.errors);
    setLoading(false);
  };

  const getLgas = async (state) => {
    try {
      let data = await fetch(
        `http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
      );
      data = await data.json();
      console.log(data);
      setLgas(data);
      handleValidationErrors(data.errors);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async (state) => {
    try {
      let data = await fetch(
        `http://locationsng-api.herokuapp.com/api/v1/states/${state}/cities`
      );
      data = await data.json();
      console.log(data);
      if (data.status != 404) {
        setCities(data);
        handleValidationErrors(data.errors);
        setLoading(false);
      }
      setCities([...cities, state]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(NaijaStates.lgas("oyo"));

  useEffect(() => {
    const fetchData = async () => {
      // await getStates();
    };
    fetchData();
  }, []);

  const handleValidationErrors = (errors) => {
    var ValidationErrors = errors;
    setErrors({ ...errors, ...ValidationErrors });
  };

  return (
    <div>
      
      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left mr-2" />
          <span
            className="backs"
            onClick={
              step > 1 ? () => { setStep(step - 1 ); } : close
            }
          >
            Back
          </span>
        </div>
        <div className="logo">
          <img src="/asset/logo.png" alt="Logo" />
        </div>
      </div>
      
        { step == 1 ? (
          <form className="content-section mt-4">
            {/* {errors ? (
		    	<div className="text-center mb-2">
		    		<span className="text-danger text-center">
		    			Please Check.... One or More Field is Incorrect
		    		</span>
		    	</div>
		    ) : null} */}

            <div className="input-box">
                <div className="input-label">First name</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Give your listing a name that makes it easy to find"
                    name="firstName"
                    value={reliefData.firstName}
                    onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Middle name</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Give your listing a name that makes it easy to find"
                    name="middleName"
                    value={reliefData.middleName}
                    onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Surname</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Give your listing a name that makes it easy to find"
                    name="name"
                    onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Mobile Number</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={reliefData.phoneNumber}
                    onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Email</div>
                <input
                    type="email"
                    className="formfield"
                    placeholder="Email Address"
                    name="email"
                    value={reliefData.email}
                    onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Address of Property</div>
                <input
                type="text"
                className="formfield"
                placeholder="Give your listing a name that makes it easy to find"
                name="propertyAddress"
                value={reliefData.propertyAddress}
                onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Date of Birth</div>
                <input
                type="text"
                className="formfield"
                placeholder="Give your listing a name that makes it easy to find"
                name="dateOfBirth"
                value={reliefData.dateOfBirth}
                onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Nationality</div>
                <div className="select-box">
                <select
                    name="nationality"
                    value={reliefData.nationality}
                    className="formfield"
                    onChange={ (e) => { }}
                >
                    <option value="" selected disabled>
                        Choose an option
                    </option>
                </select>
                <div className="arrows" />
                </div>
            </div>
            
            <div className="input-box">
                <div className="input-label">Marital Status</div>
                <div className="select-box">
                <select
                    name="martialStatus"
                    value={reliefData.martialStatus}
                    className="formfield"
                    onChange={ (e) => { }}
                >
                    <option value="" selected disabled>
                        Choose an option
                    </option>
                </select>
                <div className="arrows" />
                </div>
            </div>
            
         
          <button className="secondary-btn" onClick={currentStep}>
            Next
          </button>
        </form>
        
        ) : step == 2 ? (
            
        <form className="content-section mt-4">
            
            <div className="input-box">
                <div className="input-label">Occupation</div>
                <input
                type="text"
                className="formfield"
                placeholder="House No, Street, Estate"
                name="occupation"
                value={reliefData.occupation}
                onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Employer</div>
                <input
                type="text"
                className="formfield"
                placeholder=""
                name="employer"
                value={reliefData.employer}
                onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Work Address</div>
                <input
                type="text"
                className="formfield"
                placeholder="House No, Street, Estate"
                name="workAddress"
                value={reliefData.workAddress}
                onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">what is you Annual Income?</div>
                <div className="select-box">
                    <select
                        name="annualIncome"
                        value={reliefData.annualIncome}
                        onChange={handleOnChange}
                        className="formfield"
                    >
                        <option value="" selected disabled>
                            Choose an income bracket for your tenant
                        </option>
                    </select>
                    <div className="arrows" />
                </div>
            </div>

            <Dropzone
                accept="image/jpeg, image/png"
                maxFiles={6}
                onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles)}
            >
                { ({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                        {...getRootProps()}
                        className={
                            reliefData.passport.filter((m) => m.isImage).length >
                            0
                            ? "do-upload uploaded"
                            : "do-upload"
                        }
                        >
                        <input {...getInputProps()} />
                        {reliefData.passport.filter((m) => m.isImage).length >
                        0 ? (
                            <>
                            <i className="far fa-check" />
                            {`${
                                reliefData.passport.filter((m) => m.isImage)
                                .length
                            }  Pictures Uploaded`}
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
                maxFiles={6}
                onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles, false)}
            >
                { ({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            {...getRootProps()}
                            className={
                                reliefData.workId.filter((m) => m.isImage).length >
                                0
                                ? "do-upload uploaded"
                                : "do-upload"
                            }
                        >
                        <input {...getInputProps()} />
                        {reliefData.workId.filter((m) => m.isImage).length >
                        0 ? (
                            <>
                            <i className="far fa-check" />
                            {`${
                                reliefData.workId.filter((m) => m.isImage)
                                .length
                            }  Pictures Uploaded`}
                            </>
                        ) : (
                            <>
                            <i className="far fa-image" />
                            Upload Copy of Work ID
                            </>
                        )}
                        </div>
                    </section>
                )}
            </Dropzone>
            
            <h6 className="field-title mb-4 mt-4">Next of Kin</h6>
            
            <div className="input-box">
                <div className="input-label">First name</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Enter your placeholder text or enter space bar"
                    name="nk_firstName"
                    value={reliefData.nk_firstName}
                    onChange={handleOnChange}
                />
            </div>
            <div className="input-box">
                <div className="input-label">Surname</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Enter your placeholder text or enter space bar"
                    name="nk_lastName"
                    value={reliefData.nk_lastName}
                    onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Mobile Number</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Enter your placeholder text or enter space bar"
                    name="nk_phoneNumber"
                    value={reliefData.nk_phoneNumber}
                    onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Email</div>
                <input
                    type="email"
                    className="formfield"
                    placeholder="Enter your placeholder text or enter space bar"
                    name="nk_email"
                    value={reliefData.nk_email}
                    onChange={handleOnChange}
                />
            </div>
            <div className="input-box">
                <div className="input-label">Address</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Enter your placeholder text or enter space bar"
                    name="nk_address"
                    value={reliefData.nk_address}
                    onChange={handleOnChange}
                />
            </div>
            <div className="input-box">
                <div className="input-label">Relationship</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Enter your placeholder text or enter space bar"
                    name="nk_relationship"
                    value={reliefData.nk_relationship}
                    onChange={handleOnChange}
                />
            </div>
                        
            <button className="secondary-btn" onClick={currentStep}>
                Next
            </button>
        </form>
        
      ) : step == 3 ? (
          
        <form className="content-section mt-4">
            <div className="input-box">
                <div className="input-label">Relief Amount</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Give your listing a name that makes it easy to find"
                    name="reliefAmount"
                    value={reliefData.reliefAmount}
                    onChange={handleOnChange}
                />
            </div>
            <div className="input-box">
                <div className="input-label">Choose a pay back date</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Give your listing a name that makes it easy to find"
                    name="paybackDate"
                    value={reliefData.paybackDate}
                    onChange={handleOnChange}
                />
            </div>
            <div className="input-box">
                <div className="input-label">How do you want to pay back?</div>
                <div className="select-box">
                    <select
                        name="paybackMethod"
                        value={reliefData.paybackMethod}
                        onChange={handleOnChange}
                        className="formfield"
                    >
                        <option value="" selected disabled>
                            Choose a property type
                        </option>
                    </select>
                    <div className="arrows" />
                </div>
            </div>
            
            <Box display="flex" flexDirection="column" className="relief-preview p-3 mt-3 mb-4">
                <h6 className="relief-preview-title">Preview</h6>
                <Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="my-1">
                    <div className="tab">
                        <h5>Loan Amount</h5>
                        <p className="amount">₦4,500,000</p>
                    </div>
                    <div className="tab text-right">
                        <h5>Interest</h5>
                        <p className="rate">15% monthly</p>
                    </div>
                </Box>
                <Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="my-1">
                    <div className="tab">
                        <h5>Total Repayment</h5>
                        <p className="amount">₦4,782,372</p>
                    </div>
                    <div className="tab text-right">
                        <h5>Instalments</h5>
                        <p className="rate">₦797,062/Monthly</p>
                    </div>
                </Box>
            </Box>
            
            <div className="joint-btn mg">
                <button
                    className="secondary-btn draft"
                    type="submit"
                    onClick={submitRentRequest}
                >
                    {loading ? <Spinner /> : "Apply for Rent Relief"}
                </button>
            </div>
        </form>
      ) : null}
    </div>
  );
}

export default ReliefForm;
