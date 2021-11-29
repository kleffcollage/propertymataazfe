import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"
import SelectField from "./SelectField";
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Spinner from "../../../Utilities/Spinner";
import Naira from "react-naira"
import TenantComplaintView from "./ComplaintsView";
import { Box } from "@material-ui/core";

const TenantComplaint = ({ property, isTenant = false, close }) => {
    const [loading, setLoading ] = useState(false);
	const [item, setOpenItem] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(50)
    const [ selected, setSelected ] = useState(null);
    const [errormessage, setErrormessage] = useState("");
    const [categories, setCategories ] = useState([]);
    const [complaintsList, setComplaintsList ] = useState([]);
    const [selectedComplaint, setSelectedComplaint ] = useState(null);
    	
	const openModal = (complaint) => {
        setSelectedComplaint(complaint)
		setOpenItem(!item)
	}
    
    const [complaintDetails, setComplaintDetails] = useState({
        // category: 0,
        complaintsSubCategoryId: 0,
        comment: "",
        propertyId: property ? property.id : 0,
    });
    
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setComplaintDetails({
            ...complaintDetails,
            [name]: value
        })
    }
    
    const setSelectedCategory = id => {
        let selectedObj = categories.filter(item => item.id == id);
        setSelected(selectedObj[0])
    }
	
    const getCategories = async () => {
        try {
            let data = await Fetch('Complaints/categories/list')
            setCategories(data.data)
        } catch (error) {
            console.error({error})
        }
    }
    const getLandlordComplaints = async () => {
        
        try {
            setLoading(true)
            let data = await Fetch(`Complaints/property/${property.id}/list?offset=${offset}&limit=${limit}`)
            // console.log({data})
            setComplaintsList(data.data.value)
            setLoading(false)
            
        } catch (error) {
            console.error({error})
        }
    }
	
	const handleSubmit = async () => {
		setLoading(true);
        // complaintDetails.propertyId = property.id
        try {
            let data = await Fetch('Complaints/Create', 'post', complaintDetails);
            if(!data.status) {
                setLoading(false)
                setErrormessage(data.message)
                return
            }
            if(data.status !== 400) {
                setLoading(false)
                toast.success("Complaint submitted successfully.")
                close();
                return
            }
            
        } catch(error) {
            console.error({error})
        }
	}
    
    // console.log({property})
    useEffect(() => {
        getCategories()
        getLandlordComplaints()
        
    }, [])
    
    
	
	return (
		<>
			<Modal open={item} onClose={() => setOpenItem(false)}>
				<TenantComplaintView complaint={selectedComplaint} close={() => setOpenItem(false)} />
			</Modal>
			
            <div className="top-section">
				<div className="back">
					<i className="fas fa-chevron-left mr-2"></i>
					<span className="backs" onClick={close}>
						Back
					</span>
				</div>
			</div>
			
            { !isTenant ?
				<>
					<div className="modal-content applied">
                        { loading 
                            ? (
                                <Box flexDirection="row" justifyContent="center" width="100">
                                    <Spinner size="35" color="primary" />
                                </Box>
                            ) 
                            : complaintsList && complaintsList.map((complaint, index) => {
                                return (
                                    <div className="col-12 my-1 complaint-tabs py-2" key={index}>
                                        <button	 className="complaint-tab w-100" onClick={() => openModal(complaint)}>
                                            <h5 className="mb-0 text-black font-weight-bold">{ complaint.complaintsCategory }</h5>
                                            <p className="mb-0">10/04/21</p>
                                        </button>
                                    </div>
                                )
                            })
                        }
					</div>
				</>
				
			: 
				<>
					<div className="input-box">
                        <div
                            className="input-label">
                            Choose a category
                        </div>
                        <div className="select-box">
                            <select 
                                name="category" 
                                className="formfield" 
                                value={complaintDetails.category} 
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value)
                                }}
                            >                                           
                                <option>Choose a category </option>
                                { categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.id}> {category.name} </option>                                                
                                    )
                                })}
                            </select>
                            <div className="arrows"></div>
                        </div>
                    </div>	
                    
                    { selected && (
                        <>
                            <div className="input-box">
                                <div className="input-label">
                                    Choose a sub category
                                </div>
                                <div className="select-box">                                    
                                    <select name="complaintsSubCategoryId" className="formfield" 
                                        value={complaintDetails.complaintsSubCategoryId} 
                                        onChange={handleOnChange}
                                    >                                
                                        <option>Choose a sub category</option>
                                        {(selected.complaintsSubCategories) && (
                                            selected.complaintsSubCategories.map(( subcat, index ) => {
                                                return (
                                                    <option key={index} value={subcat.id}> {subcat.name} </option>
                                                )
                                            })  
                                        )}
                                    </select>
                                    <div className="arrows"></div>
                                </div>
                            </div>
                            <div className="input-box">
                                <div className="input-label">Comment</div>
                                <textarea 
                                    name="comment" 
                                    value={complaintDetails.comment}
                                    onChange={handleOnChange} 
                                    placeholder="Provide details as regards this complaint that will help us understand the issue better." 
                                    className="formfield textarea"></textarea>
                            </div>
                        </>
                    )}
                    
					<button className="secondary-btn" type="submit" onClick={() => handleSubmit()}>
                        { loading ? <Spinner /> : 'Submit'}
                    </button>
				</>
			}
		</>
	);
};

export default TenantComplaint;
