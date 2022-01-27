import React, { useState, useEffect } from "react";
import { Wrapper } from "../../Account/Dashboard/Tabs/Listings/Listings.style";
import Fetch from "../../../Utilities/Fetch";
import ListedCard from "../../../Components/Generics/ListedCard";
import RentCard from "../../../Components/Generics/RentCard";
import Spinner from "../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import PropertyCard from "../../../Components/Generics/PropertyCard";
import Modal from "../../../Utilities/Modal";
import SeeMore from "../../Account/Buy/SeeMore";
import RequestCard from "../../../Components/Generics/RequestCard";

const TenancyList = () => {
    const [errormessage, setErrormessage] = useState("");
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(25);
    const [landlordTenancy, setLandlordTenancy] = useState([]);
    const [userTenancy, setUserTenancy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [tab, setTab] = useState("tenant");
    const [propertyId, setPropertyId] = useState(0);
    
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
    
    const fetchLandlordTenancy = async () => {
        setLoading(true)
        const data = await Fetch(`Tenancy/landlord?offset=${offset}&limit=${limit}`)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setLandlordTenancy(data.data)
            // console.log('Tenancy rents: ', data.data.value)
            setLoading(false)
            return
        }
    }
    
    const fetchUserTenancy = async () => {
        setLoading(true)
        const data = await Fetch(`Tenancy/user?offset=${offset}&limit=${limit}`)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setUserTenancy(data.data)
            setLoading(false)
            return
        }
    }
    
    useEffect(() => {
        fetchLandlordTenancy();
        fetchUserTenancy();
    }, [])
    
    
    
    return (
        <Wrapper className="row">
            <Modal open={showInfo} onClose={() => setShowInfo(false)}>
                <SeeMore propertyId={propertyId} setSeeMore={setShowInfo} seller={true} />
            </Modal>
            
            
            { loading ?
                <Box display="flex" width="100%" height="100" justifyContent="center" alignItems="center"> 
                    <Spinner size={40} color={"primary"} /> 
                </Box> 
                : (
                    <>
                        <div className="tabs mt-0">
                            <div
                                className={`texts ${tab == "tenant" ? "current" : ""}`}
                                onClick={() => currentTab("tenant")}
                            >
                                For Tenant
                            </div>
                            <div
                                className={`texts ${tab == "landlord" ? "current" : ""}`}
                                onClick={() => currentTab("landlord")}
                            >
                                For Landlord
                            </div>
                            
                            <div className={tab == "tenant" ? "tabbar" : "tabbar req"} />
                        </div>
                        
                        <div>
                            <div className="container">
                                {   
                                    tab === "tenant" ? (
                                        
                                        <div className="my-3">
                                            <h5 className="mb-3">For Tenant</h5>
                                            
                                            <div className="row">
                                                { userTenancy.length == 0 
                                                    ? <h6 className="mb-3 italic">You currently do not have any active tenancy...</h6>
                                                    : <>
                                                        { userTenancy.map((rent, index) => {
                                                            return (
                                                                <RequestCard key={index} property={rent.property} isForTenants={true} seeMore={showDetails} tenancy={rent} />                    
                                                            )
                                                        })}
                                                    </>
                                                }
                                            </div>
                                            
                                        </div>
                                    ) : (
                                        <div className="my-3">
                                            <h5 className="mb-3">For Landlord</h5>
                                            
                                            <div className="row">
                                                { landlordTenancy.length == 0 
                                                    ? <h6 className="mb-3 italic">You currently do not have any active tenancy...</h6>
                                                    : <>
                                                        { landlordTenancy.map((rents, index) => {
                                                            return (
                                                                <RequestCard property={rents.property} seeMore={showDetails} key={index} tenancy={rents}/>                    
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

export default TenancyList;