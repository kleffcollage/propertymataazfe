import React, { useState, useEffect } from "react";
import { Wrapper } from "./Listings.style";
import Fetch from "../../../../../Utilities/Fetch";
import ListedCard from "../../../../../Components/Generics/ListedCard";
import RentCard from "../../../../../Components/Generics/RentCard";
import Spinner from "../../../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import PropertyCard from "../../../../../Components/Generics/PropertyCard";
import Modal from "../../../../../Utilities/Modal";
import SeeMore from "../../../Buy/SeeMore";
import SellAdd from "../../../Sell/SellAdd";

const Listings = () => {
    const [errormessage, setErrormessage] = useState("");
    const [isForSale, setIsForSale] = useState([]);
    const [isForRent, setIsForRent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [tab, setTab] = useState("for-sale");
    const [propertyId, setPropertyId] = useState(0);
    const [addModal, setAddModal] = useState(false);
    
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
    
    const fetchPropertiesForSale = async (url = "Property/user/created/sale") => {
        setLoading(true)
        const data = await Fetch(url)
        
        // console.log('For Sale P: ', data)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setIsForSale(data.data.value)
            // console.log('Properties sale: ', data.data)
            setLoading(false)
            return
        }
    }
    const fetchPropertiesForRents = async (url = "Property/user/created/rent") => {
        setLoading(true)
        const data = await Fetch(url)
        
        // console.log('For Rent P: ', data)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setIsForRent(data.data.value)
            // console.log('Req rents: ', data.data)
            setLoading(false)
            return
        }
    }
    
    useEffect(() => {
        fetchPropertiesForRents();
        fetchPropertiesForSale();
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
                        <div className="tabs mt-3">
                            <div
                                className={`texts ${tab == "for-sale" ? "current" : ""}`}
                                onClick={() => currentTab("for-sale")}
                            >
                                For Sale
                            </div>
                            <div
                                className={`texts ${tab == "for-rent" ? "current" : ""}`}
                                onClick={() => currentTab("for-rent")}
                            >
                                For Rent
                            </div>
                            
                            <div className={tab == "for-sale" ? "tabbar" : "tabbar req"} />
                        </div>
                        
                        <div>
                            <div className="container">
                                {   
                                    tab === "for-sale" ? (
                                        
                                        <div className="my-3">
                                            
                                            <div className="d-flex w-100 justify-content-between h-fit mb-3 align-items-center">
                                                <h5 className="mb-3">For Sale</h5>
                                                <button className="secondary-btn sec mb-0" onClick={openModalBox}>
                                                    + Add Property
                                                </button>
                                            </div>
                                            
                                            <div className="row">
                                                { isForSale.length == 0 
                                                    ? <h6 className="mb-3 italic">You currently do not have any property listed for sale...</h6>
                                                    : <>
                                                        { isForSale.map((property, index) => {
                                                            return (
                                                                <PropertyCard property={property} seeMore={showDetails} key={index} />                    
                                                            )
                                                        })}
                                                    </>
                                                }
                                            </div>
                                            
                                        </div>
                                    ) : (
                                        <div className="my-3">
                                            <h5 className="mb-3">For Rent</h5>
                                            
                                            <div className="row">
                                                { isForRent.length == 0 
                                                    ? <h6 className="mb-3 italic">You currently do not have any property listed for rent...</h6>
                                                    : <>
                                                        { isForRent.map((rents, index) => {
                                                            return (
                                                                <RentCard property={rents} seeMore={showDetails} key={index} />                    
                                                            )
                                                        })}
                                                    </>
                                                }
                                            </div>
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