import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, Label, Input, FormGroup, Alert } from 'reactstrap';
import { Facility } from './Facility';

type Props = {
    facility: Facility,
    isOpen: boolean,
    toggleOpen: () => void,
    submit: () => void,
    errors: string[],
    changeHandler: (key: string, value: any) => void,
    modalMode: string
}

const FacilityModal = (props: Props) => {
    const { isOpen, toggleOpen, submit, errors, facility, changeHandler, modalMode } = props;
    
    const onFieldChange = (event) => 
        changeHandler && changeHandler(event.target.name, event.target.value)

    return (
        <>
            <Modal isOpen={isOpen} toggle={() => toggleOpen()}>
                <ModalHeader>{modalMode} Tennis Court</ModalHeader>
                <ModalBody>
                    {errors && errors.length > 0 &&
                        <Alert className="alert" color="danger">
                            <ul>
                            {errors.map((err, index) =>
                                <li key={index}>{err}</li>
                            )}
                            </ul>
                        </Alert>}
                    <Form onSubmit={() => submit()}>
                        <FormGroup>
                            <Label for="facilityName">Name</Label>
                            <Input
                                id="facilityName"
                                name="name"
                                type="text" 
                                value={facility.name}
                                onChange={onFieldChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                id="address"
                                name="addressLine1"
                                type="text" 
                                value={facility.addressLine1}
                                onChange={onFieldChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input
                                id="city"
                                name="city"
                                type="text" 
                                value={facility.city}
                                onChange={onFieldChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">State</Label>
                            <Input
                                id="state"
                                name="state"
                                type="text" 
                                value={facility.state}
                                maxLength={2}
                                onChange={onFieldChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">Zip</Label>
                            <Input
                                id="zip"
                                name="zip"
                                type="text" 
                                value={facility.zip}
                                maxLength={5}
                                onChange={onFieldChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numberCourts">Number of Courts</Label>
                            <Input
                                id="numberCourts"
                                name="numberOfCourts"
                                type="number" 
                                value={facility.numberOfCourts}
                                onChange={onFieldChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => toggleOpen()}>Cancel</Button>
                    <Button color="primary" onClick={() => submit()}>{modalMode} Facility</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default FacilityModal;