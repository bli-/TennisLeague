import { Alert, Form, FormGroup, Label, Input } from "reactstrap"
import { Facility } from "../../models/Facility"

type Props = {
    facility: Facility,
    submit: () => void,
    errors: string[],
    changeHandler: (key: string, value: any) => void
}

const FacilityEntryForm = (props: Props) => {
    const { submit, errors, facility, changeHandler } = props;
    
    const onFieldChange = (event) => 
        changeHandler && changeHandler(event.target.name, event.target.value)

    return (
        <>
            {errors && errors.length > 0 &&
                <Alert className="alert" color="danger">
                    <ul>
                    {errors.map((err, index) =>
                        <li key={index}>{err}</li>
                    )}
                    </ul>
                </Alert>
            }
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
        </>
    )
}

export default FacilityEntryForm;