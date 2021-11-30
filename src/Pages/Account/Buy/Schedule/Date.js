import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../../Context/MainContext";
import Fetch from "../../../../Utilities/Fetch";
import Spinner from "../../../../Utilities/Spinner";
import { Box } from "@material-ui/core";
import { Wrapper, Content } from "./styles";
import Moment from "react-moment";


const DateWrap = ({ dates ={}, setSelectedDate={}, close }) => {
    // console.log(dates.date)
    const a = new Date(dates.date)
    // console.log(a)
    
    return  (
        // <Wrapper>
            <Content>
                <Box className="py-3 mx-2" display="flex" flexDirection="column" alignItems="center" onClick={() => setSelectedDate(dates)}>
                    <h6><Moment format="ddd" date={ new Date(dates.date) } /> </h6>
                    <p className="mb-1">
                        <Moment format="MMM DD" date={ new Date(dates.date) } />
                    </p>
                </Box>
            </Content>
        // </Wrapper>
    )
}


export default DateWrap;