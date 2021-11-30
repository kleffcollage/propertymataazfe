import React from "react";
import Naira from "react-naira"
import moment from 'moment'

const DetailsCard = ({ details, close }) => {
    
    const formattedDate = moment(details.dateCreated).format("Do MMMM YYYY")
    const proposedDate = details.cleaningQuote !== null ? moment(details.cleaningQuote.proposedDate).format("L") : 'awaiting...'
    
    return (
        <>
            <div className="top-section">
                <div className="back">
                    <i className="fas fa-chevron-left mr-2"></i>
                    <span className="backs" onClick={close}>
                        Back
                    </span>
                </div>
            </div>
            
            <div className="details-card">
                <div className="mt-5">
                    <div className="listing-cards">
                        <div className="listing-info">
                            <div className="title-group flex-column">
                                <div className="property-title mb-1">{details.buildingType}</div>
                                <p className="mb-0">
                                    <i className="far fa-calendar mr-2"></i>
                                    <span> { formattedDate } </span>
                                </p>
                            </div>
                            <div className="tabs-group my-3">
                                <h5 className="mb-1">Quote</h5>
                                <p className="mb-0">
                                    <Naira>{details.cleaningQuote && details.cleaningQuote.quote}</Naira>
                                </p>
                            </div>
                            <div className="tabs-group my-3">
                                <h5 className="mb-1">Proposed Date</h5>
                                <p className="mb-0">
                                    { proposedDate }
                                </p>
                            </div>
                        </div>
                        <div className="d-flex mx-3 my-5">
                            <button className="color-btn w-100 py-3">
                                Accept Quote &amp; Date
                            </button>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsCard