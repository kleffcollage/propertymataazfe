import React, { useState, useEffect } from "react";
import { Wrapper } from "./Listings.style";
import Fetch from "../../../../../Utilities/Fetch";
import ListedCard from "../../../../../Components/Generics/ListedCard";
import RequestCard from "../../../../../Components/Generics/RequestCard";
import EnquiryCard from "../../../../../Components/Generics/EnquiryCard";
import Spinner from "../../../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import PropertyCard from "../../../../../Components/Generics/PropertyCard";
import Modal from "../../../../../Utilities/Modal";
import SeeMore from "../../../Buy/SeeMore";
import SellAdd from "../../../Sell/SellAdd";
import UserListings from "./userListings";

const Listings = () => {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(25);
    const [errormessage, setErrormessage] = useState("");
    const [isForSale, setIsForSale] = useState([]);
    const [isForRent, setIsForRent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [tab, setTab] = useState("my-listings");
    const [propertyId, setPropertyId] = useState(0);
    const [addModal, setAddModal] = useState(false);
    const [isProperty, setIsProperty] = useState([]);
    const [requestRents, setRequestRents] = useState([]);
    
    const currentTab = (tabname) => {
        setTab(tabname);
    };
    
    // const showDetails = (id) => {
    //     setShowInfo(true)
    // }
    
    const showDetails = (id) => {
		setPropertyId(id);
		setShowInfo(true);
	};
    
    const openModalBox = () => {
		setAddModal(!addModal);
	};
    
    const fetchAppliedRents = async (url = `User/enquiries/user?offset=${offset}&limit=${limit}`) => {
        setLoading(true)
        const data = await Fetch(url)
        
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setIsProperty(data.data.value)
            setLoading(false)
            return
        }
    }
    
    const fetchRequestRents = async (url = `PropertyRequest/list/user?offset=${offset}&limit=${limit}`) => {
        setLoading(true)
        const data = await Fetch(url)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setRequestRents(data.data.value)
            setLoading(false)
            return
        }
    }
    
    useEffect(() => {
        fetchRequestRents();
        fetchAppliedRents();
    }, [])
    
    
    
    return (
        <Wrapper className="row">
            <Modal open={addModal} onclose={() => setAddModal(false)}>
				<SellAdd close={() => setAddModal(false)} />
			</Modal>
            
            <Modal open={showInfo} onClose={() => setShowInfo(false)}>
                <SeeMore propertyId={propertyId} setSeeMore={setShowInfo} seller={true} />
            </Modal>
            
            
            { loading ?
                <Box display="flex" width="100%" height="100" justifyContent="center" alignItems="center"> 
                    <Spinner size={40} color={"primary"} /> 
                </Box> 
                : (
                    <>
                        <div className="tabs mt-3 mb-2">
                            <div
                                className={`texts ${tab == "my-listings" ? "current" : ""}`}
                                onClick={() => currentTab("my-listings")}
                            >
                                My Listings
                            </div>
                            <div
                                className={`texts ${tab == "my-enquiries" ? "current" : ""}`}
                                onClick={() => currentTab("my-enquiries")}
                            >
                                My Enquires
                            </div>
                            <div
                                className={`texts ${tab == "my-requests" ? "current" : ""}`}
                                onClick={() => currentTab("my-requests")}
                            >
                                My Requests
                            </div>
                            <div className={tab === "my-listings" ? "tab-bar" : tab === "my-enquiries" ? "tab-bar req" : "tab-bar roc"}  />
                            {/* <div className={tab == "for-sale" ? "tabbar" : "tabbar req"} /> */}
                        </div>
                        
                        <div>
                            <div className="container">
                                {   
                                    tab === "my-listings" ? (
                                        <UserListings />
                                        
                                    ) : tab === "my-enquiries" ? (
                                        <div className="my-3">
                                            <h5 className="mb-3">Enquiries</h5>
                                            { isProperty.length === 0 
                                                ? <h6 className="mb-3 italic">You currently do not have any enquiries listed...</h6>
                                                : <>
                                                    <div className="row">
                                                        { isProperty.map((property, index) => {
                                                            return (
                                                                <EnquiryCard property={property} seeMore={showDetails} key={index}  />                   
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        
                                    ) : (
                                        <div className="my-3">
                                            <h5 className="mb-3">Requests</h5>
                                            
                                            { requestRents.length === 0 
                                                ? <h6 className="mb-3 italic">You currently do not have any property requests...</h6>
                                                : <>
                                                    <div className="row">
                                                        { requestRents.map((rents, index) => {
                                                            return (
                                                                <RequestCard property={rents} seeMore={showDetails} isRequest={true} key={index} />                   
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        
                    </>
                )
            }
            
        </Wrapper>
    )
}

export default Listings;