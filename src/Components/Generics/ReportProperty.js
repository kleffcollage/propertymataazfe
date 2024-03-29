import React, { useContext, useState } from 'react';
import { MainContext } from '../../Context/MainContext';
import Spinner from '../../Utilities/Spinner';
import Fetch from '../../Utilities/Fetch';
import { toast } from 'react-toastify';

export const  ReportProperty = ({property, close}) => {
    const { user } = useContext (MainContext).data;
    const [loading, setLoading] = useState(false);
    const [errormessage, setErrormessage0] = useState("")
    //const [errors, setErrors] = use
 //   const [LoggedIn, setLoggedIn] = useState(false);


    const [reportDetails, setReportDetails] = useState({
        propertyId: property.id,
        userId: 0,
        email: "",
        description: "",
        usersName: ''
    });

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setReportDetails({...reportDetails, [name]: value});
    }

    const submitReport = async (e) => {
        e.preventDefault();
        if(user){
            reportDetails.userId = user.id;
            reportDetails.email = user.email;
        }
        setLoading(true);
        // var data = {reportDetails};
        var data = await Fetch("Report/create", "post", reportDetails);
        if(!data.status) {
            setLoading(false);
            toast.error(data.message);
            return;
        }
        if (data.status != 400){
            setLoading(false);
            setReportDetails({});
            toast.success(data.message);
            close();
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="top-section">
                <div className="back">
                    <i className="fas fa-chevron-left" />
                    <span className="backs" onClick={ () => close() }> Back </span>
                </div>
                <div className="logo">
                    <img src="/asset/logo.png" alt="Logo" />
                </div>
            </div>
                <form className="content-section mt-4" onSubmit={submitReport}>
                    <div className="input-box">
                        <div className="input-label">Property Name</div>
                        <input 
                            type="text" 
                            className="formfield" 
                            placeholder=""
                            name="name"
                            value={property.name}
                            onChange={handleOnChange}
                            />
                    </div>
                    {user ? (
                        <div className="input-box">
                          <div className="input-label">User's Name</div>
                          <input
                              type="text"
                              className="formfield"
                              placeholder="Your Fullname"
                              name="userName"
                              value={`${user.firstName} ${user.lastName}`}
                              />
                        </div>
                    ) : (
                        <div>
                             <div className="input-box">
						<div className="input-label">User's Name</div>
						<input
							type="text"
							className="formfield"
							placeholder="Your Fullname"
							name="userName"
                            onChange={handleOnChange}
                            />
					</div>

                    <div className="input-box">
						<div className="input-label">Email Address</div>
						<input
							type="text"
							className="formfield"
							placeholder="Email Address"
							name="email"
                            onChange={handleOnChange}
						/>
					</div>
                        </div>
                    )}
                   
                    <div class="input-box">
						<div class="input-label">Complaint</div>
						<textarea
							type="text"
							class="formfield textarea"
							cols="10"
							placeholder="Complaint"
							name="description"
                            onChange={handleOnChange}>
							{/* Description */}
						</textarea>
					</div>

                    <button 
                    className="secondary-btn"
                    type="submit"
                    value="Submit"
                    >
                    
                    {loading ? <Spinner /> : "Submit"}
                    </button>
                </form>
        </div>
    );
}

export default ReportProperty;