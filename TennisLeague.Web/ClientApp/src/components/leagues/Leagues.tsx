import { useState } from "react";
import { Button } from "reactstrap";
import AvailableLeaguesTable from "./AvailableLeaguesTable";

const LeaguesPage = () => {
    const [addedLeagues, setAddedLeagues] = useState<number[]>([]);

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
        console.log('joined leagues');
    }

    return (
        <>
            <h1>Available Leagues</h1>
            <AvailableLeaguesTable 
                onAddClick={toggleLeagueAddition}
                addedSessionIds={addedLeagues} />
            <div className="d-flex justify-content-center">
                <Button color="primary" 
                    className="px-5 py-3" 
                    onClick={joinLeagues} 
                    disabled={addedLeagues.length === 0}>{getJoinLeagueButtonText(addedLeagues.length)}</Button>
            </div>
        </>
    )
}

export default LeaguesPage;