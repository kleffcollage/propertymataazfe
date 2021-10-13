import styled from "styled-components";

export const ModalWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	margin: auto;
	transform: translate(-50%, -50%);
	background: white;
	padding: 20px;
	width: ${({ width }) => width ? width : `40%`};
	overflow-y: auto;
	height: 100%;
	animation: animateModal .23s;
	
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}

	::-webkit-scrollbar {
		width: 7px;
		background-color: #F5F5F5;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		background-color: #4a77f9;
	}
    
    @keyframes animateModal {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
	@media (max-width: 768px) {
		width: 100%;
	}
`;
