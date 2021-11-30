import React,{ useState} from 'react'
import SellAdd from '../../Pages/Account/Sell/SellAdd';
import { Statuses } from '../../Utilities/Enums';
import Fetch from '../../Utilities/Fetch';
import Naira from "react-naira";
import { HiBadgeCheck } from 'react-icons/hi';
import Modal from '../../Utilities/Modal'
import PropertyApplied from '../../Pages/Rent/Tenant/PropertyApplied';

export default function RentCard({ property = {}, seeMore, isProperty, requests = {} }) {
    const [editModal, setEditModal] = useState(false);
    
    const open = () => {
        setEditModal(!editModal);
    };
    
    const close = () => {
      setEditModal(false);
    };
    
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

    const [seeApplicants, setSeeApplicants] = useState(false);


    return (
        <>
            <Modal open={seeApplicants} 
                onClose={() => {
					setSeeApplicants(false);
				}}
			>
                <PropertyApplied property={property} close={() => { setSeeApplicants(false) }} />
			</Modal>
            
            <Modal open={editModal} onClose={() => setEditModal(false)}>
                <SellAdd close={close} existingProperty={property} isEdit={true}/>
            </Modal>
            
            
            {(property.isDraft == true ) ? null : (
                <div className="col-lg-4">
                    <div className="listing-cards">
                        <div className="listing-cover-img">
                            <img
                                src={
                                    property.mediaFiles && property.mediaFiles.length > 0
                                        ? property.mediaFiles[0].url
                                        : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                                }
                                alt=''
                            />
                            <div className="listing-location">{property.area}</div>
                        </div>
                        <div
                            className={`tag ${
                                property.isDraft === true
                                ? "draft"
                                : property.status === Statuses.VERIFIED
                                ? "verify"
                                : property.status === Statuses.SOLD
                                ? "draft"
                                : "pending"
                            }`}
                        >
                            <div
                                className={
                                property.status === Statuses.VERIFIED
                                    ? "text-white status"
                                    : property.status === Statuses.SOLD ?
                                    "status text-white"
                                    : "status"
                                }
                            >
                                {property.isDraft === true
                                ? "Only visible to you"
                                : property.status === Statuses.VERIFIED
                                ? "Live"
                                : property.status === Statuses.SOLD
                                ? "CLOSED"
                                : "Listing is pending"}
                            </div>
                            <div
                                className={
                                property.status === Statuses.VERIFIED
                                    ? "text-white status"
                                    : "status"
                                }
                                onClick={open}
                            >
                                {property.status === Statuses.SOLD ? null :<> Edit <i className="fas fa-pen ml-2" /> </>}
                            </div>
                        </div>
                        <div className="listing-info">
                            <div className="title-group mb-3">
                                <div className="listing-title ">{property.name}</div>
                                { !property.sellMyself &&
                                    <HiBadgeCheck className="badge-verified" />
                                }
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
                                    <div className="feature-title"><Naira>{property.price}</Naira></div>
                                </div>
                                <div className="feature-sing">
                                    <i className="far fa-award" />
                                    <div className="feature-title">
                                        {property.propertyType.toLowerCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="line" /> */}
                        <div className="listing-info pt-0">
                            <div className="listing-btn">
                                <button 
                                    className="list-no-color-btn" 
                                    onClick={() => setSeeApplicants(true)}
                                > 
                                    See More 
                                </button>
                                    
                                <button
                                    className="list-color-btn"
                                    onClick={() => setSeeApplicants(true)}
                                >
                                    Details 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        
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
