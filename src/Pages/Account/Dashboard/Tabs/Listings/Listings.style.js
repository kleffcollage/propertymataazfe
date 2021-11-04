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
    
    .subtabs {
        height: 38px;
        width: 100%;
        border-radius: 4.8px;
        background-color: #f7f7f7;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        position: relative;
        padding: 5px;
        margin-bottom: 2rem;
        cursor: pointer;        
    }
    .tabbar {
        width: 49.6%;
        position: absolute;
        height: 85%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        border-radius: 2.4px;
        background-color: #ffffff;
        -webkit-box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.4);
        z-index: 1;
        transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        
        
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