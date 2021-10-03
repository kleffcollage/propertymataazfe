import React, { useState } from 'react'
import SeeMore from '../../Pages/Account/Buy/SeeMore';
import Fetch from '../../Utilities/Fetch';
import Modal from '../../Utilities/Modal';
import Alert from '../../Utilities/Alert/index';
import Naira from "react-naira"
import RentReliefDetails from '../../Pages/Rent/RentReliefDetails';
import RequestResults from '../../Pages/Rent/RequestResults';
import TenancyDetails from '../../Pages/Rent/Landlord/TenancyDetails';

export default function SessionsCard({ data = {}, }) {
    const [ cancelModal, setCancelModal ] = useState(false)
    const [ openDetails, setOpenDetails ] = useState(false)
    const [ propertyId, setPropertyId ] = useState('')
    
    
    const openRentDetails = () => {
        setOpenDetails(prev => !prev)
    }
    // console.log({property})

    return (
        <>
            <Alert 
                showAlert={cancelModal} setShowAlert={setCancelModal} isCancel={true}     
            />
            
            {/* Tenants rental details */}
            
            {/* <Modal open={tenancyDetails} onClose={() => setTenancyDetails(false)}>
                <TenancyDetails isTenant={true} propertyId={property.id} close={() => setTenancyDetails(false)} />
            </Modal> */}
        
            <div className="col-lg-4">
                <div className="listing-cards for-request pt-4">
                    <div className="listing-info for-request">
                        <div className="title-group">
                            <div className="listing-title mb-3">{data.name}</div>
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
                            <button className="list-no-color-btn w-100"> 
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
