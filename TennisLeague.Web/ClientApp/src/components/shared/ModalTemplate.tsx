import {Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

type Props = {
    headerText: string;
    submitButtonText: string;
    isOpen: boolean,
    toggleOpen: () => void;
    content: JSX.Element|JSX.Element[];
    submit: () => void
}

const ModalTemplate = (props: Props) => {
    const { isOpen, toggleOpen, headerText, submitButtonText, content, submit } = props;

    return (
        <Modal isOpen={isOpen} toggle={() => toggleOpen()}>
            <ModalHeader>{headerText}</ModalHeader>
            <ModalBody>
                {content}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => toggleOpen()}>Cancel</Button>
                <Button color="primary" onClick={() => submit()}>{submitButtonText}</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalTemplate;