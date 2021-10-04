import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Spinner from "../../../Utilities/Spinner";
import Naira from "react-naira"

const RequestPay = ({ close }) => {
    const [loading, setLoading ] = useState(false);
    const [ property, setProperty ] = useState([]);
    
    // console.log({ property })
    const rentDetails = {
        collectionType: "",
        bank: "",
        accountno: ""
    }
    
    const handleSubmit = () => {
        
    }
    
	return (
		<>
        
            <div className="top-section">
				<div className="back">
					<i className="fas fa-chevron-left mr-2"></i>
					<span className="backs" onClick={close}>
						Back
					</span>
				</div>
			</div>
            
            <div className="modal-content applied">
                <div className="col-12 my-1 px-3 tenancy-payment">
                    <div className="mt-4 mb-5 d-flex flex-column align-items-center">
                        <h6 className="gray-sub-title">Total rent Remitted</h6>
                        <h4 className="total-repayment"><Naira>4500000</Naira></h4>
                    </div>
                    
                    <div className="mt-4 mb-5 upcoming-pay-wrap">
                        <h6 className="text-justified text-black mb-3">Upcoming Remittance</h6>
                        <div className="d-flex flex-column">
                            <div className="d-flex record-title upcoming-pay p-2 justify-content-between">
                                <p className="mb-0"><Naira>797062</Naira></p>
                                <p className="mb-0">30 Jun 2021</p>
                            </div>
                            <button className="list-color-btn py-4 w-100 mt-3" type="button" disabled> Request Payment</button>
                        </div>
                    </div>
                    
                    <Formik
                        initialValues={rentDetails}
                        onSubmit={async (values, { setSubmitting }) => {
                        await handleSubmit(values);
                        // console.log({values})
                        // alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        <Form>
                            <h6 className="field-title mb-4 mt-2">Rent Collection</h6>
                            <div className="input-box">
                                <label
                                    htmlFor="collectionType"
                                    className="input-label">
                                    How Frequently do you want to collect rent?
                                </label>
                                <div className="select-box">
                                    <Field
                                        name="collectionType"
                                        as="select"
                                        className="formfield"
                                    >
                                        <option>Choose an option</option>
                                        <option>Single</option>
                                        <option>Married</option>
                                        <option>Divorced</option>
                                    </Field>
                                    <div className="arrows"></div>
                                </div>
                                <ErrorMessage name="collectionType" />
                            </div>
                            <div className="input-box">
                                <label
                                    htmlFor="bank"
                                    className="input-label">
                                    Your Bank
                                </label>
                                <div className="select-box">
                                    <Field
                                        name="bank"
                                        as="select"
                                        className="formfield"
                                    >
                                        <option>Choose an option</option>
                                        <option>Single</option>
                                        <option>Married</option>
                                        <option>Divorced</option>
                                    </Field>
                                    <div className="arrows"></div>
                                </div>
                                <ErrorMessage name="bank" />
                            </div>
                            <div className="input-box">
                                <label htmlFor="accountno" className="input-label">
                                    Your Account Number
                                </label>
                                <Field name="accountno" type="text" className="formfield"
                                />
                                <ErrorMessage name="accountno" />
                            </div>
                            
                            <button className="secondary-btn" type="submit" disabled>
                                Update
                            </button>
                        </Form>
                    </Formik>
                    
                    <div className="mt-4 mb-5 pay-history-wrap">
                        <h6 className="text-justified text-black mb-4">Payment History</h6>
                        <div className="d-flex flex-column pay-history">
                            <div className="d-flex justify-content-between">
                                <p className="mb-0 text-success font-weight-bold">Rent Remittance</p>
                                <p className="mb-0 text-black font-weight-bold"><Naira>797062</Naira></p>
                            </div>
                            <div className="d-flex py-1 justify-content-between">
                                <p className="mb-0">23 Apr 2021</p>
                                <p className="mb-0">GTBank Account</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
			</div>
		</>
	);
};

export default RequestPay;
