import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getAllFacilities } from "../../api/facilityApi";
import { getSessionAttributes } from "../../api/sessionApi";
import { Facility } from "../../models/Facility";
import { MatchType } from "../../models/MatchType";
import { Rating } from "../../models/Rating";
import { Session } from "../../models/Session";
import { SessionAttributes } from "../../models/SessionAttributes";
import { getDayFromDate, getTimeFromDate } from "../../utilities/dateTimeHelpers";
import { buildLeagueDescription, getLocationNames } from "../../utilities/descriptionBuilders";

type Props = {
    onAddClick: (sessionId: number) => void;
    addedSessionIds: number[];
    sessions: Session[];
    setError: React.Dispatch<React.SetStateAction<string>>
}

const AvailableLeaguesTable = (props: Props) => {
    const {onAddClick, addedSessionIds, sessions, setError} = props;

    const [matchTypes, setMatchTypes] = useState<MatchType[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);

    useEffect(() => {
        const populateSessionAttributes = async () => {
            let attributes: SessionAttributes;
            try {
                attributes = await getSessionAttributes();
                setMatchTypes(attributes.matchTypes);
                setRatings(attributes.ratings);
            } catch(e) {
                setError('Server error. Please try again later.')
            }
        }

        const populateFacilities = async () => {
            let result: Facility[];
            try {
                result = await getAllFacilities();
            } catch(e) {
                setError('Server error. Please try again later.')
            }
    
            setFacilities(result);
        }

        populateSessionAttributes();
        populateFacilities();
    }, [setError]);    

    return (
        <>
            {
            sessions.length > 0 ? 
                <Table>
                    <thead>
                        <tr>
                            <th>League</th>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Registered</th>
                            <th>Open Slots</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(session => 
                            <tr key={session.id}>
                                <td>{buildLeagueDescription(session, ratings, matchTypes)}</td>
                                <td>{getDayFromDate(session.matchStart)}</td>
                                <td>{getTimeFromDate(session.matchStart)}</td>
                                <td>{getLocationNames(session.availableFacilityIDs, facilities)}</td>
                                <td>0/8</td>
                                <td>8</td>
                                <td>
                                    <Button outline
                                        color={addedSessionIds.includes(session.id) ? 'danger' : 'primary'}
                                        onClick={() => onAddClick(session.id)}>{
                                            addedSessionIds.includes(session.id) ? 
                                                <i className="fa-solid fa-minus"></i> : 
                                                <i className="fa-solid fa-plus"></i>}
                                    </Button>
                                </td>
                            </tr>)}
                    </tbody>
                </Table> 
                : "No leagues are currently available for registration. Visit again next week for updates!"
            }
        </>
    );
}

export default AvailableLeaguesTable