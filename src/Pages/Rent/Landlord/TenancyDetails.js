import React, { useState, useEffect } from "react";
import Fetch from "../../../Utilities/Fetch";
import Modal from "../../../Utilities/Modal";
import { toast } from "react-toastify";
import { Statuses } from "../../../Utilities/Enums";
import Spinner from "../../../Utilities/Spinner";
import Naira from "react-naira"
import { HiBadgeCheck } from "react-icons/hi";
import { FaMoneyBillWave } from "react-icons/fa"
import { FaReceipt } from "react-icons/fa"
import { GrDocumentText } from "react-icons/gr"
import { FaRecycle, FaHouseDamage } from "react-icons/fa"
import Documentation from "../../Account/Buy/Documents";
import Reciept from "../../Account/Buy/Receipt";
import RequestPay from "./RequestPay";
import TenantComplaint from "./Complaint";
import ReliefForm from "../ReliefForm";

const TenancyDetails = ({ propertyId, isTenant = false, close }) => {
    const [loading, setLoading ] = useState(false);
    const [ property, setProperty ] = useState([]);
    const [agreement, setOpenAgreement ] = useState(false);
    const [complaint, setOpenComplaint ] = useState(false);
    const [payment, setOpenPayment ] = useState(false);
    const [relief, setOpenRelief ] = useState(false);
    const [terminate, setOpenTerminate] = useState(false);
    const [receipt, setOpenReceipt ] = useState(false);
    const [renewTenancy, setRenewTenancy ] = useState(false);
    
    // console.log({ property })
    
    const openModal = (term) => {
        switch (term) {
            case 'agreement':
                setOpenAgreement(!agreement)
                break;
                
            case 'complaint':
                setOpenComplaint(!complaint)
                break;
                
            case 'payment':
                setOpenPayment(!payment)
                break;
                
            case 'rentRelief':
                setOpenRelief(!relief)
                break;
                
            case 'terminateTenancy':
                setOpenTerminate(!terminate)
                break;
                
            case 'receipt':
                setOpenReceipt(!receipt)
                break;
                
            case 'renewTenancy':
                setRenewTenancy(!renewTenancy)
                break;
        
            default:
                break;
        }
        // setOpenAgreement(!agreement)
    }
    
    const fetchProperty = async () => {
        try {
            const data = await Fetch(`Property/get/6`);
            console.log({data});
            if(!data.status) {
                console.error(data);
                return;
            }
            if (data.status != 400) {
                setLoading(true);
                setProperty(data.data)
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchProperty();
    }, [])
	
	return (
		<>
            {/* Modal for Complaint */}
            <Modal open={complaint} onclose={() => setOpenComplaint(false)}>
                <TenantComplaint property={property} isTenant={isTenant} close={() => setOpenComplaint(false)} />
            </Modal>
            
            {/* Modal for documentation/agreement */}
            <Modal open={agreement} onclose={() => setOpenAgreement(false)}>
                <Documentation property={property} isRent={true} close={() => setOpenAgreement(false)} />
            </Modal>
            
            {/* Modal for relief */}
            <Modal open={relief} onclose={() => setOpenRelief(false)}>
                <ReliefForm property={property} close={() => setOpenRelief(false)} />
            </Modal>
            
            {/* Modal for Terminate Tenancy */}
            {/* <Modal open={relief} onclose={() => setOpenRelief(false)}>
                <ReliefForm property={property} close={() => setOpenRelief(false)} />
            </Modal> */}
            
            {/* Modal for receipt */}
            <Modal width="60%" open={receipt} onclose={() => setOpenReceipt(false)}>
                <Reciept property={property}  close={() => setOpenReceipt(false)} />
            </Modal>
            
            {/* Modal for payment */}
            <Modal open={payment} onclose={() => setOpenPayment(false)}>
                <RequestPay close={() => setOpenPayment(false)} />
            </Modal>
        
            <div className="top-section">
				<div className="back">
					<i className="fas fa-chevron-left mr-2"></i>
					<span className="backs" onClick={close}>
						Back
					</span>
				</div>
			</div>
            
            <div className="modal-content applied">
                <div className="col-12 my-1">
                    <div className="listing-cards" style={{ 'minHeight': '40rem' }}>
                        <div className="listing-cover-img">
                            <img
                                src={
                                    property && property.mediaFiles && property.mediaFiles.length > 0
                                        ? property.mediaFiles[0].url
                                        : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                                }
                                alt={property.name}
                            />
                            <div className="listing-location">{property.area ? property.area : property.state }</div>
                        </div>
                        
                        <div className="listing-info px-3">
                            <div className="title-group mb-3">
                                <div className="listing-title ">{property.name}</div>
                                { !property.sellMyself &&
                                    <HiBadgeCheck className="badge-verified" />
                                }
                            </div>
                            <div className="feature-group">
                                <div className="feature-sing w-100">
                                    <i className="far fa-calendar" />
                                    <div className="feature-title w-100">
                                        Next rent is due in 365 Days
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-3 mt-4 complaints-tab-wrap">
                            <button className="d-flex align-items-center document-wrap w-100 my-3 py-2 px-3" onClick={() => openModal("complaint")}>
								<div className="icon"> <FaHouseDamage /> </div>
								<div className="item ml-3">
									<p className="mb-0">Complaint</p>
								</div>
							</button>
                            
                            { isTenant 
                                ? <>
                                    <button className="d-flex align-items-center document-wrap w-100 my-3 py-2 px-3" onClick={() => openModal("rentRelief")}>
                                        <div className="icon"> <FaMoneyBillWave /> </div>
                                        <div className="item ml-3">
                                            <p className="mb-0">Rent Relief</p>
                                        </div>
                                    </button>
                                    <button className="d-flex align-items-center document-wrap w-100 my-3 py-2 px-3" onClick={() => openModal("terminateTenancy")}>
                                        <div className="icon"> <FaMoneyBillWave /> </div>
                                        <div className="item ml-3">
                                            <p className="mb-0">Terminate Tenancy</p>
                                        </div>
                                    </button>
                                </>
                                
                                : <>
                                    <button className="d-flex align-items-center document-wrap w-100 my-3 py-2 px-3" onClick={() => openModal("payment")}>
                                        <div className="icon"> <FaMoneyBillWave /> </div>
                                        <div className="item ml-3">
                                            <p className="mb-0">Payment</p>
                                        </div>
                                    </button>
                                
                                </>
                            }
                            
                            <button className="d-flex align-items-center document-wrap w-100 my-3 py-2 px-3" onClick={() => openModal("receipt")}>
								<div className="icon"> <FaReceipt /> </div>
								<div className="item ml-3">
									<p className="mb-0">Receipts</p>
								</div>
							</button>
                            <button className="d-flex align-items-center document-wrap w-100 my-3 py-2 px-3" onClick={() => openModal("agreement")}>
								<div className="icon"> <GrDocumentText /> </div>
								<div className="item ml-3">
									<p className="mb-0">Tenancy Agreement</p>
								</div>
							</button>
                            <button className="d-flex align-items-center document-wrap w-100 my-3 py-2 px-3" onClick={() => openModal("renewTenancy")} disabled>
								<div className="icon"> <FaRecycle /> </div>
								<div className="item ml-3">
									<p className="mb-0">Renew Tenancy</p>
								</div>
							</button>
                        </div>
                    </div>
                </div>
			</div>
		</>
	);
};

export default TenancyDetails;
