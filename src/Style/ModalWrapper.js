import styled from "styled-components";

export const ModalWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	margin: auto;
	transform: translate(-50%, -50%);
	background: white;
	padding: 20px;
	width: 40%;
	overflow-y: auto;
	height: 100%;
	@media (max-width: 768px) {
		width: 100%;
	}
`;
