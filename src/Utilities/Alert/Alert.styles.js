import styled from "styled-components";

export const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
`

export const Wrapper = styled.div`
    width: 480px;
    height: 420px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    color: #000000;
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    animation: animateAlert 1.5s;
    
    @keyframes animateAlert {
        from {
            /* opacity: 0; */
            transform: translateY(-50%);
        }
        to {
            /* opacity: 1; */
            transform: translateY(0%)
        }
    }
`

export const Content = styled.div`
    font-family: "Baloo Bhai 2";
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #252427;
    
    h5 {
        text-align: center;
    }
    
    .buttons {
        margin-top: 35px;
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: space-between;
        width: 100%;
        
        .confirm {
            background: #e43838;
            color: #fff;
            width: 100%;
            border: none;
            margin-top: 15px;
            border-radius: 6px;
            padding: 10px 25px;
            transition: all .21s ease-in-out;
            
            :hover {
                background: #e06c6c;
            }
        }
        
        .cancel {
            background: #efefef;
            color: #2d2c2c;
            width: 100%;
            border: none;
            margin-top: 15px;
            border-radius: 6px;
            padding: 10px 25px;
            transition: all .21s ease-in-out;
            
            :hover {
                background: #9a9a9a;
                color: #f4f4f4;
            } 
        }
        
    }
`

export const Icon = styled.div`
    margin: 0 0 45px 0;
    
    svg {
        width: 70px;
        height: 70px;
        color: #f51616;
    }
`