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
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    
    const showDetails = (id) => {
        setShowInfo(true)
    }
    
    const fetchAppliedRents = async (url = `Property/list?offset=${offset}&limit=${limit}`) => {
        setLoading(true)
        const data = await Fetch(url)
        
        if(!data.status) {
            setLoading(false)
            setErrormessage(data.message)
        }
        if(data.status != 400) {
            setLoading(true)
            setIsProperty(data.data.value)
            console.log('Properties: ', data.data.value)
            setLoading(false)
            return
        }
    }
    
    useEffect(() => {
        fetchAppliedRents()
    }, [])
    
    
    
    return (
        <Wrapper className="row">
            { loading ?
                <Box display="flex" width="100%" height="100" justifyContent="center" alignItems="center"> 
                    <Spinner size={40} color={"primary"} /> 
                </Box> 
                : (
                    <>
                        <h5 className="mb-3">My Tenancy</h5>
                        
                        { isProperty.map((property, index) => {
                            return (
                                <ListedCard property={property} seeMore={showDetails} key={index} />                    
                            )
                        })}
                    </>
                )
            }
            
        </Wrapper>
    )
}

export default Rent;