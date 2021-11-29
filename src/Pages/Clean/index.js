import React, { useState, useEffect } from "react";
import { Wrapper } from "./Clean.styles";
import Modal from "../../Utilities/Modal";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";
import Application from "../../Components/Generics/Form/Application";
import { Box } from "@material-ui/core";
import SessionsCard from "../../Components/Generics/SessionsCard";

const Clean = () => {
    const [openModal, setOpenModal ] = useState(false);
    const [loading, setLoading ] = useState(false);
    const [offset, setOffset ] = useState(0);
    const [limit, setLimit ] = useState(25);
    const [requests, setRequest ] = useState([]);
    
    const fetchCleanRequest = async () => {
        setLoading(true)
        try {
            setLoading(true)
            let data  = await Fetch(`Clean/requests/user?offset=${offset}&limit=${limit}`)
            // data = data.data.json();
            // console.log('Clean req: ', data)
            setRequest(data.data.value)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }
    
    useEffect(() => {
        fetchCleanRequest()
    }, [])
    
    
    return (
        <>
            <Modal open={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
            >
                <Application clean={true} close={() => setOpenModal(false)} />
            </Modal>
            
            <Wrapper className="mt-3">
                <div className="row">
                    <div className="col-lg-4 my-2">
                        <div className="small-cards" onClick={ () => setOpenModal(true)}>
                            <div className="iconsection">
                                <img src="/asset/clean.png" alt="find-property" />
                            </div>
                            <div className="text-sections">
                                <div className="rent-title">Book Cleaning Session</div>
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
                            <h5>Cleaning Session</h5>
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
                                        <span>You currently have no  Cleaning sessions Booked.</span>
                                    </Box>
                            }
                        </div>
                    </div>
                </div>  
            </Wrapper>
        </>
    )
}

export default Clean;