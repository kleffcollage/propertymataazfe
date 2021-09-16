import React, { useState, useEffect } from "react";
import { Wrapper } from "./Listings.style";
import Fetch from "../../../../../Utilities/Fetch";
import ListedCard from "../../../../../Components/Generics/ListedCard";
import Spinner from "../../../../../Utilities/Spinner";
import { Box } from "@material-ui/core";

const Listings = () => {
    const [errormessage, setErrormessage] = useState("");
    const [isForSale, setIsForSale] = useState([]);
    const [isForRent, setIsForRent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    
    const showDetails = (id) => {
        setShowInfo(true)
    }
    
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
            { loading ?
                <Box display="flex" width="100%" height="100" justifyContent="center" alignItems="center"> 
                    <Spinner size={40} color={"primary"} /> 
                </Box> 
                : (
                    <>
                        <div className="my-3">
                            <h5 className="mb-3">For Sale</h5>
                            
                            <div className="row">
                                { isForSale.length == 0 
                                    ? <h6 className="mb-3 italic">You currently do not have any enquiries listed...</h6>
                                    : <>
                                        { isForSale.map((property, index) => {
                                            return (
                                                <ListedCard property={property} seeMore={showDetails} key={index} />                    
                                            )
                                        })}
                                    </>
                                }
                            </div>
                            
                        </div>
                        
                        <div className="my-3">
                            <h5 className="mb-3">For Rent</h5>
                            
                            <div className="row">
                                { isForRent.length == 0 
                                    ? <h6 className="mb-3 italic">You currently do not have any requests listed...</h6>
                                    : <>
                                        { isForRent.map((rents, index) => {
                                            return (
                                                <ListedCard property={rents} seeMore={showDetails} key={index} />                    
                                            )
                                        })}
                                    </>
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