import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import Dropzone from "react-dropzone";
import Alert from "../../../Utilities/Alert";
import { MainContext } from "../../../Context/MainContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Geocode from "react-geocode";
import NaijaStates from "naija-state-local-government";
import CurrencyInput from "react-currency-input-field";
// console.log({NaijaStates})

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

function SellAdd({ close, isEdit = false, existingProperty = {} }) {
  const history = useHistory();
  const { showAlert } = useContext(MainContext);
  const [drafting, setDrafting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [step, setStep] = useState("a");
  const [bedroomCounter, setBedroomCounter] = useState( existingProperty.numberOfBedrooms || 0);
  const [bathroomCounter, setBathroomCounter] = useState( existingProperty.numberOfBathrooms || 0);
  const [price, setPrice] = useState(existingProperty.price || 0);
  const [ isPublish, setIsPublish ] = useState(false);
  console.log({ existingProperty });
  console.log({ isEdit })

  // console.log(NaijaStates.states());
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

  const [data, setData] = useState({
    state: existingProperty.state ? existingProperty.state : "",
    isDraft: existingProperty.isDraft ? existingProperty.isDraft : false,
    sellMySelf: existingProperty.sellMySelf
      ? existingProperty.sellMySelf
      : false,
    helpMeSell: false,
    mediafiles: [],
    longitude: existingProperty.longitude ? existingProperty.longitude : 0,
    latitude: existingProperty.latitude ? existingProperty.latitude : 0,
  });

  const listingDetails = {
    name: existingProperty.name ? existingProperty.name : "",
    title: existingProperty.title ? existingProperty.title : "",
    address: existingProperty.address ? existingProperty.address : "",
    state: existingProperty.state ? existingProperty.state : "",
    lga: existingProperty.lga ? existingProperty.lga : "",
    area: existingProperty.area ? existingProperty.area : "",
    description: existingProperty.description
      ? existingProperty.description
      : "",
    sellMySelf: false,
    price: existingProperty.price ? existingProperty.price : price,
    numberOfBedrooms: existingProperty.numberOfBedrooms
      ? existingProperty.numberOfBedrooms
      : bedroomCounter,
    numberOfBathrooms: existingProperty.numberOfBathrooms
      ? existingProperty.numberOfBathrooms
      : bathroomCounter,
    isDraft: false,
    isActive: existingProperty.isActive ? existingProperty.isActive : true,
    isForRent: existingProperty.isForRent ? existingProperty.isForRent : false,
    isForSale: existingProperty.isForSale ? existingProperty.isForSale : true,
    propertyTypeId: existingProperty.propertyTypeId
      ? existingProperty.propertyTypeId
      : 0,
    mediafiles: [],
    longitude: 0,
    latitude: 0,
  };
  // FIX: existingProperty.propertyType ? propertyTypes && propertyTypes.first(t => t.name == existingProperty.propertyType).id : 0,

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyTitles, setPropertyTitles] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [cities, setCities] = useState([]);

  const bedIncrement = (e) => {
    e.preventDefault();
    setBedroomCounter(bedroomCounter + 1);
  };

  const bedDecrement = (e) => {
    e.preventDefault();
    setBedroomCounter((bedroomCounter) => Math.max(bedroomCounter - 1, 1));
  };

  const bathIncrement = (e) => {
    e.preventDefault();
    setBathroomCounter(bathroomCounter + 1);
  };

  const bathDecrement = (e) => {
    e.preventDefault();
    setBathroomCounter((bathroomCounter) => Math.max(bathroomCounter - 1, 1));
  };

  const currentStep = async () => {
    if (step == "a") {
      setStep("b");
      return;
    }
    if (step == "b") {
      close(true);
      history.push("/sell");
      return;
    }
  };

  const grabUploadedFile = (uploadedFiles) => {
    console.log({uploadedFiles});
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
    setData({
      ...data,
      mediafiles: [...data.mediafiles, newMedia],
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

  const getLongAndLat = async (address) => {
    const { results } = await Geocode.fromAddress(address);
    setData({
      ...data,
      latitude: results[0].geometry.location.lat,
      longitude: results[0].geometry.location.lng,
    });
    console.log(results);
  };

  const updateListingDetails = async (values) => {
    if (values.mediafiles.length == 0) {
      toast.info("Please upload at least one image of your property");
      return;
    }

    values.id = existingProperty.id;
    values.isDraft = isPublish ? false : true

    try {
      var response = await Fetch("Property/update", "post", values);
      console.log(response);

      if (!response.status) {
        setLoading(false);
        setErrormessage(response.message);
        toast.error(response.message);
        return;
      }
      if (response.status != 400) {
        setLoading(false);
        // setListingDetails({});
        close(true);
        toast.success("Property successfully updated.");
        history.go(0);
        // history.push("/sell");
        await currentStep();
        return;
      }
      handleValidationErrors(response.errors);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const createListingDetails = async (values) => {
    if (values.mediafiles.length == 0) {
      toast.info("Please upload at least one image of your property");
      setLoading(false);
      return;
    }
    try {
      var response = await Fetch("Property/create", "post", values);
      console.log(response);

      if (!response.status) {
        setLoading(false);
        setErrormessage(response.message);
        toast.error(response.message);
        return;
      }
      if (response.status != 400) {
        setLoading(false);
        // setListingDetails({});
        close(true);
        toast.success("Property Successfully added.");
        history.push("/sell");
        // history.push("/sell");
        await currentStep();
        return;
      }
      handleValidationErrors(response.errors);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submitListingDetails = async (values) => {
    console.log({ listingDetails });
    setLoading(true);
    // await getLongAndLat(listingDetails.address);
    // console.log(listingDetails);
    values.price = price
    values.sellMySelf = data.sellMySelf;
    values.state = data.state;
    values.isDraft = data.isDraft;
    values.isForSale = true;
    values.mediafiles = data.mediafiles;
    values.numberOfBathrooms = bathroomCounter;
    values.numberOfBedrooms = bedroomCounter;

    console.log({ values });

    if (existingProperty.name) {
      await updateListingDetails(values);
      return;
    }
    await createListingDetails(values);
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

  // TODO: provide user option to toggle draft

  const submitListingToDraft = async (values) => {
    setDrafting(true);
    values.price = price
    values.sellMySelf = data.sellMySelf;
    values.state = data.state;
    values.isDraft = data.isDraft;
    values.isForSale = false;
    values.mediafiles = data.mediafiles;
    values.numberOfBathrooms = bathroomCounter;
    values.numberOfBedrooms = bedroomCounter;

    console.log({ values });

    if (existingProperty.name) {
      await updateListingDetails(values);
      return;
    }

    try {
      var response = await Fetch("Property/create", "post", values);
      console.log(response);
      if (!response.status) {
        setDrafting(false);
        setErrormessage(response.message);
        return;
      }
      if (response.status != 400) {
        setDrafting(false);
        // listingDetails = {};
        toast.success("Property saved to draft.");
        history.push("/sell/drafts");
      }
      handleValidationErrors(response.errors);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPropertyTypes();
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
      {/* <Alert /> */}
      <div className="top-section">
        <div className="back">
          <i className="fas fa-chevron-left mr-1" />
          <span
            className="backs"
            onClick={
              step == "b"
                ? () => {
                    setStep("a");
                  }
                : close
            }
          >
            Back
          </span>
        </div>
      </div>

      <Formik
        initialValues={listingDetails}
        onSubmit={async (values, { setSubmitting }) => {
          data.price = price;
          if (drafting) {
            await submitListingToDraft(values);
            return;
          }
          await submitListingDetails(values);
          // console.log({values})
          // alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          {step == "a" ? (
            <div className="content-section mt-4">
              {/* {errors ? (
                <div className="text-center mb-2">
                  <span className="text-danger text-center">
                    Please Check.... One or More Field is Incorrect
                  </span>
                </div>
              ) : null} */}

              <div className="input-box">
                <label htmlFor="name" className="input-label">
                  Name
                </label>
                <Field
                  name="name"
                  placeholder="Give your listing a name that makes it easy to find"
                  className="formfield"
                  maxLength={50}
                />
                <ErrorMessage name="name" />
              </div>

              <div className="input-box">
                <label htmlFor="propertyTypeId" className="input-label">
                  Type
                </label>
                <div className="select-box">
                  <Field
                    name="propertyTypeId"
                    as="select"
                    className="formfield"
                  >
                    <option> Choose a property type </option>
                    {propertyTypes.map((type, i) => {
                      return (
                        <option key={i} value={type.id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Field>
                  <div className="arrows"></div>
                </div>
                <ErrorMessage name="propertyTypeId" />
              </div>

              <div className="input-box">
                <label htmlFor="title" className="input-label">
                  Property Title
                </label>
                <div className="select-box">
                  <Field name="title" className="formfield" as="select">
                    <option> Choose a property title </option>
                    {propertyTitles.map((type, i) => {
                      return (
                        <option key={i} value={type.name}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Field>
                  <div className="arrows"></div>
                </div>
                <ErrorMessage name="title" />
              </div>

              <div className="input-box">
                <label htmlFor="state" className="input-label">
                  State
                </label>
                <div className="select-box">
                  <Field
                    name="state"
                    as="select"
                    value={data.state}
                    className="formfield"
                    onChange={(e) => {
                      setData({
                        ...data,
                        state: e.target.value,
                      });
                    }}
                  >
                    <option disabled>
                      {" "}
                      What state in Nigeria do you want the property{" "}
                    </option>
                    {NaijaStates.states().map((state, i) => {
                      return (
                        <option key={i} value={state}>
                          {state}
                        </option>
                      );
                    })}
                  </Field>
                  <div className="arrows"></div>
                </div>
                <ErrorMessage name="state" />
              </div>

              <div className="input-box">
                <label htmlFor="lga" className="input-label">
                  Locality (Optional)
                </label>
                {data.state ? (
                  <>
                    <div className="select-box">
                      <Field name="lga" as="select" className="formfield">
                        <option>Choose an locality</option>
                        {NaijaStates.lgas(data.state).lgas.map((lga, i) => {
                          return (
                            <option key={i * 2} value={lga}>
                              {lga}
                            </option>
                          );
                        })}
                      </Field>
                      <div className="arrows"></div>
                    </div>
                    <ErrorMessage name="lga" />
                  </>
                ) : null}
              </div>

              <div className="input-box">
                <label htmlFor="area" className="input-label">
                  Area (Optional)
                </label>
                <Field
                  name="area"
                  placeholder="Your area"
                  className="formfield"
                  maxLength={15}
                />
                <ErrorMessage name="area" />
              </div>

              <div className="input-box">
                <label htmlFor="address" className="input-label">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  placeholder="House No, Street, estate number"
                  className="formfield"
                />
                <ErrorMessage name="address" />
              </div>

              <div className="input-box">
                <label htmlFor="description" className="input-label">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Description"
                  className="formfield textarea"
                  maxLength={250}
                />
                <ErrorMessage name="description" />
              </div>
              { isEdit ? null : (
                <>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="sell"
                      name="sellMySelf"
                      onChange={(e) => {
                        setData({
                          ...data,
                          sellMySelf: e.target.checked,
                        });
                      }}
                      disabled={ !data.helpMeSell ? false : true }
                    />
                    <label htmlFor="sellMySelf" className="checktext">
                      I want to sell myself
                    </label>
                  </div>

                  <div className="checkbox">
                    <input 
                      type="checkbox" 
                      id="buy" 
                      name="helpMeSell"
                      onChange={(e) => {
                        setData({
                          ...data,
                          helpMeSell: e.target.checked,
                        });
                      }}
                      disabled={ !data.sellMySelf ? false : true }
                    />
                    <label htmlFor="buy" className="checktext">
                      Help me sell
                    </label>
                    <i
                      className="fas fa-info-circle ml-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="When we help you sell, your property is listed as verified."
                    />
                  </div>
                </>
              )}

              <button className="secondary-btn" onClick={currentStep}>
                Next
              </button>
            </div>
          ) : step == "b" ? (
            <div className="content-section mt-4">
              <div className="input-box">
                <label htmlFor="price" className="input-label">
                  Price
                </label>
                {/* <Field
                  name="price"
                  type="text"
                  placeholder="₦0.00"
                  className="formfield"
                />
                <ErrorMessage name="price" /> */}
                <CurrencyInput
                  id="input-example"
                  className="formfield"
                  name="price"
                  placeholder="₦0.00"
                  defaultValue={listingDetails.price}
                  prefix="₦"
                  decimalsLimit={2}
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
                        data.mediafiles.filter((m) => m.isImage).length > 0
                          ? "do-upload uploaded"
                          : "do-upload"
                      }
                    >
                      <input {...getInputProps()} />
                      {data.mediafiles.filter((m) => m.isImage).length > 0 ? (
                        <>
                          <div className="d-flex justify-content-between w-100">
                            <div>
                              <i className="far fa-check" />
                              {`${
                                data.mediafiles.filter((m) => m.isImage).length
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
                        data.mediafiles.filter((m) => m.isVideo).length > 0
                          ? "do-upload uploaded"
                          : "do-upload"
                      }
                    >
                      <input {...getInputProps()} />
                      {data.mediafiles.filter((m) => m.isVideo).length > 0 ? (
                        <>
                          <div className="d-flex justify-content-between w-100">
                            <div>
                              <i className="far fa-check" />
                              {`${
                                data.mediafiles.filter((m) => m.isVideo).length
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
                          Upload Videos
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
                  />
                  <button className="countbtn" onClick={bathIncrement}>
                    +
                  </button>
                </div>
              </div>
              <div className="my-4 d-flex align-items-center">
                <label for="toggle" className="toggle-label">Publish</label>
                <label className="switch ml-2">
                  <input type="checkbox" onChange={(e) => { setIsPublish(e.target.checked)}} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="joint-btn mg">
                {/* <button
                  className="no-color-btn draft"
                  type="submit"
                  onClick={() => {
                    setData({ ...data, isDraft: true });
                  }}
                >
                  {drafting ? (
                    <Spinner color={"primary"} />
                  ) : existingProperty.name ? (
                    "Update draft"
                  ) : (
                    "Save to Draft"
                  )}
                </button> */}
                <button type="button" className="no-color-btn" onClick={close}>
                  Cancel
                </button>

                <button className="color-btn draft" type="submit">
                  {loading ? (
                    <Spinner />
                  ) : existingProperty.name ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </button>
                
              </div>
              
            </div>
          ) : null}
        </Form>
      </Formik>
    </div>
  );
}

export default SellAdd;
