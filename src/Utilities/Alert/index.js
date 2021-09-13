import React, { useRef } from "react";
import { Background, Wrapper, Content, Icon } from "./Alert.styles";

const Alert = ({showAlert, setShowAlert }) => {
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
                            <Icon />
                            <h5>Your request has been submitted. A PropertyMataaz Representative will get in touch with you shortly</h5>
                            <button type="button" onClick={() => setShowAlert(false)}> Ok </button>
                        </Content>
                    </Wrapper>
                </Background>
            : null }
        </>
    )
}

export default Alert;