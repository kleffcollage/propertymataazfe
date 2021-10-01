import React, { useState } from "react";
import { Wrapper } from "./Dashboard.styles";
// Tabs
import Rent from "./Tabs/Rent";
import Listing from "./Tabs/Listings";
import Sessions from "./Tabs/Sessions";

const Dashboard = () => {
    const [tab, setTab] = useState("rent");
    
    const currentTab = (tabname) => {
        setTab(tabname);
    };
    return (
        <Wrapper className="mt-5">
            <div className="tabs mt-4 mb-2">
                <div className={`texts ${tab == "sessions" ? "current" : ""}`} 
                    onClick={() => currentTab("sessions")} >
                    Sessions
                </div>
                
                <div className={`texts ${tab == "listings" ? "current" : ""}`} 
                    onClick={() => currentTab("listings")} >
                    Listings
                </div>
                <div className={`texts ${tab == "rent" ? "current" : ""}`}
                    onClick={() => currentTab("rent")} > 
                    Rent
                </div>
                
                <div className={tab == "sessions" ? "tab-bar" : tab == "rent" ? "tab-bar roc" :  "tab-bar req"} />
            </div>
            
            <div>
                <div className="container dashboard-wrap">
                    {   
                        tab == "sessions" ? <Sessions /> :
                        tab == "listings" ? <Listing /> : 
                        tab == "rent" ? <Rent /> : null
                    }
                </div>
            </div>
        </Wrapper>
    )
}

export default Dashboard;