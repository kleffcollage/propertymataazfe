import React, { useState } from "react";
import { Wrapper } from "./Verify.styles";
import { Box } from "@material-ui/core";
import Modal from "../../Utilities/Modal";
import ListedCard from "../../Components/Generics/ListedCard";
import Application from "../../Components/Generics/Form/Application";
import Spinner from "../../Utilities/Spinner";

const initialState = [{
    fileName: 'Original Land Certification',
    fileNumber: '123456789ABCDE',
}]

const Verify = () => {
    const [openModal, setOpenModal ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [requests, setRequests] = useState(initialState);
    
    return (
        <>
            <Modal open={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
            >
                <Application close={() => setOpenModal(false)} />
            </Modal>
            
            <Wrapper className="mt-3">
                <div className="row">
                    <div className="col-lg-4 my-2">
                        <div className="small-cards" onClick={ () => setOpenModal(true)}>
                            <div className="iconsection" />
                            <div className="text-sections">
                                <div className="rent-title">Land Search</div>
                                <div className="rent-sub">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-12 my-2">
                        <div className="mt-4">
                            <h5>My Requests</h5>
                        </div>
                        {/* { loading ? 
                            (   <Box display="flex" width="100%" height="100" justifyContent="center" alignItems="center"> 
                                    <Spinner size={40} color={"primary"} /> 
                                </Box>
                            ) : (
                                <>
                                    <h5 className="mb-3">My Tenancy</h5>
                                
                                    { requests.map((property, index) => {
                                        return (
                                            <ListedCard property={property} isProperty={false} requests={requests} key={index} />                    
                                        )
                                    })}  
                                </>
                            )
                        } */}
                        
                        <Box display="flex" flexDirection="column" width="100%" alignItems="center">
                            <div className="iconsection mb-3" />
                            <span className="w-50">You currently have no Verification requests.</span>
                        </Box>
                    </div>
                </div>  
            </Wrapper>
        </>
    )
}

export default Verify;