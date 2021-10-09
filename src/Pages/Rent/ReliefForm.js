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
import { typeOfApplications } from "../../Utilities/Enums"
import Naira from "react-naira"
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
  const [ applicationTypes, setApplicationTypes] = useState([]);
  const [loanCalculation, setLoanCalculation ] = useState({
    interestPerMonth: 0,
    totalRepayment: 0,
  })
  
  const { data: { user: user }} = useContext(MainContext);
  // console.log({user})

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
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    middleName:  "",
    phoneNumber: user ? user.phoneNumber : "",
    email: user ? user.email : "",
    dateOfBirth: user ? user.dateOfBirth : "",
    propertyAddress: "",
    nationality: user ? user.nationality : "",
    martialStatus: "",
    occupation: user ? user.occupation : "",
    employer: "",
    workAddress: "",
    annualIncome: user ? user.annualIncome : "",
    
    nk_firstName: "",
    nk_lastName: "",
    nk_email: "",
    nk_phoneNumber: "",
    nk_address: "",
    nk_relationship: "",
    
    reliefAmount: 0,
    paybackDate: "",
    paybackMethod: "",
    
    
    isDraft: false,
    isActive: false,
    isForRent: false,
    isForSale: false,
    workId: [],
    passport: [],
    longitude: 0,
    latitude: 0,
    applicationTypeId: 0,
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
  
  const calculateLoanInterest = (amount) => {
    // let amount = reliefData.reliefAmount
    let interest = 0.15
    let time = 12
    // 
    let interestPerMonth = parseInt(amount) * interest
    let totalRepayment = (interestPerMonth * time ) + parseInt(amount)
    
    const calculations = {
      interestPerMonth,
      totalRepayment
    }
    setLoanCalculation(calculations)
  }

  const getApplicationTypes = async () => {
    try {
      let { data } = await Fetch("Application/types");
      console.log("Application types: ", data); 
      setApplicationTypes(data);
    } catch (error) {
      console.log(error);
    }
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

  // const getLongAndLat = async (address) => {
  //   const { results } = await Geocode.fromAddress(address);
  //   setReliefData({
  //     ...reliefData,
  //     latitude: results[0].geometry.location.lat,
  //     longitude: results[0].geometry.location.lng,
  //   });
  //   console.log(results);
  // };

  const submitRentRequest = async (e) => {
    e.preventDefault();
    console.log(reliefData);
    setLoading(true);
    // await getLongAndLat(reliefData.address);
    
    const { workId, passport } = reliefData;
    if (workId.length == 0 || passport.length == 0) {
      toast.info("Please, upload a copy of work Id and a passport.");
      setLoading(false);
      return;
    }
    reliefData.firstName = user.firstName
    reliefData.lastName = user.lastName
    reliefData.email = user.email
    reliefData.phoneNumber = user.phoneNumber
    reliefData.nationality = user.nationality
    reliefData.occupation = user.occupation
    
    reliefData.applicationTypeId = applicationTypes.find(type => type.name == typeOfApplications.RELIEF).id
    
    console.log({ reliefData });
    
    try {
      var data = await Fetch("Application/new ", "post", reliefData);
      console.log('Rent property: ', data);
      if (!data.status) {
        setLoading(false);
        setErrormessage(data.message);
        return;
      }
      if (data.status != 400) {
        setLoading(false);
        // setListingDetails({});
        close(true);
        history.push("/rent");
        toast.success(data.message);
        // history.push("/sell");
        await currentStep();
      }
      handleValidationErrors(data.errors);
      setLoading(false);
      
    } catch (error) {
      console.log({ error })
    }
    
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

  const getLgas = async (state) => {
    try {
      let data = await fetch(
        `http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
      );
      data = await data.json();
      // console.log(data);
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
      // console.log(data);
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
  // console.log(NaijaStates.lgas("oyo"));

  useEffect(() => {
    const fetchData = async () => {
      // await getStates();
      await getApplicationTypes();
      calculateLoanInterest(reliefData.reliefAmount)
    };
    fetchData();
  }, [reliefData.reliefAmount]);

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
                  type="date"
                  className="formfield"
                  placeholder="Give your listing a name that makes it easy to find"
                  name="dateOfBirth"
                  value={reliefData.dateOfBirth}
                  onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Nationality</div>
                <input
                  type="text"
                  className="formfield"
                  placeholder="Your nationality, e.g Nigerian"
                  name="nationality"
                  value={reliefData.nationality}
                  onChange={handleOnChange}
                />
            </div>
            
            <div className="input-box">
              <div className="input-label">Marital Status</div>
              <div className="select-box">
                <select
                  name="martialStatus"
                  value={reliefData.martialStatus}
                  className="formfield"
                  onChange={handleOnChange}
                >
                  <option value="" selected disabled> Choose an option </option>
                  <option value="male"> Male </option>
                  <option value="female"> Female </option>
                  <option value="rather-not-say"> Preferred not to say </option>
                </select>
                <div className="arrows" />
              </div>
            </div>
            
         
          <button className="secondary-btn" onClick={currentStep}>
            Next
          </button>
        </form>
        
        ) : step == 2 ? (
            
        <div className="content-section mt-4">
            
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
                <input
                  type="text"
                  className="formfield"
                  placeholder="Your income bracket for your tenant"
                  name="annualIncome"
                  value={reliefData.annualIncome}
                  onChange={handleOnChange}
                />
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
        </div>
        
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
                    type="date"
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
                        <option value="" selected disabled> Choose a property type </option>
                        <option value="weekly"> Weekly </option>
                        <option value="month"> Month </option>
                        <option value="annual"> Yearly </option>
                        <option value="biannual"> 2 years </option>
                    </select>
                    <div className="arrows" />
                </div>
            </div>
            
            <Box display="flex" flexDirection="column" className="relief-preview p-3 mt-3 mb-4">
                <h6 className="relief-preview-title">Preview</h6>
                <Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="my-1">
                    <div className="tab">
                        <h5>Loan Amount</h5>
                        <p className="amount"><Naira>{ reliefData.reliefAmount }</Naira></p>
                    </div>
                    <div className="tab text-right">
                        <h5>Interest</h5>
                        <p className="rate">15% monthly</p>
                    </div>
                </Box>
                <Box display="flex" width="100%" flexDirection="row" alignItems="center" justifyContent="space-between" className="my-1">
                    <div className="tab">
                        <h5>Total Repayment</h5>
                        <p className="amount"><Naira>{ loanCalculation ? loanCalculation.totalRepayment : 0 }</Naira></p>
                    </div>
                    <div className="tab text-right">
                        <h5>Instalments</h5>
                        <p className="rate"><Naira>{ loanCalculation ? loanCalculation.interestPerMonth : 0 }</Naira>/Monthly</p>
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
