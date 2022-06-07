import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getAllFacilities } from "../../api/facilityApi";
import { getSeasons } from "../../api/seasonApi";
import { getSessionAttributes, getSessionsBySeasonId } from "../../api/sessionApi";
import { Facility } from "../../models/Facility";
import { MatchType } from "../../models/MatchType";
import { Rating } from "../../models/Rating";
import { SeasonFilter } from "../../models/SeasonFilter";
import { Session } from "../../models/Session";
import { SessionAttributes } from "../../models/SessionAttributes";
import { getDayFromDate, getTimeFromDate } from "../../utilities/dateTimeHelpers";
import { buildLeagueDescription, getLocationNames } from "../../utilities/descriptionBuilders";

type Props = {
    onAddClick: (sessionId: number) => void;
    addedSessionIds: number[];
}

const AvailableLeaguesTable = (props: Props) => {
    const {onAddClick, addedSessionIds} = props;

    const [sessions, setSessions] = useState<Session[]>([]);
    const [matchTypes, setMatchTypes] = useState<MatchType[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [facilities, setFacilities] = useState<Facility[]>([]);

    useEffect(() => {
        populateAvailableSeasons();
        populateSessionAttributes();
        populateFacilities();
    }, []);

    const populateAvailableSeasons = async () => {
        let sessions: Session[] = [];
        try {
            let seasonFilter = new SeasonFilter();
            seasonFilter.statusId = 1;
            let currentSeason = await getSeasons(seasonFilter);
            sessions = await getSessionsBySeasonId(currentSeason[0].id);
        } catch(e) {
            console.log(e);
        }

        setSessions(sessions);
    }

    const populateSessionAttributes = async () => {
        let attributes: SessionAttributes;
        try {
            attributes = await getSessionAttributes();
            setMatchTypes(attributes.matchTypes);
            setRatings(attributes.ratings);
        } catch(e) {
            console.log(e);
        }
    }

    const populateFacilities = async () => {
        let result: Facility[];
        try {
            result = await getAllFacilities();
        } catch(e) {
            console.log(e);
        }

        setFacilities(result);
    }

    return (
        <>
            {sessions.length > 0 ? 
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
                : "No available sessions"
            }
        </>
    );
}

export default AvailableLeaguesTable