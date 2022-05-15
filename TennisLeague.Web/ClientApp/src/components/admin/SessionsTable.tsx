import { Button, Table } from "reactstrap";
import { Facility } from "../../models/Facility";
import { MatchType } from "../../models/MatchType";
import { Rating } from "../../models/Rating";
import { Session } from "../../models/Session";
import { getDayFromDate, getTimeFromDate } from "../../utilities/dateTimeHelpers";

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

    const buildLeagueDescription = (session: Session): string => {
        if (ratings && matchTypes && session) {
            let rating = ratings.find(r => r.id === session.ratingID).description;
            let matchType = matchTypes.find(m => m.id === session.matchTypeID).description;
            return `${session.gender}'s ${rating} ${matchType}`;
        } else {
            return '';
        }
    }

    const getLocations = (facilityIds: number[]): string => {
        if (!facilityIds || facilityIds.length === 0) return;

        let facilityNames = facilities.filter(fac => facilityIds.includes(fac.id)).map(fac => fac.name);
        return facilityNames.length > 1 ? facilityNames.join(', ') : facilityNames[0];
    }

    return (
    <>
        <Table striped>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Location</th> 
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sessions.map(s =>
                    <tr key={s.id.toString()}>
                        <td>{buildLeagueDescription(s)}</td> 
                        <td>{getDayFromDate(s.matchStart)}</td>
                        <td>{getTimeFromDate(s.matchStart)}</td>
                        <td>{getLocations(s.availableFacilityIDs)}</td> 
                        <td>
                            <Button outline color="secondary" className="me-1" onClick={() => onEditClick(s.id)}>Edit</Button>
                            <Button outline color="secondary" onClick={() => onDeleteClick(s.id)}>Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>
    );
}

export default SessionsTable;