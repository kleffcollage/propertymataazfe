import React, { useState } from 'react'
import SeeMore from '../../Pages/Account/Buy/SeeMore';
import Fetch from '../../Utilities/Fetch';
import Modal from '../../Utilities/Modal';
import Alert from '../../Utilities/Alert/index';
import Naira from "react-naira"
import RentReliefDetails from '../../Pages/Rent/RentReliefDetails';

export default function RequestCard({ property = {}, seeMore, isRequest = false, isRelief = false }) {
    const [ cancelModal, setCancelModal ] = useState(false)
    const [ openDetails, setOpenDetails ] = useState(false)
    
    const openRentDetails = () => {
        setOpenDetails(prev => !prev)
    }
    
    const open = () => {
        setCancelModal(prev => !prev)
    }
    const openCancel = () => {
        setCancelModal(prev => !prev)
    }
    
    const incrementView = async (id) => {
		var sendData = await Fetch(`Property/addview/${id}`, "get");
		//console.log("This is an Id " + id);
		if(!sendData.status){
			console.log(sendData.message)
			return;
		}
		if(sendData.status != 400 ){
			console.log("Issokay");
		}
	};

    const onSeeMoreClicked = async () => {
        console.log(property);
        seeMore(property.id);
        await incrementView(property.id);
    };
    // console.log({property})

    return (
        <>
        <Alert 
            showAlert={cancelModal} setShowAlert={setCancelModal} isCancel={true}     
        />
        
        <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
            <RentReliefDetails close={() => setOpenDetails(false)} />
        </Modal>
        
        { (isRequest)  ? (
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
                                    seeMore(property.id);
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
                    {/* <div className="listing-info pt-0">
                        <div className="listing-btn">
                            <button className="list-no-color-btn" 
                                onClick={openCancel}
                            > 
                                Cancel
                            </button>
                                
                            <button
                                className="list-color-btn"
                                onClick={() => {
                                    seeMore(property.id);
                                }}
                                disabled={property.matches.length == 0}
                            >
                                { property.matches.length == 0 
                                    ? 'No matches yet' 
                                    : `View ${property.matches.length} Matches` }
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        ) : null}
        
        {/* {isProperty ? null : (
            <div className="col-lg-4">
                <div className="listing-cards">
                    <div className="listing-info">
                        <div className="title-group">
                            <div className="listing-title mb-3">{requests.fileName}</div>
                        </div>
                        <div className="feature-group">
                            <div className="feature-sing">
                                <i className="far fa-bed" />
                                <div className="feature-title">
                                    {`${property.numberOfBedrooms} Bedrooms`}
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
                                <div className="feature-title">{`₦${property.price}`}</div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-award" />
                                <div className="feature-title">
                                    {property.propertyType.toLowerCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                    <div className="listing-info pt-0">
                        <div className="listing-btn">
                            
                            <button className="list-no-color-btn" onClick={ async () => {
                                await onSeeMoreClicked();
                            }}>  See More </button>
                                
                            <button className="list-color-btn"
                                onClick={() => { seeMore(property.id);}
                            }> Details </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        )} */}
    </>

    )
}
