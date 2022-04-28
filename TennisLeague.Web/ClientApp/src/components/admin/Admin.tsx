import { useEffect, useState } from "react";
import { Input, Label } from "reactstrap";
import { getAllSeasons } from "../../api/seasonApi";
import { Season } from "./Season";
import SessionsTable from "./SessionsTable";

const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        populateSeasons();
        setRefresh(false);
    }, [refresh])

    const populateSeasons = async () => {
        let seasons: Season[];
        try {
            seasons = await getAllSeasons();
        } catch(e) {
            setError("Server error. Please try again later.");
            setLoading(false);
            return;
        }

        setSeasons(seasons);
        setLoading(false);
    }

    const onDeleteClick = () => {

    }
    
    const onEditClick = () => {

    }

    let contents: JSX.Element;

    if (loading) {
        contents = <p><em>Loading...</em></p>
    } else if (error != null) {
        contents = <div className="alert alert-danger" role="alert">{error}</div>
    } else if (sessions.length > 0) {
        contents = <SessionsTable sessions={sessions} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
    } else {
        contents = <p>No sessions created in this season</p>
    }

    return (
        <>
            <h1>Season Management</h1>
            <div>
                <Label>Season:</Label>
                <Input type="select" name="seasons" id="seasonsSelect">
                    {seasons.map((s: Season) => 
                        <option>{s.description}</option>
                    )}
                </Input>
            </div>
        </>
    );
}

export default Admin;