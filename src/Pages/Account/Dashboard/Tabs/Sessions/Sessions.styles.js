import styled from "styled-components";

export const Wrapper = styled.div`
    padding-top: 2rem;
    
    h5 {
        color: #0042ff;
        font-family: "Baloo Bhai 2";
        font-size: 16.8px;
        font-weight: bold;
    }
    h6 {
        color: #121212;
        font-family: "Baloo Bhai 2";
        font-size: 0.89rem;
    }
    
    .tabs .tab-bar {
        width: 33.33%;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%); 
    } 
    .tab-bar.req {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
    }    
    .tab-bar.roc {
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
    }
`