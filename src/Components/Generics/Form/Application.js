import React, { useState, useContext, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dropzone from "react-dropzone";
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import { Link } from "@material-ui/core";
import { BuildingType, typeOfApplications } from "../../../Utilities/Enums";
import Alert from "../../../Utilities/Alert";


function Application({ clean, fix, close }) {
    const [rooms, setRooms] = useState(0);
    const [bathroom, setBathroom] = useState(0);
    const [floor, setFloors] = useState(0);
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    // Prefetched Data list
    const [buildingType, setBuildingType] = useState([]);
    const [applicationTypes, setApplicationTypes] = useState([]);
    const [states, setStates] = useState([]);
    
    const user = useContext(MainContext)
    
    console.log(user);

    
    const selectType = (type) => {
        setType(type)
    }
    
    const roomIncrease = () => {
        setRooms(rooms + 1);
    };
    const roomDecrease = () => {
        setRooms((rooms) => Math.max(rooms - 1, 1));
        // console.log(counter);
    };
    const bathRoomIncrease = () => {
        setBathroom(bathroom + 1);
    };
    const bathRoomDecrease = () => {
        setBathroom((bathroom) => Math.max(bathroom - 1, 1));
    };
    const floorIncrease = () => {
        setFloors(floor + 1);
    };
    const floorDecrease = () => {
        setFloors((floor) => Math.max(floor - 1, 1));
    };

    const userDetails = {
        firstName: user.data.user.firstName,
        middleName: "",
        lastName: user.data.user.lastName,
        email: user.data.user.email,
        mobileNumber: user.data.user.phoneNumber,
        address: "",
        state: "",
        service: "",
        fileName: "",
        fileNumber: "",
        
        building: type,
        typeofBuilding: "",
        stateofBuilding: "",
        timeforCleaning: "",
        rooms: rooms,
        bathrooms: bathroom,
        floors: floor,
        
        fixDate: "",
        fixDescription: "",
        propertyId: 0,
        applicationTypeId: 0,
    };
  
    const fetchApplicationTypes = async () => {
		try {
		  	let { data } = await Fetch("Application/types");
			// console.log("Application types: ", data);
		  	setApplicationTypes(data);
		} catch (error) {
		  console.log(error);
		}
	};
    
    const fetchBuildingTypes = async () => {
        try {
            let { data } = await Fetch('Property/types')
            // data = data.data.json();
            console.log('BuidingTypes', data)
            setBuildingType(data)
        } catch (error) {
            // console.log("building error: ", error)
        }
    }
    
    const fetchStates = async () => {
        try {
            let data = await (await fetch("http://locationsng-api.herokuapp.com/api/v1/states")).json()
            // data = data.data.json();
            console.log('States', data)
            setStates(data)
        } catch (error) {
            // console.log("states error: ", error)
        }
    }

    const handleApplicationSubmit = async ( data ) => {
        setLoading(true)
        
        if(clean) {
            data.applicationTypeId = applicationTypes.find(type => type.name == typeOfApplications.CLEAN).id
        } else if (fix) {
            data.applicationTypeId = applicationTypes.find(type => type.name == typeOfApplications.FIX).id
        } else {
            data.applicationTypeId = applicationTypes.find(type => type.name == typeOfApplications.VERIFY).id            
        }
        
        console.log({applicationTypes})
        console.log({data})
        
        // try {
        //     let res = await Fetch("Application/new", "post", data);
        //     console.log(res);
        //     if (!data.status) {
        //         setLoading(false);
        //         setErrorMessage(data.message);
        //         console.log(errorMessage);
        //         return;
        //     }
        //     if (data.status != "400") {
        //         setLoading(false);
        //         console.log(data);
        //     } else {
        //         toast.error(errorMessage)
        //         console.log(errorMessage);
        //     }
            
        // } catch (error) {
        //     setLoading(false)
        //     toast.error(error.message)
        // }
    }


    useEffect(() => {
        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth'
        // });
        
        fetchBuildingTypes();
        fetchStates();
        fetchApplicationTypes();  
    }, [])

  return (
    <>
      <ToastContainer />
      <Alert />
      
        <div className="top-section">
            <div className="back">
            <i className="fas fa-chevron-left"></i>
            <span className="backs" 
                onClick={ page > 1 ? () => { setPage(page - 1 ); } : close
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
                    <h3 className="section-title"> { clean ? "Book Cleaning Session" : fix ? "Book Repair" : "Land Search" }</h3>
                    
                    <Formik
                        enableReinitialize={true}
                        initialValues={userDetails}
                        onSubmit={ async (values, { setSubmitting }) => {
                            await handleApplicationSubmit(values)
                        }}
                    >
                        <Form>
                            { clean ? (
                                <>
                                    <h6 className="field-title">Is the building residential or commercial?</h6>
                                    <div className="d-flex justify-content-between mb-4 typeof-building">
                                        <div className={`tab ${type == BuildingType.RESIDENTIAL ? "active" : ""}`} onClick={() => selectType(BuildingType.RESIDENTIAL)}> Residential </div>
                                        <div className={`tab ${type == BuildingType.COMMERCIAL ? "active" : ""}`} onClick={() => selectType(BuildingType.COMMERCIAL)}> Commercial </div>
                                    </div>
                                    
                                    <div className="input-box">
                                        <label htmlFor="propertyId" className="input-label">What type of building is it?</label>
                                        <div className="select-box">
                                            <Field name="propertyId" as="select" className="formfield">
                                                <option>Choose an option</option>
                                                { buildingType.map((_building, index) => {
                                                    return <option key={index} value={_building.id}>{ _building.name }</option> 
                                                })}
                                            </Field>
                                            <div className="arrows"></div>
                                        </div>
                                        <ErrorMessage name="propertyId" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="stateofBuilding" className="input-label">What is the state of the building?</label>
                                        <div className="select-box">
                                            <Field name="stateofBuilding" as="select" className="formfield">
                                                <option>Choose an option</option>
                                                { buildingType.map((_building, index) => {
                                                    return <option key={index} value={_building.name}>{ _building.name }</option> 
                                                })}
                                            </Field>
                                            <div className="arrows"></div>
                                        </div>
                                        <ErrorMessage name="stateofBuilding" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="timeforCleaning" className="input-label">When do you want the cleaning done?</label>
                                        <Field name="timeforCleaning" type="date" placeholder="" className="formfield" />
                                        <ErrorMessage name="timeforCleaning" />
                                    </div>
                                    
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Rooms</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={roomDecrease}>-</button>
                                            <input className="countbox" name="rooms" value={rooms} />
                                            <button type="button" className="countbtn" onClick={roomIncrease}>+</button>
                                        </div>
                                    </div>
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Bathrooms/Toilets</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={bathRoomDecrease}>-</button>
                                            <input className="countbox" value={bathroom} />
                                            <button type="button" className="countbtn" onClick={bathRoomIncrease}>+</button>
                                        </div>
                                    </div>
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Floors</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={floorDecrease}>-</button>
                                            <input className="countbox" value={floor} />
                                            <button type="button" className="countbtn" onClick={floorIncrease}>+</button>
                                        </div>
                                    </div>
                                </>
                                
                            ) : fix ? (
                                <>
                                    <h6 className="field-title">Is the building residential or commercial?</h6>
                                    <div className="d-flex justify-content-between mb-4 typeof-building">
                                        <div className={`tab ${type == BuildingType.RESIDENTIAL ? "active" : ""}`} onClick={() => selectType(BuildingType.RESIDENTIAL)}> Residential </div>
                                        <div className={`tab ${type == BuildingType.COMMERCIAL ? "active" : ""}`} onClick={() => selectType(BuildingType.COMMERCIAL)}> Commercial </div>
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="propertyId" className="input-label">What type of building is it?</label>
                                        <div className="select-box">
                                            <Field name="propertyId" as="select" className="formfield">
                                                <option>Choose an option</option>
                                                { buildingType.map((_building, index) => {
                                                    return <option key={index} value={_building.name}>{ _building.name }</option> 
                                                })}
                                            </Field>
                                            <div className="arrows"></div>
                                        </div>
                                        <ErrorMessage name="propertyId" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="stateofBuilding" className="input-label">What is the state of the building?</label>
                                        <div className="select-box">
                                            <Field name="stateofBuilding" as="select" className="formfield">
                                                <option>Choose an option</option>
                                                { buildingType.map((_building, index) => {
                                                    return <option key={index} value={_building.name}>{ _building.name }</option> 
                                                })}
                                            </Field>
                                            <div className="arrows"></div>
                                        </div>
                                        <ErrorMessage name="stateofBuilding" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="fixDescription" className="input-label">What do you need us to fix?</label>
                                        <Field name="fixDescription" as="textarea" placeholder="An detailed explanation of what we need to do" className="formfield textarea" />
                                        <ErrorMessage name="fixDescription" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="fixDate" className="input-label">When do you want us to fix it?</label>
                                        <Field name="fixDate" type="date" placeholder="" className="formfield" />
                                        <ErrorMessage name="fixDate" />
                                    </div>
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Rooms</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={roomDecrease}>-</button>
                                            <input className="countbox" name="room" value={rooms} />
                                            <button type="button" className="countbtn" onClick={roomIncrease}>+</button>
                                        </div>
                                    </div>
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Bathrooms/Toilets</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={bathRoomDecrease}>-</button>
                                            <input className="countbox" name="bathroom" value={bathroom} />
                                            <button type="button" className="countbtn" onClick={bathRoomIncrease}>+</button>
                                        </div>
                                    </div>
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Floors</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={floorDecrease}>-</button>
                                            <input className="countbox" name="floor" value={floor} />
                                            <button type="button" className="countbtn" onClick={floorIncrease}>+</button>
                                        </div>
                                    </div>
                                </>
                            ) : ( 
                                <>
                                    <div className="input-box">
                                        <label htmlFor="firstName" className="input-label">First Name</label>
                                        <Field name="firstName" placeholder="Ezra" className="formfield" />
                                        <ErrorMessage name="firstName" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="middleName" className="input-label">Middle Name</label>
                                        <Field name="middleName" placeholder="Ezrab" className="formfield" />
                                        <ErrorMessage name="middleName" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="lastName" className="input-label">Surname</label>
                                        <Field name="lastName" placeholder="Nakamora" className="formfield" />
                                        <ErrorMessage name="lastName" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="mobileNumber" className="input-label">Mobile Number</label>
                                        <Field name="mobileNumber" placeholder="Ezra" className="formfield" />
                                        <ErrorMessage name="mobileNumber" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="email" className="input-label">Email</label>
                                        <Field name="email" type="email" placeholder="Ezra" className="formfield" />
                                        <ErrorMessage name="email" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="address" className="input-label">Address</label>
                                        <Field name="address" type="text" placeholder="Ezra" className="formfield" />
                                        <ErrorMessage name="address" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="state" className="input-label">State</label>
                                        <div className="select-box">
                                            <Field name="state" as="select" className="formfield">
                                                <option>Choose your state</option>
                                                { states.map((_state, index) => {
                                                    return <option key={index} value={_state.name}>{ _state.name }</option> 
                                                })}
                                            </Field>
                                            <div className="arrows"></div>
                                        </div>
                                        <ErrorMessage name="state" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="service" className="input-label">Choose a service</label>
                                        <div className="select-box">
                                            <Field name="service" as="select" className="formfield">
                                                <option>Certified True Copy</option>
                                            </Field>
                                            <div className="arrows"></div>
                                        </div>
                                        <ErrorMessage name="service" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="fileName" className="input-label">File Name</label>
                                        <Field name="fileName" type="text" placeholder="Ezra" className="formfield" />
                                        <ErrorMessage name="fileName" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="fileNumber" className="input-label">File Number</label>
                                        <Field name="fileNumber" type="text" placeholder="Ezra" className="formfield" />
                                        <ErrorMessage name="fileNumber" />
                                    </div>
                                </>
                            )}
                            
                            <button className="secondary-btn mt-5" type="submit"> 
                                { loading ? <Spinner /> : clean ? "Get a Quote" : "Submit & Pay" }
                            </button>
                            
                            { clean && 
                                <div className="d-flex flex-column items-center justify-content-center text-center term-condition mb-4">
                                    <p className="mb-0">By sending this request you agree to our </p>
                                    <Link to="/" className="term-condition font-weight-bold">Terms & Conditions</Link>
                                </div>
                            }
                        </Form>
                    </Formik>
                </div>
            </div>
        ) : null }
    </>
  );
}

export default Application;
