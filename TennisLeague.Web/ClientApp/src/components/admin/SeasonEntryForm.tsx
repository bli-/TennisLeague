import { Alert, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Row, Col, Button, ButtonGroup } from "reactstrap"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { SeasonFormEntryFields } from "./SeasonEntryFormFields";
import { Season } from "../../models/Season";
import { addDaysToDate } from "../../utilities/dateTimeHelpers";

type Props = {
    season: SeasonFormEntryFields,
    seasonsOfYear: Season[];
    submit: () => void,
    errors: string[],
    changeHandler: (key: string, value: any) => void
}

const SeasonEntryForm = (props: Props) => {
    const { submit, errors, season, changeHandler, seasonsOfYear: seasonsOfyear } = props;
    const currentAndNextYear = [new Date().getFullYear(), new Date().getFullYear() + 1];
    const [minDate, setMinDate] = useState<Date>(new Date(`1/1/${season.year}`));
    const [maxDate, setMaxDate] = useState<Date>(new Date(`12/31/${season.year}`));
    
    const onFieldChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => 
        changeHandler && changeHandler(event.target.name, Number(event.target.value))

    const onDateChange = (date: Date, fieldName: string) => {
        changeHandler && changeHandler(fieldName, date);
    }

    const onYearButtonClick = (year: number) => {
        if (!changeHandler) return;

        changeHandler("startDate", new Date(year, season.startDate.getMonth(), season.startDate.getDate()));
        changeHandler("year", year);
        setMinDate(new Date(`1/1/${year}`));
        setMaxDate(new Date(`12/31/${year}`));
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
                            <Label for="season">Season</Label>
                            <Input
                                id="seasonID"
                                name="seasonID"
                                type="select" 
                                onChange={onFieldChangeNumber}
                            >
                                {seasonsOfyear.map((s, i) => 
                                    <option key={i} value={s.id}>{s.name}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="d-flex flex-column">
                            <Label for="season">Year</Label>
                            <ButtonGroup>
                                {currentAndNextYear.map((year) => 
                                    <Button 
                                        key={year} 
                                        color="primary"
                                        size="sm"
                                        outline={season.year !== year}
                                        active={season.year === year}
                                        onClick={() => onYearButtonClick(year)} 
                                    >
                                        {year}
                                    </Button>
                                )}
                            </ButtonGroup>
                        </FormGroup>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="registrationDate">Registration Date</Label>
                            <DatePicker
                                id="registrationDate"
                                name="registrationDate"
                                className="form-control"
                                selected={season.registrationDate}
                                onChange={(value) => onDateChange(value, 'registrationDate')}
                                minDate={addDaysToDate(season.registrationDate, -60)}
                                maxDate={maxDate}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="startDate">Start Date</Label>
                            <DatePicker
                                id="startDate"
                                name="startDate"
                                className="form-control"
                                selected={season.startDate}
                                onChange={(value) => onDateChange(value, 'startDate')}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="seasonLength">Length of Season</Label>
                            <InputGroup>
                                <Input
                                    id="seasonLength"
                                    name="seasonLength"
                                    type="number"
                                    value={season.seasonLength}
                                    onChange={onFieldChangeNumber}
                                />
                                <InputGroupAddon addonType="append">Weeks</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                    </Col>
                </Row>

            </Form>

            <div className="mt-4 text-center">
                <h4>Season Dates</h4>
                <p>{season.startDate.toLocaleDateString()} to {addDaysToDate(season.startDate, season.seasonLength * 7).toLocaleDateString()}</p>
            </div>
        </>
    )
}

export default SeasonEntryForm;