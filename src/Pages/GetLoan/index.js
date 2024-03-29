import React, { useState } from "react";
import { Wrapper } from "./GetLoan.styles";
import Modal from "../../Utilities/Modal";
import Application from "../../Components/Generics/Form/Application";
import { Box } from "@material-ui/core";

const GetLoan = () => {
    const [openModal, setOpenModal ] = useState(false);
    
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
                                <div className="rent-title">Apply for a Loan</div>
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
                        
                        <Box display="flex" flexDirection="column" width="100%" alignItems="center" className="mt-3">
                            <div className="iconsection mb-3" />
                            <span>You currently have no Repair Session Booked.</span>
                        </Box>
                    </div>
                </div>  
            </Wrapper>
        </>
    )
}

export default GetLoan;