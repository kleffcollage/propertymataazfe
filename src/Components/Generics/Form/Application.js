import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dropzone from "react-dropzone";
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";
import { Link } from "@material-ui/core";


function Application({ clean, close }) {
    const [rooms, setRooms] = useState(0);
    const [bathroom, setBathroom] = useState(0);
    const [floor, setFloors] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const user = useContext(MainContext)
    console.log(user);
  
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

    const [userDetails, setUserDetails] = useState({
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
    });
  
  
	const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
        console.log(userDetails);
    };
  
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const data = {
            register: userDetails
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
            <h3 className="section-title"> { clean ? "Book Cleaning Session" : "Land Search" }</h3>
            
            {clean ? (
                <>
                    <div className="input-box">
                        <div className="input-label">Is the building residential or commercial?</div>
                        <input type="text" className="formfield" placeholder="Building type" name="firstName" onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">What type of building is it?</div>
                        <div className="select-box">
                            <select className="formfield" name="state" onChange={handleOnChange} required>
                            <option>Choose an option</option>
                            </select>
                            <div className="arrows"></div>
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="input-label">What is the state of the building?</div>
                        <div className="select-box">
                            <select className="formfield" name="state" onChange={handleOnChange} required>
                            <option>Choose an option</option>
                            </select>
                            <div className="arrows"></div>
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="input-label">When do you want the cleaning done?</div>
                        <div className="select-box">
                            <select className="formfield" name="state" onChange={handleOnChange} required>
                            <option>Choose an option</option>
                            </select>
                            <div className="arrows"></div>
                        </div>
                    </div>
                    <div className="counter-pad">
                        <div className="counter-label">Number of Rooms</div>
                        <div className="counter-box">
                            <button className="countbtn" onClick={roomDecrease}>-</button>
                            <input className="countbox" value={rooms} />
                            <button className="countbtn" onClick={roomIncrease}>+</button>
                        </div>
                    </div>
                    <div className="counter-pad">
                        <div className="counter-label">Number of Bathrooms/Toilets</div>
                        <div className="counter-box">
                            <button className="countbtn" onClick={bathRoomDecrease}>-</button>
                            <input className="countbox" value={bathroom} />
                            <button className="countbtn" onClick={bathRoomIncrease}>+</button>
                        </div>
                    </div>
                    <div className="counter-pad">
                        <div className="counter-label">Number of Floors</div>
                        <div className="counter-box">
                            <button className="countbtn" onClick={floorDecrease}>-</button>
                            <input className="countbox" value={floor} />
                            <button className="countbtn" onClick={floorIncrease}>+</button>
                        </div>
                    </div>
                </>
            ) : ( 
                <>
                    <div className="input-box">
                        <div className="input-label">First Name</div>
                        <input type="text" className="formfield" placeholder="Ezra" name="firstName" value={userDetails.firstName} onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">Middle Name</div>
                        <input type="text" className="formfield" placeholder="John" name="middleName" onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">Surname</div>
                        <input type="text" className="formfield" placeholder="John" name="lastName" value={userDetails.lastName} onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">Mobile Number</div>
                        <input type="text" className="formfield" placeholder="Ezra" name="mobileNumber" value={userDetails.mobileNumber} onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">Email</div>
                        <input type="text" className="formfield" placeholder="Ezra" name="email" value={userDetails.email} onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">Address</div>
                        <input type="text" className="formfield" placeholder="John" name="address" onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">State</div>
                        <div className="select-box">
                            <select className="formfield" name="state" onChange={handleOnChange} required>
                            <option>Choose an option</option>
                            </select>
                            <div className="arrows"></div>
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="input-label">Choose a service</div>
                        <div className="select-box">
                            <select className="formfield" name="state" onChange={handleOnChange} required>
                            <option>Certified True Copy</option>
                            </select>
                            <div className="arrows"></div>
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="input-label">File Name</div>
                        <input type="text" className="formfield" placeholder="Enter your file name" name="fileName" onChange={handleOnChange} required/>
                    </div>
                    <div className="input-box">
                        <div className="input-label">File Number</div>
                        <input type="text" className="formfield" placeholder="Enter your file number" name="fileName" onChange={handleOnChange} required/>
                    </div>
                </>
            )}
            {/* <button className="secondary-btn" onClick={() => setPage(page + 1)}>
              Next
            </button> */}
            
            <button className="secondary-btn mt-5" onClick={handleSubmit}> 
                {loading ? <Spinner /> : clean ? "Get a Quote" : "Submit & Pay"}
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
