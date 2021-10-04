import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Spinner from "../../../Utilities/Spinner";
import Naira from "react-naira"
import TenantComplaintView from "./ComplaintsView";

const TenantComplaint = ({ isTenant = false, close }) => {
    const [loading, setLoading ] = useState(false);
    const [ property, setProperty ] = useState([]);
	const [item, setOpenItem] = useState(false)
    
    // console.log({ property })
	
	const openModal = () => {
		setOpenItem(!item)
	}
	
	const complaintDetails = {
		category: "",
		subcategory: "",
		comment: ""
	}
	
	const handleSubmit = () => {
		
	}
	
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
					<Formik
                        initialValues={complaintDetails}
                        onSubmit={async (values, { setSubmitting }) => {
                        await handleSubmit(values);
                        // console.log({values})
                        // alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        <Form>
							<div className="input-box">
                                <label
                                    htmlFor="category"
                                    className="input-label">
                                    Choose a category
                                </label>
                                <div className="select-box">
                                    <Field
                                        name="category"
                                        as="select"
                                        className="formfield"
                                    >
                                        <option>Choose an option</option>
                                        <option>Structural Damage</option>
                                        <option>Legal Issues</option>
                                        <option>Co-tenants</option>
                                    </Field>
                                    <div className="arrows"></div>
                                </div>
                                <ErrorMessage name="category" />
                            </div>		
							<div className="input-box">
                                <label
                                    htmlFor="subcategory"
                                    className="input-label">
                                    Choose a sub category
                                </label>
                                <div className="select-box">
                                    <Field
                                        name="subcategory"
                                        as="select"
                                        className="formfield"
                                    >
                                        <option>Choose a sub category</option>
                                        <option>Single</option>
                                        <option>Married</option>
                                    </Field>
                                    <div className="arrows"></div>
                                </div>
                                <ErrorMessage name="subcategory" />
                            </div>
							<div className="input-box">
								<label htmlFor="comment" className="input-label">Comment</label>
								<Field name="comment" as="textarea" placeholder="Provide details as regards this complaint that will help us understand the issue better." className="formfield textarea" />
								<ErrorMessage name="comment" />
							</div>	
							
							<button className="secondary-btn" type="submit">
                                Submit
                            </button>
						</Form>
					</Formik>
				</>
			}
		</>
	);
};

export default TenantComplaint;
