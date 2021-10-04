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
    // console.log(user);
    
    const selectType = (type) => {
        setType(type)
        setUserDetails({ 
            ...userDetails, 
            buildingType: type
        })
    }
    
    const roomIncrease = () => {
        setRooms(rooms + 1);
        setUserDetails({ 
            ...userDetails, 
            numberOfBedrooms: rooms + 1
        })
    };
    const roomDecrease = () => {
        setRooms((rooms) => Math.max(rooms - 1, 1));
        setUserDetails({ 
            ...userDetails, 
            numberOfBedrooms: Math.max(rooms - 1, 1)
        })
        // console.log(counter);
    };
    const bathRoomIncrease = () => {
        setBathroom(bathroom + 1);
        setUserDetails({ 
            ...userDetails, 
            numberOfBathrooms: bathroom + 1
        })
    };
    const bathRoomDecrease = () => {
        setBathroom((bathroom) => Math.max(bathroom - 1, 1));
        setUserDetails({ 
            ...userDetails, 
            numberOfBathrooms: Math.max(bathroom - 1, 1)
        })
    };
    const floorIncrease = () => {
        setFloors(floor + 1);
        setUserDetails({ 
            ...userDetails, 
            numberOfFloors: floor + 1
        })
    };
    const floorDecrease = () => {
        setFloors((floor) => Math.max(floor - 1, 1));
        setUserDetails({ 
            ...userDetails, 
            numberOfFloors: Math.max(floor - 1, 1)
        })
    };
    
    const handleOnChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setUserDetails({
            ...userDetails,
            [ name ]: value
        })
        console.log({userDetails})
    }

    const [ userDetails, setUserDetails ] = useState({
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
        
        buildingType: "",
        buildingState: "",
        dateNeeded: "",
        numberOfBedrooms: 0,
        numberOfBathrooms: 0,
        numberOfFloors: 0,
        
        fixDate: "",
        fixDescription: "",
        propertyId: 0,
        propertyTypeId: 0,
        applicationTypeId: 0,
    });
  
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

    const handleApplicationSubmit = async () => {
        let endpoint = ""
        setLoading(true)
        
        if(clean) {
            endpoint = "Clean/request";
        } else if (fix) {
            endpoint = "Fix/request";
        } else {
            endpoint = "LandSearch/create";          
        }
        
        // console.log({clean})
        console.log({userDetails})
        
        try {
            let data = await Fetch(`${endpoint}`, "post", userDetails);
            console.log(data);
            if (!data.status) {
                setLoading(false);
                setErrorMessage(data.message);
                console.log(errorMessage);
                return;
            }
            if (data.status != "400") {
                setLoading(false);
                toast.success(data.message)
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
      {/* <ToastContainer /> */}
      {/* <Alert /> */}
      
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
                    
                
                        
                            { clean ? (
                                <>
                                    <h6 className="field-title">Is the building residential or commercial?</h6>
                                    <div className="d-flex justify-content-between mb-4 typeof-building">
                                        <div className={`tab ${type == BuildingType.RESIDENTIAL ? "active" : ""}`} onClick={() => selectType(BuildingType.RESIDENTIAL)}> Residential </div>
                                        <div className={`tab ${type == BuildingType.COMMERCIAL ? "active" : ""}`} onClick={() => selectType(BuildingType.COMMERCIAL)}> Commercial </div>
                                    </div>
                                    
                                    <div className="input-box">
                                        <div className="input-label">What type of building is it?</div>
                                        <div className="select-box">
                                            <select
                                                name="propertyTypeId"
                                                value={userDetails.propertyTypeId}
                                                onChange={handleOnChange}
                                                className="formfield"
                                            >
                                                <option>Choose an option</option>
                                                { buildingType.map((_building, index) => {
                                                    return <option key={index} value={_building.id}>{ _building.name }</option> 
                                                })}
                                            </select>
                                            <div className="arrows"></div>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">What is the state of the building?</div>
                                        <div className="select-box">
                                            <select name="buildingState"
                                                value={userDetails.buildingState}
                                                onChange={handleOnChange} 
                                                className="formfield"
                                            >
                                                    <option>Choose an option</option>
                                            </select>
                                            <div className="arrows"></div>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">When do you want the cleaning done?</div>
                                        <input name="dateNeeded" value={userDetails.dateNeeded} onChange={handleOnChange} type="date" placeholder="" className="formfield" />
                                    </div>
                                    
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Rooms</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={() => roomDecrease()}>-</button>
                                            <input className="countbox" name="rooms" value={rooms} />
                                            <button type="button" className="countbtn" onClick={() => roomIncrease()}>+</button>
                                        </div>
                                    </div>
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Bathrooms/Toilets</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={() => bathRoomDecrease()}>-</button>
                                            <input className="countbox" value={bathroom} />
                                            <button type="button" className="countbtn" onClick={() => bathRoomIncrease()}>+</button>
                                        </div>
                                    </div>
                                    <div className="counter-pad">
                                        <div className="counter-label">Number of Floors</div>
                                        <div className="counter-box">
                                            <button type="button" className="countbtn" onClick={() => floorDecrease()}>-</button>
                                            <input className="countbox" value={floor} />
                                            <button type="button" className="countbtn" onClick={() => floorIncrease()}>+</button>
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
                                        <div className="input-label">What type of building is it?</div>
                                        <div className="select-box">
                                            <select 
                                                name="propertyTypeId"
                                                value={userDetails.propertyTypeId}
                                                onChange={handleOnChange} className="formfield">
                                                    <option>Choose an option</option>
                                                    { buildingType.map((_building, index) => {
                                                        return <option key={index} value={_building.name}>{ _building.name }</option> 
                                                    })}
                                            </select>
                                            <div className="arrows"></div>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">What is the state of the building?</div>
                                        <div className="select-box">
                                            <select 
                                                name="buildingState"
                                                value={userDetails.buildingState}
                                                onChange={handleOnChange}
                                                className="formfield">
                                                    <option>Choose an option</option>
                                                    { buildingType.map((_building, index) => {
                                                        return <option key={index} value={_building.name}>{ _building.name }</option> 
                                                    })}
                                            </select>
                                            <div className="arrows"></div>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">What do you need us to fix?</div>
                                        <textarea 
                                            name="fixDescription"
                                            value={userDetails.fixDescription}
                                            onChange={handleOnChange}
                                            cols="10"
                                            placeholder="An detailed explanation of what we need to do" 
                                            className="formfield textarea">
                                                
                                        </textarea>
                                        
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">When do you want us to fix it?</div>
                                        <input 
                                            name="fixDate"
                                            value={userDetails.fixDate}
                                            onChange={handleOnChange}
                                            type="date" placeholder="" className="formfield" />
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
                                        <div className="input-label">First Name</div>
                                        <input 
                                            name="firstName" 
                                            value={userDetails.firstName}
                                            onChange={handleOnChange}
                                            placeholder="Ezra" className="formfield" />
                                    </div>
                                    
                                    <div className="input-box">
                                        <div className="input-label">Middle Name</div>
                                        <input 
                                            name="middleName"
                                            value={userDetails.middleName}
                                            onChange={handleOnChange}
                                            placeholder="Ezrab" className="formfield" />
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">Surname</div>
                                        <input 
                                            name="lastName"
                                            value={userDetails.lastName}
                                            onChange={handleOnChange}
                                            placeholder="Nakamora" className="formfield" />
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">Mobile Number</div>
                                        <input 
                                            name="mobileNumber" 
                                            value={userDetails.mobileNumber}
                                            onChange={handleOnChange}
                                            placeholder="Ezra" className="formfield" />
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">Email</div>
                                        <input 
                                            name="email"
                                            value={userDetails.email}
                                            onChange={handleOnChange}
                                            type="email" placeholder="Ezra" className="formfield" />
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">Address</div>
                                        <input 
                                            name="address"
                                            value={userDetails.address}
                                            onChange={handleOnChange}
                                            type="text" placeholder="Ezra" className="formfield" />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="state" className="input-label">State</label>
                                        <div className="select-box">
                                            <select name="state"
                                                value={userDetails.state}
                                                onChange={handleOnChange}
                                                className="formfield"
                                            >
                                                <option>Choose your state</option>
                                                { states.map((_state, index) => {
                                                    return <option key={index} value={_state.name}>{ _state.name }</option> 
                                                })}
                                            </select>
                                            <div className="arrows"></div>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">Choose a service</div>
                                        <div className="select-box">
                                            <select 
                                                name="service"
                                                value={userDetails.service}
                                                onChange={handleOnChange}
                                                className="formfield"
                                            >
                                                <option>Certified True Copy</option>
                                            </select>
                                            <div className="arrows"></div>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">File Name</div>
                                        <input 
                                            name="fileName"
                                            value={userDetails.fileName}
                                            onChange={handleOnChange}
                                            type="text" placeholder="Ezra" className="formfield" 
                                        />
                                    </div>
                                    <div className="input-box">
                                        <div className="input-label">File Number</div>
                                        <input name="fileNumber"
                                            value={userDetails.fileNumber}
                                            onChange={handleOnChange}
                                            type="text" placeholder="Ezra" className="formfield" 
                                        />
                                    </div>
                                </>
                            )}
                            
                            <button className="secondary-btn mt-5" type="submit" onClick={() => handleApplicationSubmit()}> 
                                { loading ? <Spinner /> : clean ? "Get a Quote" : "Submit & Pay" }
                            </button>
                            
                            { clean && 
                                <div className="d-flex flex-column items-center justify-content-center text-center term-condition mb-4">
                                    <p className="mb-0">By sending this request you agree to our </p>
                                    <Link to="/" className="term-condition font-weight-bold">Terms & Conditions</Link>
                                </div>
                            }
                        
                </div>
            </div>
        ) : null }
    </>
  );
}

export default Application;
