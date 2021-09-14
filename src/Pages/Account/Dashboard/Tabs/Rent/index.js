import React, { useState, useEffect } from "react";
import { Wrapper } from "./Rent.styles";
import Fetch from "../../../../../Utilities/Fetch";
import ListedCard from "../../../../../Components/Generics/ListedCard";
import Spinner from "../../../../../Utilities/Spinner";
import { Box } from "@material-ui/core";

const Rent = () => {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(25);
    const [errormessage, setErrormessage] = useState("");
    const [isProperty, setIsProperty] = useState([]);
    const [requestRents, setRequestRents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    
    const showDetails = (id) => {
        setShowInfo(true)
    }
    
    const fetchAppliedRents = async (url = `User/enquiries/user?offset=${offset}&limit=${limit}`) => {
        setLoading(true)
        const data = await Fetch(url)
        
        console.log('Enquired Rents: ', data)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setIsProperty(data.data.value)
            console.log('Properties: ', data.data.value)
            setLoading(false)
            return
        }
    }
    const fetchRequestRents = async (url = `PropertyRequest/list/user?offset=${offset}&limit=${limit}`) => {
        setLoading(true)
        const data = await Fetch(url)
        
        console.log('Requested Rents: ', data)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
            return
        }
        if(data.status != 400) {
            setLoading(true)
            setRequestRents(data.data.value)
            console.log('Req rents: ', data.data.value)
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
            { loading ?
                <Box display="flex" width="100%" height="100" justifyContent="center" alignItems="center"> 
                    <Spinner size={40} color={"primary"} /> 
                </Box> 
                : (
                    <>
                        <div className="my-3">
                            <h5 className="mb-3">Enquiries</h5>
                            { isProperty.length == 0 
                                ? <h6 className="mb-3 italic">You currently do not have any enquiries listed...</h6>
                                : <>
                                    { isProperty.map((property, index) => {
                                        return (
                                            <ListedCard property={property} seeMore={showDetails} key={index} />                    
                                        )
                                    })}
                                </>
                            }
                            
                        </div>
                        
                        <div className="my-3">
                            <h5 className="mb-3">Requests</h5>
                            
                            { requestRents.length == 0 
                                ? <h6 className="mb-3 italic">You currently do not have any requests listed...</h6>
                                : <>
                                    { requestRents.map((rents, index) => {
                                        return (
                                            <ListedCard property={rents} seeMore={showDetails} key={index} />                    
                                        )
                                    })}
                                </>
                            }
                        </div>
                    </>
                )
            }
            
        </Wrapper>
    )
}

export default Rent;