import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getSeasons } from "../../api/seasonApi";
import { getSessionsBySeasonId } from "../../api/sessionApi";
import { SeasonFilter } from "../../models/SeasonFilter";
import { SeasonStatuses } from "../../models/SeasonStatusEnum";
import { Session } from "../../models/Session";
import AvailableLeaguesTable from "./AvailableLeaguesTable";

const LeaguesPage = () => {
    const [addedLeagues, setAddedLeagues] = useState<number[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [error, setError] = useState('');
    const [statusAlert, setStatusAlert] = useState('');

    useEffect(() => {
        populateAvailableSeasons();
    }, []);

    const toggleLeagueAddition = (sessionId: number) => {
        if (addedLeagues.includes(sessionId)) {
            setAddedLeagues(oldArray => oldArray.filter(id => id !== sessionId))
        } else {
            setAddedLeagues(oldArray => [...oldArray, sessionId]);
        }
    }

    const getJoinLeagueButtonText = (numberOfLeagues: number) => {
        if (numberOfLeagues === 0) {
            return 'No leagues added';
        } else if (numberOfLeagues === 1) {
            return 'Join League!';
        } else {
            return `Join ${numberOfLeagues} Leagues!`;
        }
    }

    const joinLeagues = () => {
        setAddedLeagues([]);
        setStatusAlert('Join League button Works!');
    }

    const populateAvailableSeasons = async () => {
        let sessions: Session[] = [];
        try {
            let seasonFilter = new SeasonFilter();
            seasonFilter.statusId = SeasonStatuses.Active;
            let currentSeason = await getSeasons(seasonFilter);
            sessions = await getSessionsBySeasonId(currentSeason[0].id);
        } catch(e) {
            setError('Server error. Please try again later')
        }

        setSessions(sessions);
    }

    return (
        <>
            <h1>Available Leagues</h1>
            {<div className={"alert alert-info " + (!statusAlert ? 'hidden' : '')} role="alert">{statusAlert}</div>}
            {<div className={"alert alert-danger " + (!error ? 'hidden' : '')} role="alert">{error}</div>}
            <AvailableLeaguesTable 
                onAddClick={toggleLeagueAddition}
                addedSessionIds={addedLeagues} 
                sessions={sessions}
                setError={setError}/>
            {sessions.length > 0 ? 
                <div className="d-flex justify-content-center">
                <Button color="primary" 
                    className="px-5 py-3" 
                    disabled={addedLeagues.length === 0}
                    onClick={joinLeagues}>
                        {getJoinLeagueButtonText(addedLeagues.length)}
                    </Button>
                </div> : null
            }
            
        </>
    )
}

export default LeaguesPage;