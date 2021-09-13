import styled from "styled-components";

export const Wrapper = styled.div`
    height: calc(100vh - 150px);
    
    h3 {
        color: #0042ff;
        font-family: "Baloo Bhai 2";
        font-size: 2rem;
        font-weight: bold;
    }
    
    button {
        background: #141414;
        color: #fff;
        width: 150px;
        border: none;
        margin-top: 15px;
        border-radius: 6px;
        padding: 8px 20px;
        transition: all ease-in .2s;
        
        :hover {
            background: #4e86ec;
        }
    }
`