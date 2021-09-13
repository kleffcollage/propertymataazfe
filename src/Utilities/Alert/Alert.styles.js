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
`

export const Wrapper = styled.div`
    width: 480px;
    height: 500px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #252427;
    
    h5 {
        text-align: center;
    }
    
    button {
        background: #0042ff;
        color: #fff;
        width: 100%;
        border: none;
        margin-top: 15px;
        border-radius: 6px;
        padding: 10px 25px;
        
        :hover {
            background: #4e86ec;
        }
    }
`

export const Icon = styled.img`
    width: 50px;
    height: 50px;
    margin: 18px 0;
`