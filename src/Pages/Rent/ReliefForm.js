import React, { useContext, useEffect, useState } from "react";
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
import { typeOfApplications } from "../../Utilities/Enums";
import Naira from "react-naira";
import CurrencyInput from "react-currency-input-field";
const CountryList = require("country-list").getNames();

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
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [loanCalculation, setLoanCalculation] = useState({
    interestPerMonth: 0,
    totalRepayment: 0,
    installmentAmount: 0,
  });
  const [repaymentFrequency, setRepaymentFrequency] = useState("");
  const [paybackDate,setPaybackDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const {
    data: { user: user },
  } = useContext(MainContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // set reliefAmount
  let reliefAmount = watch("reliefAmount");

  const onSubmit = (data) => {
    data.register.passport = reliefData.passport;
  };

  //  (NaijaStates.states());
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
      middleName: "",
      phoneNumber: user && user != null ? user.phoneNumber : "",
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
    paybackDate: new Date(),
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
      [reliefData.register.name]: value,
    });
  };

  const calculateLoanInterest = () => {
    // let amount = amount

    let interest = 0.15;
    let time = repaymentFrequency == "Monthly" ? 12 : repaymentFrequency == "Weekly" ? 7 : 1;

    let interestPerMonth = parseInt(amount) / 100 * 7.5;
    let totalRepayment = parseInt(amount) + interestPerMonth;
    const differenceInTime = new Date(paybackDate).getTime() - new Date().getTime();
    let numberOfDaysTillLoanDueDate = Math.floor(differenceInTime / (1000 * 3600 * 24));
    let numberOfInstallments = (numberOfDaysTillLoanDueDate / (repaymentFrequency == "Monthly" ? 12 : repaymentFrequency == "Weekly" ? 7 : 1));
    let installmentAmount = totalRepayment / numberOfInstallments;


    const calculations = {
      interestPerMonth,
      totalRepayment,
      installmentAmount,
    };
    setLoanCalculation(calculations);
  };

  const getApplicationTypes = async () => {
    try {
      let { data } = await Fetch("Application/types");
      setApplicationTypes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const currentStep = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    if (step == 3) {
      close(true);
      // history.push("/rent");
      return;
    }
  };

  const grabUploadedFile = (uploadedFiles, isPassport = true) => {
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.error("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onerror = () => {
        console.error("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result.split(",")[1];
        // console.log(reader.result);
        //console.log(binaryStr);
        // console.log("GrabUp", binaryStr);
        composeMedia(binaryStr, file, isPassport);
      };
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
    if (isPassport) {
      setReliefData({
        ...reliefData,
        passportPhotograph: newMedia,
      });
      return;
    }

    setReliefData({
      ...reliefData,
      workId: newMedia,
    });
  };

  const getFileExtention = (fileName) => {
    return fileName.split(".")[1];
  };

  // const getLongAndLat = async (address) => {
  //   const { results } = await Geocode.fromAddress(address);
  //   setReliefData({
  //     ...reliefData,
  //     latitude: results[0].geometry.location.lat,
  //     longitude: results[0].geometry.location.lng,
  //   });
  // };

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
    reliefDetails.reliefAmount = amount;
    reliefDetails.register.passportPhotograph = reliefData.passportPhotograph;
    reliefDetails.register.workId = reliefData.workId;
    reliefDetails.propertyId = property && property.id;
    reliefDetails.applicationTypeId = applicationTypes.find(
      (type) => type.name == typeOfApplications.RELIEF
    ).id;


    try {
      var data = await Fetch("Application/new ", "post", reliefDetails);
      if (!data.status) {
        setLoading(false);
        toast.error(data.message);
        setErrormessage(data.message);
        return;
      }
      if (data.status != 400) {
        setLoading(false);
        toast.success("Rent relief application submitted successfully.");
        close(true);
        // history.push("/rent");
        // await currentStep();
      }
      handleValidationErrors(data.errors);
      setLoading(false);
    } catch (error) {
      console.error({ error });
    }
  };

  const grabUploadedVideoFile = (uploadedFiles) => {
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.error("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onerror = () => {
        console.error("Errrrrrrrrrrrrrooooooooooorrrrrrr");
      };
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result.split(",")[1];
        await composeMedia(binaryStr, file);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      // await getStates();
      await getApplicationTypes();
      calculateLoanInterest(amount, repaymentFrequency,paybackDate);
    };

    fetchData();
  }, [amount, repaymentFrequency,paybackDate]);

  const handleValidationErrors = (errors) => {
    var ValidationErrors = errors;
    setInputErrors({ ...inputErrors, ...ValidationErrors });
  };

  return (
    <div>
      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left mr-2" />
          <span
            className="backs"
            onClick={
              step > 1
                ? () => {
                    setStep(step - 1);
                  }
                : close
            }
          >
            Back
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(submitReliefRequest)}
        className="content-section mt-4"
      >
        {step == 1 ? (
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
              <div className="select-box">
                <select
                  className="formfield"
                  name="register.nationality"
                  {...register("register.nationality")}
                >
                  <option value="" selected>
                    {" "}
                    Choose your nationality{" "}
                  </option>
                  {CountryList.map((country, index) => {
                    return (
                      <option key={index} value={country}>
                        {" "}
                        {country}{" "}
                      </option>
                    );
                  })}
                </select>
                <div className="arrows" />
              </div>
            </div>

            <div className="input-box">
              <div className="input-label">Marital Status</div>
              <div className="select-box">
                <select
                  className="formfield"
                  name="register.martialStatus"
                  {...register("register.maritalStatus")}
                >
                  <option value="" selected>
                    {" "}
                    Choose an option{" "}
                  </option>
                  <option value="single"> Single </option>
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
              <div className="select-box">
                <select
                  className="formfield"
                  name="register.annualIncome"
                  {...register("register.annualIncome")}
                >
                  <option>Choose an option</option>
                  <option value="50,000 - 250,000">
                    &#8358;{"50,000"} - &#8358;{"250,000"}
                  </option>
                  <option value="250,000 - 500,000">
                    &#8358;{"250,000"} - &#8358;{"500,000"}
                  </option>
                  <option value="500,000 - 750,000">
                    &#8358;{"500,000"} - &#8358;{"750,000"}
                  </option>
                  <option value="750,000 - 1m">
                    &#8358;{"750,000"} - &#8358;{"1,000,000"}
                  </option>
                  <option value="1m and above">&#8358;{"1m and above"}</option>
                </select>
                <div className="arrows" />
              </div>
            </div>

            <Dropzone
              accept="image/jpeg, image/png"
              maxFiles={6}
              onDrop={(acceptedFiles) => grabUploadedFile(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
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
                        {`${
                          reliefData.passportPhotograph && "Passport Uploaded"
                        }`}
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
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className={
                      reliefData.workId ? "do-upload uploaded" : "do-upload"
                    }
                  >
                    <input {...getInputProps()} />
                    {reliefData.workId ? (
                      <>
                        <i className="far fa-check" />
                        {`${reliefData.workId && "Work ID Uploaded"}  `}
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
                placeholder="+234 832 439 4321"
                name="nextOfKin.phoneNumber"
                {...register("nextOfKin.phoneNumber")}
              />
            </div>

            <div className="input-box">
              <div className="input-label">Email</div>
              <input
                type="email"
                className="formfield"
                placeholder="pm@email.com"
                name="nextOfKin.email"
                {...register("nextOfKin.email")}
              />
            </div>
            <div className="input-box">
              <div className="input-label">Address</div>
              <input
                type="text"
                className="formfield"
                placeholder="Input an address"
                name="nextOfKin.address"
                {...register("nextOfKin.address")}
              />
            </div>
            <div className="input-box">
              <div className="input-label">Relationship</div>
              <input
                type="text"
                className="formfield"
                placeholder="Your relationship with your next of kin"
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
              {/* <input 
                  type="number"
                  className="formfield"
                  placeholder="Relief amount"
                  name="reliefAmount"
                  {...register("reliefAmount")}
                  // defaultValue={property.price}
                /> */}
              <CurrencyInput
                id="input-example"
                className="formfield"
                name="reliefAmount"
                placeholder="₦0.00"
                prefix="₦"
                decimalsLimit={2}
                onValueChange={(value, name) => setAmount(value)}
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
                onChange={(e) => setPaybackDate(e.target.value)}
              />
            </div>
            <div className="input-box">
              <div className="input-label">How do you want to pay back?</div>
              <div className="select-box">
                <select
                  className="formfield"
                  name="repaymentFrequency"
                  {...register("repaymentFrequency")}
                  onChange={(e) => setRepaymentFrequency(e.target.value)}
                >
                  <option value="" selected>
                    {" "}
                    Select how you want to payback{" "}
                  </option>
                  <option value="Weekly"> Weekly </option>
                  <option value="Monthly"> Monthly </option>
                  <option value="Annually"> Yearly </option>
                  <option value="Biannually"> 2 years </option>
                </select>
                <div className="arrows" />
              </div>
            </div>

            <Box
              display="flex"
              flexDirection="column"
              className="relief-preview p-3 mt-3 mb-4"
            >
              <h6 className="relief-preview-title">Preview</h6>
              <Box
                display="flex"
                width="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                className="my-1"
              >
                <div className="tab">
                  <h5>Loan Amount</h5>
                  <p className="amount">
                    <Naira>{amount}</Naira>
                  </p>
                </div>
                <div className="tab text-right">
                  <h5>Interest</h5>
                  <p className="rate">15%</p>
                </div>
              </Box>
              <Box
                display="flex"
                width="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                className="my-1"
              >
                <div className="tab">
                  <h5>Total Repayment</h5>
                  <p className="amount">
                    <Naira>
                      {loanCalculation ? loanCalculation.totalRepayment : 0}
                    </Naira>
                  </p>
                </div>
                <div className="tab text-right">
                  <h5>Instalments</h5>
                  <p className="rate">
                    <Naira>
                      {loanCalculation ? loanCalculation.installmentAmount : 0}
                    </Naira>
                    {`/${repaymentFrequency}`}
                  </p>
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
