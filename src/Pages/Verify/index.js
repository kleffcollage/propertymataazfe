import React, { useState, useEffect } from "react";
import { Wrapper } from "./Verify.styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Box } from "@material-ui/core";
import Modal from "../../Utilities/Modal";
import Fetch from "../../Utilities/Fetch";
import Application from "../../Components/Generics/Form/Application";
import Spinner from "../../Utilities/Spinner";
import SessionsCard from "../../Components/Generics/SessionsCard";

// const initialState = [{
//     fileName: 'Original Land Certification',
//     fileNumber: '123456789ABCDE',
// }]

const Verify = () => {
    const [openModal, setOpenModal ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [requests, setRequests] = useState([]);
    const [offset, setOffset ] = useState(0);
    const [limit, setLimit ] = useState(25);
    
    const fetchLandSearch = async () => {
        setLoading(true)
        try {
            setLoading(true)
            let data  = await Fetch(`LandSearch/user/list?offset=${offset}&limit=${limit}`);
            // data = data.data.json();
            // console.log('Verify: ', data)
            setRequests(data.data.value)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            // toast.warn("Unable to fetch land search requests.")
            console.error({ error })
        }
    }
    
    useEffect(() => {
        fetchLandSearch();
    }, [])
    
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
                            <div className="iconsection">
                                <img src="/asset/Rent/findProperty.png" alt="find-property" />
                            </div>
                            <div className="text-sections">
                                <div className="rent-title">Land Search</div>
                                <div className="rent-sub">
                                    Lorem ipsum dolor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="my-2">
                    <div className="mt-4">
                        <h5>My Requests</h5>
                    </div>
                    
                    <div className="row py-3">
                        { loading 
                            ?
                                <Box width="100%" flexDirection="row" justifyContent="center" alignItems="center">
                                    <Spinner color="primary" size="35" />
                                </Box>
                            
                            : (
                                requests && requests.length > 0
                                ? requests.map((request, index) => {
                                    return (
                                        <SessionsCard key={index} data={request} isLandSearch={true} />
                                    )
                                })
                            
                                : <Box display="flex" flexDirection="column" width="100%" alignItems="center" className="mt-3">
                                    <div className="iconsection mb-3" />
                                    <span>You currently have no Verification requests.</span>
                                </Box>
                            )
                        }
                    </div>  
                </div>
            </Wrapper>
        </>
    )
}

export default Verify;