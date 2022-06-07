import { Button, Table } from "reactstrap";
import { Facility } from "../../models/Facility";
import { MatchType } from "../../models/MatchType";
import { Rating } from "../../models/Rating";
import { Session } from "../../models/Session";
import { getDayFromDate, getTimeFromDate } from "../../utilities/dateTimeHelpers";
import { buildLeagueDescription, getLocationNames } from "../../utilities/descriptionBuilders";

type Props = {
    sessions: Session[];
    matchTypes: MatchType[];
    ratings: Rating[];
    facilities: Facility[];
    onDeleteClick: (id: number) => void;
    onEditClick: (id: number) => void;
}

const SessionsTable = (props: Props) => {
    const {sessions, matchTypes, ratings, facilities, onDeleteClick, onEditClick} = props;

    return (
    <>
        <Table striped>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Location</th> 
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {sessions.map(s =>
                    <tr key={s.id.toString()}>
                        <td>{buildLeagueDescription(s, ratings, matchTypes)}</td> 
                        <td>{getDayFromDate(s.matchStart)}</td>
                        <td>{getTimeFromDate(s.matchStart)}</td>
                        <td>{getLocationNames(s.availableFacilityIDs, facilities)}</td> 
                        <td className="d-flex justify-content-end">
                            <Button outline color="secondary" className="me-1" onClick={() => onEditClick(s.id)}><i className="fa-solid fa-pen"></i></Button>
                            <Button outline color="secondary" onClick={() => onDeleteClick(s.id)}><i className="fa-solid fa-trash"></i></Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>
    );
}

export default SessionsTable;