import React, { useRef } from "react";
import { HashRouter } from "react-router-dom";
import { Background, Wrapper, Content } from "./Alert.styles";
import Spinner from "../Spinner";

const MiniModal = ({ showAlert, setShowAlert }) => {
    const alertRef = useRef()
    
    const closeAlert = (e) => {
        if(alertRef.current === e.target ) {
            setShowAlert(false)
        }
    }  
   
    
    return (
        <>
            { showAlert ? 
                <Background onClick={closeAlert} ref={alertRef}>
                    <Wrapper>
                        <Content className="p-5">
                           
                        </Content>
                    </Wrapper>
                </Background>
            : null }
        </>
    )
}

export default MiniModal;