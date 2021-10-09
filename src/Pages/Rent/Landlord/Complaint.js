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

const TenantComplaint = ({ property, isTenant = false, close }) => {
    const [loading, setLoading ] = useState(false);
	const [item, setOpenItem] = useState(false);
    const [ selected, setSelected ] = useState(null);
    const [errormessage, setErrormessage] = useState("");
    const [categories, setCategories ] = useState([])
    
    const inputData = {
        categories: [
            {
                id: 100,
                name: "Structural Damage",
                subcategories: [
                    {catId: 100, id: 4, name: "Structural Damages"},
                    {catId: 100, id: 5, name: "Roof Leakage"},
                    {catId: 100, id: 6, name: "Drainage Spillage"},
                ]
            },
            {
                id: 200,
                name: "Co Tenant",
                subcategories: [
                    {catId: 200, id: 1, name: "Doemestic Violence"},
                    {catId: 200, id: 2, name: "Noise Pollution"},
                    {catId: 200, id: 3, name: "Suspected Criminal"},
                ]
            },
            {
                id: 300,
                name: "Legal Issues",
            }
        ],
    }
    	
	const openModal = () => {
		setOpenItem(!item)
	}
    
    const [complaintDetails, setComplaintDetails] = useState({
        category: 0,
        subcategory: 0,
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
        setSelected(selectedObj)
    }
	
    const getCategories = async () => {
        try {
            let data = await Fetch('Complaints/categories/list')
            console.log({data})
            setCategories(data.data)
            
        } catch (error) {
            console.log({error})
        }
    }
	
	const handleSubmit = async () => {
		setLoading(true);
        
        // complaintDetails.propertyId = property.id
        
        console.log({complaintDetails})
        
        try {
            let data = await Fetch('Complaints/Create', 'post', complaintDetails);
            console.log({data})
            
            if(!data.status) {
                setLoading(false)
                setErrormessage(data.message)
                return
            }
            
            if(data.status !== 400) {
                setLoading(false)
                toast.success("Complaint submitted successfully.")
                return
            }
            
        } catch(error) {
            console.log({error})
        }
	}
    
    console.log({property})
    useEffect(() => {
        getCategories()
    }, [])
    
    
	
	return (
		<>
			<Modal open={item} onClose={() => setOpenItem(false)}>
				<TenantComplaintView close={() => setOpenItem(false)} />
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
						<div className="col-12 my-1 complaint-tabs py-2">
							<button	 className="complaint-tab w-100" onClick={() => openModal()}>
								<h5 className="mb-0 text-black font-weight-bold">Structural Damage</h5>
								<p className="mb-0">10/04/21</p>
							</button>
						</div>
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
                                    <select name="subcategory" className="formfield" 
                                        value={complaintDetails.subcategory} 
                                        onChange={handleOnChange}
                                    >                                
                                        <option>Choose a sub category</option>
                                        {(selected.subCategories) && (
                                            selected.subCategories.map(( subcat, index ) => {
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
