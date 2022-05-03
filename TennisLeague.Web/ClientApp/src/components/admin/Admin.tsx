import { useEffect, useState } from "react";
import { Col, Form, FormGroup, Label } from "reactstrap";

import { getAllSeasons } from "../../api/seasonApi";
import { deleteSession, getSessionAttributes, getSessionsBySeasonId } from "../../api/sessionApi";

import SeasonsDropdown from "./SeasonsDropdown";
import SessionsTable from "./SessionsTable";

import { Season } from "../../models/Season";
import { MatchType } from "../../models/MatchType";
import { Session } from "../../models/Session";
import { Rating } from "../../models/Rating";
import { SessionAttributes } from "../../models/SessionAttributes";

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>(null);
    const [selectedSeason, SetSeason] = useState<Season>(null);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [matchTypes, setMatchTypes] = useState<MatchType[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);

    useEffect(() => {
        populateSeasons();
        populateAttributes();
        setRefresh(false);
    }, [refresh])

    useEffect(() => {
        populateSessions(selectedSeason.id);
    }, [selectedSeason])

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

    const populateAttributes = async() => {
        let attributes: SessionAttributes;

        try {
            attributes = await getSessionAttributes();
        } catch(e) {
            setError("Server error. Please try again later.");
            setLoading(false);
            return;
        }

        setMatchTypes(attributes.matchTypes);
        setRatings(attributes.ratings);
        setLoading(false);
    }

    const populateSessions = async (seasonId: number) => {
        let sessions: Session[];
        
        try {
            sessions = await getSessionsBySeasonId(seasonId);
        } catch(e) {
            setError("Server error. Please try again later.");
            setLoading(false);
            return;
        }

        setSessions(sessions);
        setLoading(false);
    }

    const onDeleteClick = async (id: number) => {
        try {
            await deleteSession(id);
        } catch (e) {
            console.log("Delete error"); // TODO Output to user somehow
            return;
        }

        setRefresh(true);
    }
    
    const onEditClick = () => {

    }

    const onSeasonSelect = (id: number) => {
        const season = seasons.find(s => s.id == id);
        SetSeason(season);
    }

    let contents: JSX.Element;

    if (error != null) {
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
                <Form>
                    <FormGroup row>
                        <Label sm={1} for="seasonsSelect">Season:</Label>
                        <Col sm={3}>
                            <SeasonsDropdown seasons={seasons} onSelect={onSeasonSelect} loading={loading} />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        </>
    );
}

export default Admin;