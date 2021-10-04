import MaterialModal from "@material-ui/core/Modal";
import React from "react";
import { ModalWrapper } from "../Style/ModalWrapper";

function Modal(props) {
	return (
		<MaterialModal
			open={props.open}
			onClose={props.onClose}
			aria-labelledby="This is a modal"
			aria-describedby="A modal description"
			disableBackdropClick={false}
		>
			<ModalWrapper width={props.width} >{props.children}</ModalWrapper>
		</MaterialModal>
	);
}

export default Modal;
