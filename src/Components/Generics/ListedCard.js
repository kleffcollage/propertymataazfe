import React,{ useState} from 'react'
import SeeMore from '../../Pages/Account/Buy/SeeMore';
import Fetch from '../../Utilities/Fetch';
import Naira from "react-naira";
import { HiBadgeCheck } from 'react-icons/hi';
import Modal from '../../Utilities/Modal'

export default function ListedCard({ property = {}, seeMore, isProperty, requests = {} }) {
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

    const [seeeMore, setSeeeMore] = useState(false);

    const onSeeMoreClicked = async () => {
        console.log(property);
        seeMore(property.id);
        await incrementView(property.id);
    };

    return (
        <>
        <Modal
				open={seeeMore}
				onClose={() => {
					setSeeeMore(false);
				}}
			>
				<SeeMore propertyId={property.id} setSeeMore={setSeeeMore} seller={true}/>
			</Modal>
        {(property.isDraft == true )  ? null : (
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
                            <button className="list-no-color-btn" onClick={ async () => {
                                   await onSeeMoreClicked();
                                }}> 
                                See More 
                            </button>
                                
                            <button
                                className="list-color-btn"
                                onClick={() => {
                                    seeMore(property.id);
                                }}
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
