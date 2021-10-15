import React, { useState, useEffect } from "react";
import { Wrapper } from "./Fix.styles";
import Modal from "../../Utilities/Modal";
import Spinner from "../../Utilities/Spinner";
import Fetch from "../../Utilities/Fetch";
import Application from "../../Components/Generics/Form/Application";
import SessionsCard from "../../Components/Generics/SessionsCard";
import { Box } from "@material-ui/core";

const Fix = () => {
    const [openModal, setOpenModal ] = useState(false);
    const [loading, setLoading ] = useState(false);
    const [offset, setOffset ] = useState(0);
    const [limit, setLimit ] = useState(25);
    const [requests, setRequest ] = useState([]);
    
    const fetchFixRequest = async () => {
        setLoading(true)
        try {
            setLoading(true)
            let data  = await Fetch(`Clean/requests/user?offset=${offset}&limit=${limit}`)
            // data = data.data.json();
            console.log('Fix requests: ', data)
            setRequest(data.data.value)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            // console.log( error)
        }
    }
    
    useEffect(() => {
        fetchFixRequest()
    }, [])
    
    return (
        <>
            <Modal open={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
            >
                <Application fix={true} close={() => setOpenModal(false)} />
            </Modal>
            
            <Wrapper className="mt-3">
                <div className="row">
                    <div className="col-lg-4 my-2">
                        <div className="small-cards" onClick={ () => setOpenModal(true)}>
                            <div className="iconsection" />
                            <div className="text-sections">
                                <div className="rent-title">Schedule a House Repair</div>
                                <div className="rent-sub">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="my-2">
                        <div className="mt-4 mb-2">
                            <h5>My Requests</h5>
                        </div>
                        
                        <div className="row mt-4">
                            { 
                                loading ? (
                                    <div className="d-flex justify-content-content">
                                        <Spinner color="primary" />
                                    </div>
                                )
                                : requests.length !== 0
                                    ? requests.map((request, index) => {
                                        return (
                                            <SessionsCard isClean={true} key={index} data={request} />                                            
                                        )
                                    })
                                
                                    : <Box display="flex" flexDirection="column" width="100%" alignItems="center" className="mt-3">
                                        <div className="iconsection mb-3" />
                                        <span>You currently have no Repair Session Booked.</span>
                                    </Box>
                            }
                        </div>
                    </div>
                </div>  
            </Wrapper>
        </>
    )
}

export default Fix;