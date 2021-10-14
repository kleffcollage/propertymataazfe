import React, { useState } from 'react'
import Fetch from '../../Utilities/Fetch';
import Modal from '../../Utilities/Modal';
import Alert from '../../Utilities/Alert/index';
import Naira from "react-naira"
import moment from 'moment';
import DetailsCard from '../../Pages/Account/Dashboard/Tabs/Sessions/DetailsCard';

export default function SessionsCard({ data = {}, isClean = false, isLandSearch = false, }) {
    const [ cancelModal, setCancelModal ] = useState(false)
    const [ openDetails, setOpenDetails ] = useState(false)
    const [ propertyId, setPropertyId ] = useState('')
    
    const formattedDate = moment(data.dateNeeded).format("Do MMMM YYYY")
    // console.log({formattedDate})
    
    const popModal = () => {
        if(isClean) {
            setOpenDetails(!openDetails)
            return
        }
        return
    }
    console.log({ data })

    return (
        <>
            <Alert 
                showAlert={cancelModal} setShowAlert={setCancelModal} isCancel={true}     
            />
            
            {/* Clean modal details */}
            <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
                <DetailsCard details={data}  close={() => setOpenDetails(false)} />
            </Modal>
            
            { isLandSearch ? 
                    <div className="col-lg-4">
                        <div className="listing-cards for-request pt-4">
                            <div className="listing-info for-request">
                                <div className="title-group flex-column">
                                    <div className="listing-title mb-1">{data.fileName}</div>
                                    <p className="mb-0">{data.fileNumber}</p>
                                </div>
                            </div>
                            {/* <div className="line" /> */}
                            <div className="listing-info pt-0">
                                <div className="listing-btn">
                                    <button className="list-no-color-btn w-100" disabled onClick={() => popModal()}> 
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                : (
                    <div className="col-lg-4">
                        <div className="listing-cards for-request pt-4">
                            <div className="listing-info for-request">
                                <div className="title-group">
                                    <div className="listing-title mb-3">{data.buildingType}</div>
                                </div>
                                <div className="feature-group">
                                    <div className="feature-sing w-100">
                                        <i className="far fa-calendar" />
                                        <div className="feature-title w-100">
                                            { formattedDate }
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
                    
                )
            }
        </>

    )
}
