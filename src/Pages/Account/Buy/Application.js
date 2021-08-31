import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../Context/MainContext";
import Fetch from "../../../Utilities/Fetch";
import Spinner from "../../../Utilities/Spinner";


function ApplicationForm() {




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
      workAddress: ""
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
      {page == 1 ? (
        <div className="modal-content">
          <div className="top-section">
            <div className="back">
              <i className="fas fa-chevron-left"></i>
              <span className="backs">Back</span>
            </div>
            <div className="logo">
              <img src="" alt="Logo" />
            </div>
          </div>
          <div className="content-section mt-4">
            <div className="schedule-title mb-4">
              7 Bedroom Mansion with Olympic size swimming Pool
            </div>
            <h3 className="section-title">Application Form</h3>
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
            <button className="secondary-btn" onClick={() => setPage(2)}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="modal-content">
          <div className="top-section">
            <div className="back">
              <i className="fas fa-chevron-left"></i>
              <span className="backs" onClick={() => setPage(1)}>
                Back
              </span>
            </div>
            <div className="logo">
              <img src="" alt="Logo" />
            </div>
          </div>
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
      )}
    </>
  );
}

export default ApplicationForm;
