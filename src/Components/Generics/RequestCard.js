import React, { useState } from 'react'
import SeeMore from '../../Pages/Account/Buy/SeeMore';
import Fetch from '../../Utilities/Fetch';
import Modal from '../../Utilities/Modal';
import Alert from '../../Utilities/Alert/index';
import Naira from "react-naira"
import RentReliefDetails from '../../Pages/Rent/RentReliefDetails';
import RequestResults from '../../Pages/Rent/RequestResults';
import TenancyDetails from '../../Pages/Rent/Landlord/TenancyDetails';

export default function RequestCard({ property = {}, relief= {}, seeMore, isRequest = false, isRelief = false, isForTenants = false,tenancy = null }) {
    const [ cancelModal, setCancelModal ] = useState(false)
    const [ openDetails, setOpenDetails ] = useState(false)
    const [ tenancyDetails, setTenancyDetails ] = useState(false)
    const [ requestResults, setRequestResults ] = useState(false)
    const [ propertyId, setPropertyId ] = useState('')
    const [selectedRelief, setSelectedRelief] = useState(null)
    console.log({property});
    
    const openRentDetails = () => {
        setOpenDetails(!openDetails)
        setSelectedRelief(relief);
    }
    
    const openTenancyDetails = () => {
        setTenancyDetails(prev => !prev)
    }
    
    const toggleRequests = (id) => {
        setPropertyId(id)
    }
    const openCancel = () => {
        setCancelModal(prev => !prev)
    }
    
    const incrementView = async (id) => {
		var sendData = await Fetch(`Property/addview/${id}`, "get");
		if(!sendData.status){
			// console.log(sendData.message)
			return;
		}
		if(sendData.status != 400 ){
			return
		}
	};

    const onSeeMoreClicked = async () => {
        seeMore(property.id);
        await incrementView(property.id);
    };

    return (
        <>
            <Alert 
                showAlert={cancelModal} setShowAlert={setCancelModal} isCancel={true}     
            />
        
            {/* Rent relief Modal */}
            <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
                <RentReliefDetails relief={selectedRelief} close={() => setOpenDetails(false)} />
            </Modal>
        
            {/* Property request Modal */}
            <Modal open={requestResults} onClose={() => setRequestResults(false)}>
                <RequestResults propertyId={propertyId} matches={property?.matches} theRequest={property?.comment} close={() => setRequestResults(false)} />
            </Modal>
            
            {/* Tenants rental details */}
            <Modal open={tenancyDetails} onClose={() => setTenancyDetails(false)}>
                <TenancyDetails isTenant={isForTenants} propertyId={property?.id} close={() => setTenancyDetails(false)}  tenancy={tenancy}/>
            </Modal>
        
        { isRequest  ? (
            <div className="col-lg-4">
                <div className="listing-cards for-request pt-4">
                    <div className="listing-info for-request">
                        <div className="title-group">
                            <div className="listing-title mb-3">{property?.comment}</div>
                        </div>
                        <div className="feature-group">
                            <div className="feature-sing">
                                <i className="far fa-bed" />
                                <div className="feature-title">
                                    {`${property?.numberOfBedRooms} Bedrooms`}
                                </div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-toilet" />
                                <div className="feature-title">
                                    {`${property?.numberOfBathrooms} Bathrooms`}
                                </div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-tags" />
                                <div className="feature-title"><Naira>{property?.budget}</Naira></div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-award" />
                                <div className="feature-title">
                                    { property.propertyType?.name.toLowerCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="line" /> */}
                    <div className="listing-info pt-0">
                        <div className="listing-btn">
                            <button className="list-no-color-btn" 
                                onClick={openCancel}
                            > 
                                Cancel
                            </button>
                                
                            <button
                                className="list-color-btn"
                                onClick={() => {
                                    toggleRequests(5);
                                    setRequestResults(true);
                                }}
                                disabled={property.matches.length == 0}
                            >
                                { property.matches.length == 0 
                                    ? 'No matches yet' 
                                    : `View ${property.matches.length} Matches` }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ): isRelief ? (
            <div className="col-lg-4">
                <div className="listing-cards for-relief pt-4" onClick={openRentDetails}>
                    <div className="listing-info">
                        <div className="title-group align-items-center mb-4">
                            <div className="relief-amount">
                                <h6>Relief Amount</h6>
                                <p className="mb-0"><Naira>{relief?.reliefAmount}</Naira></p>
                            </div>
                            <div className={`loan-status ${relief?.status == "COMPLETED" ? 'bg-success text-white' : ''}`}>{relief?.status}</div>                            
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="relief-amount">
                                <h6>Interest</h6>
                                <p className="mb-0">{relief?.interest}%</p>
                            </div>
                            <div className="relief-amount">
                                <h6>Monthly Instalments</h6>
                                <p className="mb-0"><Naira>{relief?.monthlyInstallment}</Naira></p>
                            </div>
                            <div className="relief-amount">
                                <h6>Total Repayment</h6>
                                <p className="mb-0"><Naira>{relief?.totalRepayment}</Naira></p>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        ) : isForTenants ? (
            <div className="col-lg-4">
                <div className="listing-cards for-request pt-4">
                    <div className="listing-info for-request">
                        <div className="title-group">
                            <div className="listing-title mb-3">{property.name}</div>
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
                    {/* <div className="line" /> */}
                    <div className="listing-info pt-0">
                        <div className="listing-btn">
                            <button className="list-no-color-btn w-100" onClick={openTenancyDetails}> 
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="col-lg-4">
                <div className="listing-cards for-request pt-4">
                    <div className="listing-info for-request">
                        <div className="title-group">
                            <div className="listing-title mb-3">{property.property?.name}</div>
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
                    {/* <div className="line" /> */}
                    <div className="listing-info pt-0">
                        <div className="listing-btn">
                            <button className="list-no-color-btn w-100" onClick={openTenancyDetails}> 
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>

    )
}
