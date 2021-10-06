import React, { useState } from 'react'
import Fetch from '../../Utilities/Fetch';
import Modal from '../../Utilities/Modal';
import Alert from '../../Utilities/Alert/index';
import Naira from "react-naira"
import DetailsCard from '../../Pages/Account/Dashboard/Tabs/Sessions/DetailsCard';

export default function SessionsCard({ data = {}, isClean = false }) {
    const [ cancelModal, setCancelModal ] = useState(false)
    const [ openDetails, setOpenDetails ] = useState(false)
    const [ propertyId, setPropertyId ] = useState('')
    
    
    const popModal = () => {
        if(isClean) {
            setOpenDetails(!openDetails)
            return
        }
        return
    }
    // console.log({property})

    return (
        <>
            <Alert 
                showAlert={cancelModal} setShowAlert={setCancelModal} isCancel={true}     
            />
            
            {/* Clean modal details */}
            <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
                <DetailsCard details={data.property}  close={() => setOpenDetails(false)} />
            </Modal>
        
            <div className="col-lg-4">
                <div className="listing-cards for-request pt-4">
                    <div className="listing-info for-request">
                        <div className="title-group">
                            <div className="listing-title mb-3">{data.property.name}</div>
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
                            <button className="list-no-color-btn w-100" onClick={() => popModal()}> 
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
