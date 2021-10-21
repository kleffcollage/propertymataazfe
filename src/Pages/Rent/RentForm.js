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
import CurrencyInput from "react-currency-input-field";
import banks from "../../Utilities/banks.json";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

function RentForm({ close }) {
  const history = useHistory();
  const { showAlert } = useContext(MainContext);
  const [drafting, setDrafting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [step, setStep] = useState(1);
  const [bedroomCounter, setBedroomCounter] = useState(0);
  const [bathroomCounter, setBathroomCounter] = useState(0);
  const [price, setPrice] = useState(0);
  const [tenantAnnualIncome, setTenantAnnualIncome] = useState(0);

  //   console.log(NaijaStates.states());
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
  const [rentDetails, setRentDetails] = useState({
    name: "",
    title: "",
    address: "",
    state: "",
    lga: "",
    area: "",
    description: "",
    sellMySelf: false,
    price: 0,
    rentCollectionTypeId: 0,
    tenantAnnualIncome: "",
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    isDraft: false,
    isActive: true,
    isForRent: true,
    isForSale: false,
    mediafiles: [],
    longitude: 0,
    latitude: 0,
    bank: "",
    accountno: "",
    tenantTypeId: 0,
    applicationTypeId: 0,
    propertyTypeId: undefined,
  });

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyTitles, setPropertyTitles] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [cities, setCities] = useState([]);
  const [tenantType, setTenantTypes] = useState([]);
  const [rentCollection, setRentCollection] = useState([]);

  const handleOnChange = (e) => {
    // showAlert("success", "Something toasted", "Everything works ");
    const { name, value } = e.target;
    setRentDetails({ ...rentDetails, [name]: value });
    // console.log(rentDetails);
  };

  const bedIncrement = (e) => {
    e.preventDefault();
    setBedroomCounter(bedroomCounter + 1);
    setRentDetails({
      ...rentDetails,
      numberOfBedrooms: bedroomCounter + 1,
    });
    console.log(rentDetails);
  };

  const bedDecrement = (e) => {
    e.preventDefault();
    setBedroomCounter((bedroomCounter) => Math.max(bedroomCounter - 1, 1));
    setRentDetails({
      ...rentDetails,
      numberOfBedrooms: Math.max(bedroomCounter - 1, 1),
    });
    console.log(rentDetails);
  };

  const bathIncrement = (e) => {
    e.preventDefault();
    setBathroomCounter(bathroomCounter + 1);
    setRentDetails({
      ...rentDetails,
      numberOfBathrooms: bathroomCounter + 1,
    });
    console.log(rentDetails);
  };

  const bathDecrement = (e) => {
    e.preventDefault();
    setBathroomCounter((bathroomCounter) => Math.max(bathroomCounter - 1, 1));
    setRentDetails({
      ...rentDetails,
      numberOfBathrooms: Math.max(bathroomCounter - 1, 1),
    });
    console.log(rentDetails);
  };

  //   const currentStep = async () => {
  //     if (step < 3 ) {
  //       setStep( step + 1);
  //       return;
  //     }
  //     if (step == 3) {
  // 		close(true);
  // 		history.push("/rent");
  // 		return;
  //     }
  //   };

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
        console.log(reader.result);
        //console.log(binaryStr);
        console.log(binaryStr);
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
    setRentDetails({
      ...rentDetails,
      mediafiles: [...rentDetails.mediafiles, newMedia],
    });
  };

  const getFileExtention = (fileName) => {
    return fileName.split(".")[1];
  };

  const getPropertyTypes = async () => {
    try {
      const data = await Fetch("property/types", "get");
      if (!data.status) return;

      setPropertyTypes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStates = async () => {
    try {
      let data = await fetch(
        "http://locationsng-api.herokuapp.com/api/v1/states"
      );
      data = await data.json();
      //   console.log(data);
      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLongAndLat = async (address) => {
    const { results } = await Geocode.fromAddress(address);
    setRentDetails({
      ...rentDetails,
      latitude: results[0].geometry.location.lat,
      longitude: results[0].geometry.location.lng,
    });
    console.log("LongAndLat: ", results);
  };

  const getTenantTypes = async () => {
    try {
      const { status, data } = await Fetch("Property/tenants/types");
      if (!status) return;
      setTenantTypes(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getRentCollection = async () => {
    try {
      const { status, data } = await Fetch("Property/collection/types");
      // console.log(data)
      if (!status) return;
      setRentCollection(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPropertyTitles = async () => {
    try {
      const data = await Fetch("property/titles", "get");
      if (!data.status) return;
      const titles = data.data;
      setPropertyTitles(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitRentRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (rentDetails.mediafiles.length == 0) {
      toast.info("Upload atleast a photo or video for your property.");
      setLoading(false);
      return;
    }
    console.log({ rentDetails });
    let record = rentDetails;
    record.price = price;
    record.tenantAnnualIncome = tenantAnnualIncome;

    try {
      var data = await Fetch("Property/create", "post", record);
      console.log("Rent property: ", data);
      if (!data.status) {
        setLoading(false);
        setErrormessage(data.message);
        toast.error(data.message);
        return;
      }
      if (data.status != 400) {
        setLoading(false);
        //   setListingDetails({});
        close(true);
        toast.success("Property successfully listed for rent.");
        history.push("/listings");
        // history.push("/sell");
        // await currentStep();
        return;
      }

      toast.error(data.message);
      // history.push("/my-mattaz");
      handleValidationErrors(data.errors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
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
  //   console.log(NaijaStates.lgas("oyo"));

  useEffect(() => {
    const fetchData = async () => {
      await getPropertyTypes();
      await getTenantTypes();
      await getRentCollection();
      await getPropertyTitles();
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
        <div className="logo">
          <img src="/asset/logo.png" alt="Logo" />
        </div>
      </div>
      {step == 1 ? (
        <form className="content-section mt-4">
          {/* {errors ? (
		    	<div className="text-center mb-2">
		    		<span className="text-danger text-center">
		    			Please Check.... One or More Field is Incorrect
		    		</span>
		    	</div>
		    ) : null} */}

          <div className="input-box">
            <div className="input-label">Name</div>
            <input
              type="text"
              className="formfield"
              placeholder="Give your listing a name that makes it easy to find"
              name="name"
              value={rentDetails.name}
              onChange={handleOnChange}
            />
          </div>

          <div className="input-box">
            <div className="input-label">Type</div>
            <div className="select-box">
              <select
                name="propertyTypeId"
                value={rentDetails.propertyTypeId}
                onChange={handleOnChange}
                className="formfield"
              >
                <option selected disabled>
                  Choose a property type
                </option>
                {propertyTypes.map((type, i) => {
                  return (
                    <option key={i} value={parseInt(type.id)}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
              <div className="arrows" />
            </div>
          </div>

          <div className="input-box">
            <div className="input-label">Property Title</div>
            <div className="select-box">
              <select
                name="title"
                value={rentDetails.title}
                onChange={handleOnChange}
                className="formfield"
              >
                <option selected disabled>
                  Choose property title
                </option>
                {propertyTitles.map((type, i) => {
                  return (
                    <option key={i} value={type.name}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
              <div className="arrows" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-label">State</div>
            <div className="select-box">
              <select
                name="state"
                className="formfield"
                value={rentDetails.state}
                onChange={(e) => {
                  // console.log(e.target.value);
                  // await getLgas(e.target.value);
                  // await getCities(e.target.value);
                  setRentDetails({
                    ...rentDetails,
                    state: e.target.value,
                  });
                }}
              >
                <option value="" selected disabled>
                  What state in Nigeria do you want the property
                </option>
                {NaijaStates.states().map((state, i) => {
                  return (
                    <option key={state.id} value={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
              <div className="arrows" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-label">Locality (Optional)</div>
            {rentDetails.state ? (
              <div className="select-box">
                <select
                  name="lga"
                  value={rentDetails.lga}
                  onChange={handleOnChange}
                  className="formfield"
                >
                  <option value="" selected disabled>
                    Choose a locality
                  </option>
                  {NaijaStates.lgas(rentDetails.state).lgas.map((lga, i) => {
                    return (
                      <option key={i} value={lga}>
                        {lga}
                      </option>
                    );
                  })}
                </select>
                <div className="arrows" />
              </div>
            ) : null}
          </div>

          <div className="input-box">
            <div className="input-label">Area (Optional)</div>
            <input
              type="text"
              className="formfield"
              placeholder=""
              name="area"
              value={rentDetails.area}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box">
            <div className="input-label">Address</div>
            <input
              type="text"
              className="formfield"
              placeholder="House No, Street, Estate"
              name="address"
              value={rentDetails.address}
              onChange={handleOnChange}
              required
            />
          </div>
          <div class="input-box">
            <div class="input-label">Description</div>
            <textarea
              type="text"
              class="formfield textarea"
              cols="10"
              placeholder="Description"
              name="description"
              value={rentDetails.description}
              onChange={handleOnChange}
            >
              {/* Description */}
            </textarea>
          </div>

          <div className="input-box">
            <div className="input-label">Rent (Per year)</div>
            <CurrencyInput
              id="input-example"
              className="formfield"
              name="price"
              placeholder="₦0.00"
              prefix="₦"
              decimalsLimit={2}
              value={price}
              onValueChange={(value, name) => setPrice(value)}
            />
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
                    rentDetails.mediafiles.filter((m) => m.isImage).length > 0
                      ? "do-upload uploaded"
                      : "do-upload"
                  }
                >
                  <input {...getInputProps()} />
                  {rentDetails.mediafiles.filter((m) => m.isImage).length >
                  0 ? (
                    <>
                      <div className="d-flex justify-content-between w-100">
                        <div>
                          <i className="far fa-check" />
                          {`${
                            rentDetails.mediafiles.filter((m) => m.isImage)
                              .length
                          }  Pictures Uploaded`}
                        </div>
                        <div>
                          <i className="fa fa-pencil-alt" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <i className="far fa-image" />
                      Upload pictures
                    </>
                  )}
                </div>
              </section>
            )}
          </Dropzone>

          <Dropzone
            accept="video/mp4"
            maxFiles={6}
            onDrop={(acceptedFiles) => grabUploadedVideoFile(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className={
                    rentDetails.mediafiles.filter((m) => m.isVideo).length > 0
                      ? "do-upload uploaded"
                      : "do-upload"
                  }
                >
                  <input {...getInputProps()} />
                  {rentDetails.mediafiles.filter((m) => m.isVideo).length >
                  0 ? (
                    <>
                      <div className="d-flex justify-content-between w-100">
                        <div>
                          <i className="far fa-check" />
                          {`${
                            rentDetails.mediafiles.filter((m) => m.isVideo)
                              .length
                          }  Videos Uploaded`}
                        </div>
                        <div>
                          <i className="fa fa-pencil-alt" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <i className="far fa-video" />
                      Upload Video
                    </>
                  )}
                </div>
              </section>
            )}
          </Dropzone>

          <div className="counter-pad">
            <div className="counter-label">Bedrooms</div>
            <div className="counter-box">
              <button className="countbtn" onClick={bedDecrement}>
                -
              </button>
              <input
                className="countbox"
                value={bedroomCounter}
                name="numberOfBedrooms"
              />
              <button className="countbtn" onClick={bedIncrement}>
                +
              </button>
            </div>
          </div>
          <div className="counter-pad">
            <div className="counter-label">Bathrooms</div>
            <div className="counter-box">
              <button className="countbtn" onClick={bathDecrement}>
                -
              </button>
              <input
                className="countbox"
                value={bathroomCounter}
                name="numberOfBathrooms"
                onChange={handleOnChange}
              />
              <button className="countbtn" onClick={bathIncrement}>
                +
              </button>
            </div>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              id="rent"
              name="manageTenantMyself"
              onChange={(e) => {
                console.log(e.target.checked);
                setRentDetails({
                  ...rentDetails,
                  sellMySelf: e.target.checked,
                });
              }}
            />
            <label htmlFor="sell" className="checktext">
              I want to manage the tenant myself
            </label>
          </div>
          <div className="checkbox">
            <input type="checkbox" id="buy" name="firstName" />
            <label htmlFor="buy" className="checktext">
              Help me manage my tenant
            </label>
            <i className="fas fa-info-circle ml-2" />
          </div>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        </form>
      ) : step == 2 ? (
        <form className="content-section mt-4">
          <h6 className="field-title mb-4 mt-2">
            What kind of tenants do you want?
          </h6>
          <div className="input-box">
            <div className="input-label">Type</div>
            <div className="select-box">
              <select
                name="tenantTypeId"
                value={rentDetails.tenantTypeId}
                onChange={handleOnChange}
                className="formfield"
              >
                <option selected disabled>
                  Choose an option
                </option>
                {tenantType.map((type, i) => {
                  return <option value={type.id}>{type.name}</option>;
                })}
              </select>
              <div className="arrows" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-label">Annual Income Bracket</div>
            {/* <input
						type="text"
						className="formfield"
						placeholder="Preferred tenant annual salary/income"
						name="tenantAnnualIncome"
						value={rentDetails.tenantAnnualIncome}
						onChange={handleOnChange}
					/> */}
            <CurrencyInput
              id="input-example"
              className="formfield"
              name="price"
              placeholder="₦0.00"
              prefix="₦"
              decimalsLimit={2}
              value={tenantAnnualIncome}
              onValueChange={(value, name) => setTenantAnnualIncome(value)}
            />
          </div>

          <h6 className="field-title mb-4 mt-2">Rent Collection</h6>
          <div className="input-box">
            <div className="input-label">
              How Frequently do you want to collect rent?
            </div>
            <div className="select-box">
              <select
                name="rentCollectionTypeId"
                value={rentDetails.rentCollectionTypeId}
                onChange={handleOnChange}
                className="formfield"
              >
                <option value="" selected disabled>
                  Choose option: Weekly, monthly, yearly
                </option>
                {rentCollection.map((type, i) => {
                  return <option value={type.id}>{type.name}</option>;
                })}
              </select>
              <div className="arrows" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-label">Your Bank</div>
            <div className="select-box">
              <select
                name="bank"
                value={rentDetails.bank}
                onChange={handleOnChange}
                className="formfield"
              >
                <option selected disabled>
                  Choose your bank
                </option>
                {banks.map((bank, index) => {
                  return <option value={bank.name}>{bank.name}</option>;
                })}
              </select>
              <div className="arrows" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-label">Your Account Number</div>
            <input
              type="text"
              className="formfield"
              placeholder="Enter your bank account number"
              name="accountno"
              value={rentDetails.accountno}
              onChange={handleOnChange}
            />
          </div>

          <div className="joint-btn mg">
            <button
              className="secondary-btn draft"
              type="submit"
              onClick={submitRentRequest}
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
            <button type="submit" className="options my-2 mt-0" onClick={close}>
              Cancel
            </button>
        </form>
      ) : null}
    </div>
  );
}

export default RentForm;
