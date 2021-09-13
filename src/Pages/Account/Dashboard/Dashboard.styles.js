import styled from "styled-components";

export const Wrapper = styled.div`
    height: calc(100vh - 150px);
    
        .tabs {
            height: 48px;
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
            margin-bottom: 4rem;
            cursor: pointer;

        .texts.current {
            color: #0042ff;
            font-family: "Baloo Bhai 2";
            font-size: 16.8px;
            font-weight: 600;
            letter-spacing: 0;
            line-height: 26.52px;
            text-align: center;
            opacity: 1;
        }

        .texts {
            opacity: 0.5;
            color: #191919;
            font-family: "Baloo Bhai 2";
            font-size: 16.8px;
            font-weight: 500;
            letter-spacing: 0;
            line-height: 26.52px;
            text-align: center;
            z-index: 2;
        }

        .tab-bar {
            width: 33.33%;
            position: absolute;
            height: 85%;
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
            border-radius: 2.4px;
            background-color: #ffffff;
            -webkit-box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.4);
            box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.4);
            z-index: 1;
            transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .tab-bar.req {
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }
        .tab-bar.roc {
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
        }
    }
`