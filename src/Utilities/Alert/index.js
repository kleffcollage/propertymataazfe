import React, { useRef } from "react";
import { HashRouter } from "react-router-dom";
import { Background, Wrapper, Content, Icon } from "./Alert.styles";
import Spinner from "../Spinner";
import { TiDeleteOutline } from "react-icons/ti"

const Alert = ({ showAlert, setShowAlert, callback, loading = false, confirm = false, isDelete = false, }) => {
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
                            { confirm 
                                ? <>
                                    <Icon />
                                    <h5>Confirm this?</h5>
                                    <div className="buttons">
                                        <button type="button" className="confirm mx-1" onClick={callback}> 
                                            { loading ? <Spinner color='primary'/> : "Yes" } 
                                        </button>
                                        <button type="button" className="cancel mx-1" onClick={() => setShowAlert(false)}> Cancel </button>    
                                    </div>
                                </>
                            
                                : isDelete ? 
                                    <>
                                        <Icon>
                                            <TiDeleteOutline />
                                        </Icon>
                                        <h5>Are you sure you want to delete this property?</h5>
                                        <div className="buttons">
                                            <button type="button" className="confirm mx-1" onClick={callback}> 
                                                { loading ? <Spinner color='danger'/> : "Yes" } 
                                            </button>
                                            <button type="button" className="cancel mx-1" onClick={() => setShowAlert(false)}> Cancel </button>    
                                        </div>
                                    </>
                                : <>
                                    <Icon />
                                    <h5>Your request has been submitted. A PropertyMataaz Representative will get in touch with you shortly</h5>
                                    <div className="buttons">
                                        <button type="button" className="confirm" onClick={() => setShowAlert(false)}> 
                                            { loading ? <Spinner color='primary'/> : "Ok" } 
                                        </button>
                                    </div>
                                </> 
                            }
                        </Content>
                    </Wrapper>
                </Background>
            : null }
        </>
    )
}

export default Alert;