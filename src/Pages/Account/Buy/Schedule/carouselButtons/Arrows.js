const CustomRightArrow = ({ onClick, ...rest }) => {
    const { onMove, carouselState: {currentSlide, deviceType } } = rest
    
    // onMove means if dragging or swiping in progress.
    return <button
            aria-label="Go to next slide"
            type="button"
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right custom__arrow-right" 
            onClick={() => onClick()} />;
}

const CustomLeftArrow = ({ onClick, ...rest }) => {
    const { onMove, carouselState: {currentSlide, deviceType } } = rest
    
    // onMove means if dragging or swiping in progress.
    return <button
            aria-label="Go to previous slide"
            type="button"
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left custom__arrow-left" 
            onClick={() => onClick()} />;
}

export { CustomRightArrow, CustomLeftArrow };