import React, { useState } from 'react'
import SeeMore from '../../Pages/Account/Buy/SeeMore';
import Fetch from '../../Utilities/Fetch';
import Modal from '../../Utilities/Modal';
import Alert from '../../Utilities/Alert/index';
import Naira from "react-naira"
import RentReliefDetails from '../../Pages/Rent/RentReliefDetails';
import RequestResults from '../../Pages/Rent/RequestResults';
import TenancyDetails from '../../Pages/Rent/Landlord/TenancyDetails';

export default function SessionsCard({ property = {}, }) {
    const [ cancelModal, setCancelModal ] = useState(false)
    const [ openDetails, setOpenDetails ] = useState(false)
    const [ tenancyDetails, setTenancyDetails ] = useState(false)
    const [ requestResults, setRequestResults ] = useState(false)
    const [ propertyId, setPropertyId ] = useState('')
    
    
    const openRentDetails = () => {
        setOpenDetails(prev => !prev)
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
    
    // console.log({property})

    return (
        <>
        <Alert 
            showAlert={cancelModal} setShowAlert={setCancelModal} isCancel={true}     
        />
        
        {/* Rent relief Modal */}
        <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
            <RentReliefDetails close={() => setOpenDetails(false)} />
        </Modal>
        
        {/* Property request Modal */}
        <Modal open={requestResults} onClose={() => setRequestResults(false)}>
            <RequestResults propertyId={propertyId} matches={property.matches} theRequest={property.comment} close={() => setRequestResults(false)} />
        </Modal>
        
        {/* Tenants rental details */}
        <Modal open={tenancyDetails} onClose={() => setTenancyDetails(false)}>
            <TenancyDetails isTenant={true} propertyId={property.id} close={() => setTenancyDetails(false)} />
        </Modal>
        
        { isRequest  ? (
            <div className="col-lg-4">
                <div className="listing-cards for-request pt-4">
                    <div className="listing-info for-request">
                        <div className="title-group">
                            <div className="listing-title mb-3">{property.comment}</div>
                        </div>
                        <div className="feature-group">
                            <div className="feature-sing">
                                <i className="far fa-bed" />
                                <div className="feature-title">
                                    {`${property.numberOfBedRooms} Bedrooms`}
                                </div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-toilet" />
                                <div className="feature-title">
                                    {`${property.numberOfBathrooms} Bathrooms`}
                                </div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-tags" />
                                <div className="feature-title"><Naira>{property.budget}</Naira></div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-award" />
                                <div className="feature-title">
                                    { property.propertyType.name.toLowerCase()}
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
                                <p className="mb-0"><Naira>4500000</Naira></p>
                            </div>
                            <div className="loan-status">Pending</div>                            
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="relief-amount">
                                <h6>Interest</h6>
                                <p className="mb-0">15%</p>
                            </div>
                            <div className="relief-amount">
                                <h6>Monthly Instalments</h6>
                                <p className="mb-0"><Naira>797062</Naira></p>
                            </div>
                            <div className="relief-amount">
                                <h6>Total Repayment</h6>
                                <p className="mb-0"><Naira>4782372</Naira></p>
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
        ) : null}
    </>

    )
}
