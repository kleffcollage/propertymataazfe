import React from "react"
import { Wrapper } from "./NotFound.styles";

const NotFound = () => {
    return (
        <Wrapper className="d-flex justify-content-center align-items-center">
            <div>
                <h3>Sorry, Page has been moved or deleted!</h3>
            </div>
        </Wrapper>
    )
}

export default NotFound;