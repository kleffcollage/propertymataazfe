import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { MainContext } from "../../../../Context/MainContext";
import Fetch from "../../../../Utilities/Fetch";
import Spinner from "../../../../Utilities/Spinner";
import DateWrap from "./Date";
import { Wrapper } from "./styles";
import Moment from "react-moment";
import moment from "moment";
import { Box } from "@material-ui/core";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



const ScheduleInspect = ({ close }) => {
    let { propertyId } = useParams() 
    
    const [loading, setLoading ] = useState(false);
    const [inspectDate, setInspectDate] = useState([]);
    const [tab, setTab] = useState("person");
    const [selectedDate, setSelectedDate ] = useState(null);
    
    const currentTab = (tab) => {
        setTab(tab)
    }
    
    const scheduleData = {
        
    }
    
    const getInspectionDate = async () => {
        setLoading(true);
        
        try {
            let data = await Fetch(`Property/inspectiondates/list/${propertyId}`)
            console.log(data);
			
			if (!data.status) {
				setLoading(false);
				console.log(data.message);
				return;
			}
			if (data.status != 400) {
                setLoading(true);
                setInspectDate(data.data)
				setLoading(false);
			}
        } catch( error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getInspectionDate()
    }, [])
    
    return  (
        <>
            <div className="top-section">
                <div className="back">
                    <i className="fas fa-chevron-left"></i>
                    <span className="backs" onClick={close}>
                        Back          
                    </span>
                </div>
            </div>
            
            <div className="tabs mt-4">
                <div className={`texts ${tab == "person" ? "current" : ""}`} 
                    onClick={() => currentTab("person")} >
                    In-person
                </div>
                
                <div className={`texts ${tab == "video" ? "current" : ""}`}
                    onClick={() => currentTab("video")} >
                    Video Tour
                </div>
                
                <div className={tab == "person" ? "tab-bar" : "tab-bar req" } />
            </div>
            
            
            <div className="row">
                {   
                    tab == "person" ?
                    
                        <Formik
                            initialValues={scheduleData}
                            onSubmit={ async (values, { setSubmitting }) => {
                                // await formSubmit(values)
                                // console.log({values})
                                // alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            <Form>
                                <h5 className="field-title pl-2">Select a date</h5>
                                <div className="mb-5">
                                    
                                    <Carousel
                                        arrows={true}
                                        draggable={true}
                                        swipeable={true}
                                        infinite={true}
                                        autoPlaySpeed={1000}
                                        keyBoardControl={true}
                                        responsive={responsive}
                                        itemClass=""
                                    >
                                        {/* <Box className="p-3 bg-dark" display="flex" flexDirection="column" alignItems="center"></Box>
                                        <Box className="p-3 bg-dark" display="flex" flexDirection="column" alignItems="center"></Box>
                                        <Box className="p-3 bg-dark" display="flex" flexDirection="column" alignItems="center"></Box>
                                        <Box className="p-3 bg-dark" display="flex" flexDirection="column" alignItems="center"></Box>
                                        <Box className="p-3 bg-dark" display="flex" flexDirection="column" alignItems="center"></Box>
                                        <Box className="p-3 bg-dark" display="flex" flexDirection="column" alignItems="center"></Box>
                                        <Box className="p-3 bg-dark" display="flex" flexDirection="column" alignItems="center"></Box> */}
                                        { loading 
                                            ? (
                                                <Spinner size={40} color={"primary"} />
                                            ) : (
                                                <Wrapper>
                                                    { inspectDate.map((date, i) => {
                                                        return (
                                                            <DateWrap key={i} dates={date} setSelectedDate={setSelectedDate} /> 
                                                        )
                                                    }) }
                                                </Wrapper>
                                            )
                                        }
                                        
                                    </Carousel>
                                </div>
                                
                                {selectedDate &&
                                    <div className="input-box">
                                        <label htmlFor="time" className="input-label">Select a time</label>
                                        <div className="select-box">
                                            <Field name="time" as="select" className="formfield">
                                                {selectedDate.times.map((time, i) => {
                                                    const formattedTime = moment(time.time).format('LT')
                                                    console.log({time})
                                                    return (
                                                        // <Moment format="h:m" date="2021-08-13T02:42:04.584" /> 
                                                        <option key={i} value={time.id}>
                                                            {formattedTime}
                                                            {/* <Moment format="h:m" date="2021-08-13T02:42:04.584" />  */}
                                                        </option>
                                                    )
                                                })}
                                            </Field>
                                            <div className="arrows"></div>
                                        </div>
                                        <ErrorMessage name="time" />
                                    </div>
                                }
                            </Form>
                        
                        </Formik>
                    
                    
                    : tab == "video" ? "Video" : null
                }
            </div>
            
        </>
    )
    
    
}


export default ScheduleInspect;