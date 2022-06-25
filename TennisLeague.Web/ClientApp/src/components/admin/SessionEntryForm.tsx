import Select from "react-select";
import { Alert, Form, FormGroup, Label, Input, Row, Col } from "reactstrap"
import { DayOfWeek } from "../../models/DaysOfWeekEnum";
import { Facility } from "../../models/Facility";
import { MatchType } from "../../models/MatchType";
import { Rating } from "../../models/Rating";
import { SessionEntryFormFields } from "./SessionEntryFormFields";

type Props = {
    session: SessionEntryFormFields,
    matchTypes: MatchType[];
    ratings: Rating[];
    facilities: Facility[];
    submit: () => void,
    errors: string[],
    changeHandler: (key: string, value: any) => void
}

export class DayOptions {
    Value: DayOfWeek;
    Label: string;
}

const SessionEntryForm = (props: Props) => {
    const { submit, errors, session, matchTypes, ratings, facilities, changeHandler } = props
    const genders = ['Men\'s', 'Women\'s'];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const ampm = ["AM", "PM"];

    const buildDayOptions = (): DayOptions[] => {
        return Object.values(DayOfWeek)
            .filter(day => typeof(day) == 'string')
            .map((day: string) => {
                let dayOfWeek = new DayOptions();
                dayOfWeek.Value = DayOfWeek[day];
                dayOfWeek.Label = day;
                return dayOfWeek;
            });
    }
    
    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!changeHandler) return;

        if (isNaN(event.target.value as any)) {
            changeHandler(event.target.name, event.target.value);
        } else {
            changeHandler(event.target.name, Number(event.target.value));
        }
    }

    const onFacilitySelectChange = (facilities: Facility[]) => {
        changeHandler && changeHandler("facilityIds", facilities.map(fac => fac.id));
    }

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
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="gender">Gender</Label>
                            <Input
                                id="gender"
                                name="gender"
                                type="select" 
                                value={session.gender}
                                onChange={onFieldChange}
                            >
                                {genders.map((gender, i) => 
                                    <option key={i} value={gender}>{gender}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="ratingID">Skill</Label>
                            <Input
                                id="ratingID"
                                name="ratingID"
                                type="select" 
                                value={session.ratingID}
                                onChange={onFieldChange}
                            >
                                {ratings.map((rating, i) => 
                                    <option key={i} value={rating.id}>{rating.description}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="matchType">Type</Label>
                            <Input
                                id="matchTypeID"
                                name="matchTypeID"
                                type="select" 
                                value={session.matchTypeID}
                                onChange={onFieldChange}
                            >
                                {matchTypes.map((matchType, i) => 
                                    <option key={i} value={matchType.id}>{matchType.description}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="doublesType">Doubles Type</Label>
                            <Input
                                id="doublesType"
                                name="doublesType"
                                type="select" 
                                disabled
                            >
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="dayOfWeek">Day</Label>
                            <Input
                                id="dayOfWeek"
                                name="dayOfWeek"
                                type="select" 
                                value={session.dayOfWeek}
                                onChange={onFieldChange}
                            >
                                {buildDayOptions().map((day, i) => 
                                    <option key={i} value={day.Value}>{day.Label}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Match Time</Label>
                            <div style={{display: "flex"}}>
                                <div style={{flexGrow: 2, marginRight: "10px"}}>
                                    <Input
                                        id="matchHour"
                                        name="matchHour"
                                        type="select" 
                                        className="mr-2"
                                        value={session.matchHour}
                                        onChange={onFieldChange}
                                    >
                                        {hours.map((hour, i) => 
                                            <option key={i} value={hour}>{`${hour}:00`}</option>)}
                                    </Input>
                                </div>
                                <div style={{flexGrow: 1}}>
                                    <Input
                                        id="matchAmpm"
                                        name="matchAmpm"
                                        type="select" 
                                        value={session.matchAmpm}
                                        onChange={onFieldChange}
                                    >
                                        {ampm.map((ap, i) => 
                                            <option key={i} value={ap}>{ap}</option>)}
                                    </Input>
                                </div>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label>Session Location(s)</Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Select options={facilities}
                                getOptionLabel={facility => facility.name}
                                getOptionValue={facility => facility.id.toString()}
                                value={facilities.filter(f => session.facilityIds.includes(f.id))}
                                isMulti
                                onChange={onFacilitySelectChange}/>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default SessionEntryForm;