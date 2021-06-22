import React from 'react'

export default function ListedCard({ property = {}, seeMore }) {
    return (
        <>
        {property.isDraft == true ? null : (
            <div className="col-lg-4">
                <div className="listing-cards">
                    <div className="listing-cover-img">
                        <img
                            src={
                                property.mediaFiles.length > 0
                                    ? property.mediaFiles[0].url
                                    : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                            }
                        />
                        <div className="listing-location">{property.area}</div>
                    </div>
                    <div className="listing-info">
                        <div className="title-group">
                            <div className="listing-title mb-3">{property.name}</div>
                        </div>
                        <div className="feature-group">
                            <div className="feature-sing">
                                <i className="far fa-bed" />
                                <div className="feature-title">
                                    {`${property.numberOfBedrooms} Bedrooms`}
                                </div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-toilet" />
                                <div className="feature-title">
                                    {`${property.numberOfBathrooms} Bathrooms`}
                                </div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-tags" />
                                <div className="feature-title">{`₦${property.price}`}</div>
                            </div>
                            <div className="feature-sing">
                                <i className="far fa-award" />
                                <div className="feature-title">
                                    {property.propertyType.toLowerCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                    <div className="listing-info pt-0">
                        <div className="listing-btn">
                            <button className="list-no-color-btn" onClick={() => {
                                    seeMore(property.id);
                                }}>See More</button>
                            <button
                                className="list-color-btn"
                                onClick={() => {
                                    seeMore(property.id);
                                }}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>

    )
}
