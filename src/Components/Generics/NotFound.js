import React, { useState } from "react"
import { Wrapper } from "./NotFound.styles";
import Alert from "../../Utilities/Alert/index"; 

const NotFound = () => {
    const [showAlert, setShowAlert] = useState(false)
    
    const openAlert = () => {
        setShowAlert(prev => !prev)
    }
    
    return (
        <>
            <Alert showAlert={showAlert} setShowAlert={setShowAlert} /> 
            
            <Wrapper className="d-flex justify-content-center align-items-center">
                <div>
                    <h3>Sorry, Page has been moved or deleted!</h3>
                    <button type="button" onClick={openAlert}>Show alert</button>
                </div>
            </Wrapper>
        </>
    )
}

export default NotFound;