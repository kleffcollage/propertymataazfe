import React, { useState, useEffect } from "react";
import { Wrapper } from "./Rent.styles";
import Fetch from "../../../../../Utilities/Fetch";
import EnquiryCard from "../../../../../Components/Generics/EnquiryCard";
import RequestCard from "../../../../../Components/Generics/RequestCard";
import Spinner from "../../../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import TenancyList from "../../../../Rent/Tenant/TenancyList";

const Rent = () => {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(25);
    const [errormessage, setErrormessage] = useState("");
    const [isProperty, setIsProperty] = useState([]);
    const [requestRents, setRequestRents] = useState([]);
    const [rentReliefs, setRentReliefs] = useState([]);
    const [userTenancy, setUserTenancy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [subTab, setSubTab] = useState("enquiries");
    
    const currentTab = (tabname) => {
        setSubTab(tabname);
    };
    
    const showDetails = (id) => {
        setShowInfo(true)
    }
    
    const fetchAppliedRents = async (url = `User/enquiries/user?offset=${offset}&limit=${limit}`) => {
        setLoading(true)
        const data = await Fetch(url)
        
        // console.log('Enquired Rents: ', data)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setIsProperty(data.data.value)
            // console.log('Enquired Properties: ', data.data.value)
            setLoading(false)
            return
        }
    }
    const fetchRequestRents = async (url = `PropertyRequest/list/user?offset=${offset}&limit=${limit}`) => {
        setLoading(true)
        const data = await Fetch(url)
        
        // console.log('Requested Rents: ', data)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setRequestRents(data.data.value)
            // console.log('Requested rents: ', data.data.value)
            setLoading(false)
            return
        }
    }
    const fetchReliefsLists = async () => {
        setLoading(true)
        const data = await Fetch(`Relief/user?offset=${offset}&limit=${limit}`)
        
        // console.log('Requested Rents: ', data)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setRentReliefs(data.data)
            // console.log('Requested rents: ', data.data.value)
            setLoading(false)
            return
        }
    }
    
    useEffect(() => {
        fetchRequestRents();
        fetchAppliedRents();
        fetchReliefsLists();
    }, [])
    
    
    
    return (
        <Wrapper className="row">
            { loading ?
                <Box display="flex" width="100%" height="100" justifyContent="center" alignItems="center"> 
                    <Spinner size={40} color={"primary"} /> 
                </Box> 
                : (
                    <>
                    
                        <div className="tabs mt-4">
                            <div className={`texts ${subTab === "enquiries" ? "current" : ""}`} 
                                onClick={() => currentTab("enquiries")} >
                                Enquiries
                            </div>
                            
                            <div className={`texts ${subTab === "requests" ? "current" : ""}`} 
                                onClick={() => currentTab("requests")} >
                                Requests
                            </div>
                            
                            <div className={`texts ${subTab === "rent-relief" ? "current" : ""}`}
                                onClick={() => currentTab("rent-relief")} > 
                                Rent Relief
                            </div>
                            
                            <div className={`texts ${subTab === "tenancy" ? "current" : ""}`}
                                onClick={() => currentTab("tenancy")} > 
                                My Tenancy
                            </div>
                            
                            <div className={subTab == "enquiries" ? "subtab-bar" : subTab == "requests" ? "subtab-bar request" : subTab == "rent-relief" ? "subtab-bar relief" : "subtab-bar tenancy"}  />
                        </div>
            
                        <div className="container">
                            <div className="row">
                                {   
                                    subTab == "enquiries" ? (
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
                                    ) :
                                    subTab == "requests" ? (
                                        
                                        <div className="my-3">
                                            <h5 className="mb-3">Requests</h5>
                                            
                                            { requestRents.length === 0 
                                                ? <h6 className="mb-3 italic">You currently do not have any requests listed...</h6>
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
                                        
                                    ) : 
                                    subTab == "rent-relief" ? (
                                        
                                        <div className="my-3">
                                            <h5 className="mb-3">Rent Relief</h5>
                                            
                                            { rentReliefs.length == 0 
                                                ? <h6 className="mb-3 italic">You currently do not have any requests listed...</h6>
                                                : <>
                                                    <div className="row">
                                                        { rentReliefs.map((reliefs, index) => {
                                                            return (
                                                                <RequestCard relief={reliefs} seeMore={showDetails} isRelief={true} key={index} />                   
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        
                                    ) : 
                                    subTab == "tenancy" ? (
                                        <TenancyList />
                                    ) : null
                                }
                            </div>
                        </div>
                    </>
                )
            }
            
        </Wrapper>
    )
}

export default Rent;