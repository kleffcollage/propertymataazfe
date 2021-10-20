import React, { useState, useEffect } from "react";
import { Wrapper } from "./Sessions.styles";
import Fetch from "../../../../../Utilities/Fetch";
import EnquiryCard from "../../../../../Components/Generics/EnquiryCard";
import RequestCard from "../../../../../Components/Generics/RequestCard";
import SessionsCard from "../../../../../Components/Generics/SessionsCard";
import Spinner from "../../../../../Utilities/Spinner";
import { Box } from "@material-ui/core";

const Sessions = () => {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(25);
    const [errormessage, setErrormessage] = useState("");
    const [verifyList, setVerifyList] = useState([]);
    const [cleanList, setCleanList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [subTab, setSubTab] = useState("fix");
    
    const currentTab = (tabname) => {
        setSubTab(tabname);
    };
    
    const showDetails = (id) => {
        setShowInfo(true)
    }
    
    const fetchCleanRequest = async () => {
        setLoading(true)
        try {
            setLoading(true)
            let data  = await Fetch(`Clean/requests/user?offset=${offset}&limit=${limit}`)
            // data = data.data.json();
            console.log('Clean req: ', data)
            setCleanList(data.data.value)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErrormessage(error.message)
            // console.log( error)
        }
    }
    
    const fetchLandSearch = async (url = `LandSearch/user/list?offset=${offset}&limit=${limit}`) => {
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
            setVerifyList(data.data.value)
            // console.log('Enquired Properties: ', data.data.value)
            setLoading(false)
            return
        }
    }
    
    useEffect(() => {
        fetchLandSearch();
        fetchCleanRequest();
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
                            <div className={`texts ${subTab === "clean" ? "current" : ""}`} 
                                onClick={() => currentTab("clean")} >
                                Clean
                            </div>
                            
                            <div className={`texts ${subTab === "fix" ? "current" : ""}`} 
                                onClick={() => currentTab("fix")} >
                                Fix
                            </div>
                            <div className={`texts ${subTab === "verify" ? "current" : ""}`}
                                onClick={() => currentTab("verify")} > 
                                Verify
                            </div>
                            
                            <div className={subTab === "clean" ? "tab-bar" : subTab === "fix" ? "tab-bar req" : "tab-bar roc"}  />
                        </div>
            
                        <div>
                            <div className="container">
                                {   
                                    subTab === "clean" ? (
                                        <div className="my-3">
                                            <h5 className="mb-3">Clean</h5>
                                            { cleanList.length == 0 
                                                ? <h6 className="mb-3 italic">You currently do not have any clean session booked...</h6>
                                                : <>
                                                    <div className="row">
                                                        { cleanList.map((clean, index) => {
                                                            return (
                                                                <SessionsCard data={clean} isClean={true} key={index}  />                   
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    ) :
                                    subTab === "fix" ? (
                                        
                                        <div className="my-3">
                                            <h5 className="mb-3">Fix</h5>
                                            
                                            { verifyList.length == 0 
                                                ? <h6 className="mb-3 italic">You currently do not have any fix request listed...</h6>
                                                : <>
                                                    <div className="row">
                                                        { verifyList.map((property, index) => {
                                                            return (
                                                                <SessionsCard data={property} key={index}  />                   
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        
                                    ) : 
                                    subTab === "verify" ? (
                                        
                                        <div className="my-3">
                                            <h5 className="mb-3">Verify</h5>
                                            
                                            { verifyList.length == 0 
                                                ? <h6 className="mb-3 italic">You currently do not have any land search or verification listed...</h6>
                                                : <>
                                                    <div className="row">
                                                        { verifyList.map((verify, index) => {
                                                            return (
                                                                <SessionsCard data={verify} isLandSearch key={index} />                   
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        
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

export default Sessions;