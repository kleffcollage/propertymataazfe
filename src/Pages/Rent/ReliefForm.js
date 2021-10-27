import React, { useContext, useEffect, useState, } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
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
import CurrencyInput from 'react-currency-input-field';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

function ReliefForm({ property = null, close }) {
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
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
 
  // set reliefAmount
  let reliefAmount = watch("reliefAmount");
  
  const onSubmit = data => {
    data.register.passport = reliefData.passport
    console.log(data)
  };

  // console.log(NaijaStates.states());
  const [inputErrors, setInputErrors] = useState({
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
    register: {
      firstName: "",
      lastName: user ? user.lastName : "",
      middleName:  "",
      phoneNumber: (user && user != null) ? user.phoneNumber : "",
      email: user ? user.email : "",
      dateOfBirth: user ? user.dateOfBirth : "",
      propertyAddress: "",
      nationality: user ? user.nationality : "",
      martialStatus: "",
      occupation: user ? user.occupation : "",
      employer: "",
      workAddress: "",
      annualIncome: user ? user.annualIncome : "",
    },
    
    nextOfKin: {
      nk_firstName: "",
      nk_lastName: "",
      nk_email: "",
      nk_phoneNumber: "",
      nk_address: "",
      nk_relationship: "",
    },
    
    workId: null,
    passportPhotograph: null,
    reliefAmount: 0,
    paybackDate: "",
    repaymentFrequency: "",
    propertyId: 0,
    applicationTypeId: 0,
    
    
    isDraft: false,
    isActive: false,
    isForRent: false,
    isForSale: false,
    longitude: 0,
    latitude: 0,
  });

  const [states, setStates] = useState([]);

  const handleOnChange = (e) => {
    // showAlert("success", "Something toasted", "Everything works ");
    const { name, value } = e.target;
    setReliefData({ 
      ...reliefData, 
      [reliefData.register.name]: value });
    console.log(reliefData);
  };
  
  const calculateLoanInterest = () => {
    // console.log({amount})
    let amount = property && property.price
    let interest = 0.15
    let time = 12
    // 
    let interestPerMonth = parseInt(amount) * interest
    let totalRepayment = (interestPerMonth * time ) + parseInt(amount)
    
    const calculations = {
      interestPerMonth,
      totalRepayment
    }
    // console.log({ calculations });
    setLoanCalculation(calculations)
  }

  const getApplicationTypes = async () => {
    try {
      let { data } = await Fetch("Application/types");
      // console.log("Application types: ", data); 
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
      // history.push("/rent");
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
        passportPhotograph: newMedia,
      });
      return
    }
    
    setReliefData({
      ...reliefData,
      workId: newMedia,
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
  
  console.log({ property })

  const submitReliefRequest = async (reliefDetails) => {
    setLoading(true);
    // await getLongAndLat(reliefData.address);
    
    const { workId, passportPhotograph } = reliefData;
    if (!workId || !passportPhotograph) {
      toast.info("Please, upload a copy of work Id and a passport.");
      setLoading(false);
      return;
    }
    // reliefData.firstName = user.firstName
    reliefDetails.register.passportPhotograph = reliefData.passportPhotograph
    reliefDetails.register.workId = reliefData.workId
    reliefDetails.propertyId = property && property.id
    reliefDetails.applicationTypeId = applicationTypes.find(type => type.name == typeOfApplications.RELIEF).id
    
    // console.log({ reliefDetails });
    
    try {
      var data = await Fetch("Application/new ", "post", reliefDetails);
      console.log('Rent property: ', data);
      if (!data.status) {
        setLoading(false);
        setErrormessage(data.message);
        return;
      }
      if(data.status != 400) {
        setLoading(false);
        toast.success("Rent relief application submitted successfully.");
        close(true);
        // history.push("/rent");
        // await currentStep();
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
 
  useEffect(() => {
    const fetchData = async () => {
      // await getStates();
      await getApplicationTypes();
      calculateLoanInterest()
    };
    
    fetchData();
  }, []);

  const handleValidationErrors = (errors) => {
    var ValidationErrors = errors;
    setInputErrors({ ...inputErrors, ...ValidationErrors });
  };

  return (
    <div>
      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left mr-2" />
          <span className="backs"
            onClick={
              step > 1 ? () => { setStep(step - 1 ); } : close
            }
          >
            Back
          </span>
        </div>
        
      </div>
      
      <form onSubmit={ handleSubmit(submitReliefRequest) } className="content-section mt-4">
        { step == 1 ? (
          <>
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
                  name="register.firstName"
                  {...register("register.firstName")}
                  defaultValue={user.firstName}
              />
            </div>
            
            <div className="input-box">
              <div className="input-label">Middle name</div>
              <input
                  type="text"
                  className="formfield"
                  placeholder="Give your listing a name that makes it easy to find"
                  name="register.middleName"
                  {...register("register.middleName")}
              />
            </div>
            
            <div className="input-box">
                <div className="input-label">Surname</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Give your listing a name that makes it easy to find"
                    name="register.lastName"
                    {...register("register.lastName")}
                    defaultValue={user.lastName}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Mobile Number</div>
                <input
                    type="text"
                    className="formfield"
                    placeholder="Phone number"
                    name="register.phoneNumber"
                    {...register("register.phoneNumber")}
                    defaultValue={user.phoneNumber}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Email</div>
                <input
                    type="email"
                    className="formfield"
                    placeholder="Email Address"
                    name="register.email"
                    {...register("register.email")}
                    defaultValue={user.email}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Address of Property</div>
                <input
                  type="text"
                  className="formfield"
                  placeholder="Give your listing a name that makes it easy to find"
                  name="register.propertyAddress"
                  {...register("register.propertyAddress")}
                  defaultValue={property.address}
                />
            </div>
            
            <div className="input-box">
                <div className="input-label">Date of Birth</div>
                <input
                  type="date"
                  className="formfield"
                  placeholder="Give your listing a name that makes it easy to find"
                  name="register.dateOfBirth"
                  {...register("register.dateOfBirth")}
                  defaultValue={user.dateOfBirth}
                />
            </div>
            
            <div className="input-box">
              <div className="input-label">Nationality</div>
              <input
                type="text"
                className="formfield"
                placeholder="Your nationality, e.g Nigerian"
                name="register.nationality"
                {...register("register.nationality")}
                defaultValue={user.nationality}
              />
            </div>
            
            <div className="input-box">
              <div className="input-label">Marital Status</div>
              <div className="select-box">
                <select
                  className="formfield"
                  name="register.martialStatus"
                  {...register("register.maritalStatus")}
                >
                  <option value="" selected disabled> Choose an option </option>
                  <option value="single"> Single  </option>
                  <option value="married"> Married </option>
                  <option value="divorced"> Divorced </option>    
                  <option value="others"> Others </option>    
                </select>
                <div className="arrows" />
              </div>
            </div>
            
         
            <button className="secondary-btn" onClick={currentStep}>
              Next
            </button>
          </>
          
        ) : step == 2 ? (
              
          <div className="mt-4">
              <div className="input-box">
                  <div className="input-label">Occupation</div>
                  <input
                    type="text"
                    className="formfield"
                    placeholder=""
                    name="register.occupation"
                    {...register("register.occupation")}
                    defaultValue={user.occupation}
                  />
              </div>
              
              <div className="input-box">
                <div className="input-label">Employer</div>
                <input
                  type="text"
                  className="formfield"
                  placeholder=""
                  name="register.employer"
                  {...register("register.employer")}
                />
              </div>
              
              <div className="input-box">
                <div className="input-label">Work Address</div>
                <input
                  type="text"
                  className="formfield"
                  placeholder="House No, Street, Estate"
                  name="register.workAddress"
                  {...register("register.workAddress")}
                />
              </div>
              
              <div className="input-box">
                  <div className="input-label">what is you Annual Income?</div>
                  <input
                    type="text"
                    className="formfield"
                    placeholder="Your income bracket for your tenant"
                    name="register.annualIncome"
                    {...register("register.annualIncome")}
                  />
              </div>

              <Dropzone
                  accept="image/jpeg, image/png"
                  maxFiles={6}
                  onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles)}
              >
                  { ({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}
                            className={
                                reliefData.passportPhotograph
                                ? "do-upload uploaded"
                                : "do-upload"
                            }
                          >
                          <input {...getInputProps()} />
                          {reliefData.passportPhotograph ? (
                              <>
                                <i className="far fa-check" />
                                {`${ reliefData.passportPhotograph && 'Passport Uploaded'}`}
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
                                  reliefData.workId
                                  ? "do-upload uploaded"
                                  : "do-upload"
                              }
                          >
                          <input {...getInputProps()} />
                            { reliefData.workId ? (
                                <>
                                  <i className="far fa-check" />
                                  {`${ reliefData.workId && 'Work ID Uploaded' }  `}
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
                      name="nextOfKin.nk_firstName"
                      {...register("nextOfKin.firstName")}
                  />
              </div>
              <div className="input-box">
                  <div className="input-label">Surname</div>
                  <input
                      type="text"
                      className="formfield"
                      placeholder="Enter your placeholder text or enter space bar"
                      name="nextOfKin.nk_lastName"
                      {...register("nextOfKin.lastName")}
                  />
              </div>
              
              <div className="input-box">
                  <div className="input-label">Mobile Number</div>
                  <input
                      type="text"
                      className="formfield"
                      placeholder="Enter your placeholder text or enter space bar"
                      name="nextOfKin.phoneNumber"
                      {...register("nextOfKin.phoneNumber")}
                  />
              </div>
              
              <div className="input-box">
                  <div className="input-label">Email</div>
                  <input
                      type="email"
                      className="formfield"
                      placeholder="Enter your placeholder text or enter space bar"
                      name="nextOfKin.email"
                      {...register("nextOfKin.email")}
                  />
              </div>
              <div className="input-box">
                  <div className="input-label">Address</div>
                  <input
                      type="text"
                      className="formfield"
                      placeholder="Enter your placeholder text or enter space bar"
                      name="nextOfKin.address"
                      {...register("nextOfKin.address")}
                  />
              </div>
              <div className="input-box">
                  <div className="input-label">Relationship</div>
                  <input
                      type="text"
                      className="formfield"
                      placeholder="Enter your placeholder text or enter space bar"
                      name="nextOfKin.relationship"
                      {...register("nextOfKin.relationship")}
                  />
              </div>
                          
              <button className="secondary-btn" onClick={currentStep}>
                  Next
              </button>
          </div>
        
        ) : step == 3 ? (
            
          <div className="mt-4">
              
              <div className="input-box">
                <div className="input-label"> Relief Amount</div>
                <input 
                  type="number"
                  className="formfield"
                  placeholder="Relief amount"
                  name="reliefAmount"
                  {...register("reliefAmount")}
                  // defaultValue={property.price}
                />
              </div>
              
              <div className="input-box">
                  <div className="input-label">Choose a pay back date</div>
                  <input
                    type="date"
                    className="formfield"
                    placeholder="Select your repayment date"
                    name="paybackDate"
                    {...register("paybackDate")}
                  />
              </div>
              <div className="input-box">
                  <div className="input-label">How do you want to pay back?</div>
                  <div className="select-box">
                      <select
                        className="formfield"
                        name="repaymentFrequency"
                        {...register("repaymentFrequency")}
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
                          <p className="amount"><Naira>{ property && property.price }</Naira></p>
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
                      // onClick={submitRentRequest}
                  >
                      {loading ? <Spinner /> : "Apply for Rent Relief"}
                  </button>
              </div>
            </div>
        ) : null}
      </form>
    </div>
  );
}

export default ReliefForm;
