import React, { useEffect, useState } from "react";
import { createSession, deleteSession, getSessionsBySeasonId, updateSession } from "../../api/sessionApi";
import { Facility } from "../../models/Facility";
import { MatchType } from "../../models/MatchType";
import { Rating } from "../../models/Rating";
import { LeagueSeason } from "../../models/LeagueSeason";
import { Session } from "../../models/Session";
import SessionsTable from "./SessionsTable";
import ModalTemplate from "../shared/ModalTemplate";
import SessionEntryForm from "./SessionEntryForm";
import { Button } from "reactstrap";
import { mapToSessionDto, mapToSessionEntryFields } from "./translation";
import { SessionEntryFormFields } from "./SessionEntryFormFields";
import validateSession from "./SessionValidation"

type Props = {
    selectedSeason: LeagueSeason,
    matchTypes: MatchType[],
    ratings: Rating[],
    facilities: Facility[],
    error: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

enum ModalMode {
    "Add Session",
    "Edit Session"
}

const SessionsView = (props: Props) => {
    const { selectedSeason, matchTypes, ratings, facilities, error, setError, setLoading } = props;

    const [sessions, setSessions] = useState<Session[]>([]);
    const [isSessionModalOpen, setSessionModalOpen] = useState(false);
    const [sessionErrors, setSessionErrors] = useState<string[]>([]);
    const [sessionToEdit, setSessionToEdit] = useState<SessionEntryFormFields>(new SessionEntryFormFields());
    const [refreshSessions, setRefreshSessions] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>(ModalMode["Add Session"]);

    useEffect(() => {
        const populateSessions = async (seasonId: number) => {
            if (!seasonId) return;

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

        populateSessions(selectedSeason?.id);
        setRefreshSessions(false);
    }, [selectedSeason, refreshSessions, setError, setLoading, setSessions])

    const onDeleteClick = async (id: number) => {
        try {
            await deleteSession(id);
        } catch (e) {
            console.log("Delete error"); // TODO Output to user somehow
            return;
        }

        setRefreshSessions(true);
    }
    
    const onEditClick = (id: number) => {
        let session = sessions.find(s => s.id === id);
        setSessionToEdit(mapToSessionEntryFields(session));
        setModalMode(ModalMode["Edit Session"]);
        toggleSessionModal();
    }

    const onAddSessionClick = () => {
        setSessionToEdit(new SessionEntryFormFields(selectedSeason.id))
        setModalMode(ModalMode["Add Session"]);
        toggleSessionModal();
    }

    const toggleSessionModal = () => {
        setSessionModalOpen(!isSessionModalOpen);
    }

    const sessionModalSubmit = async () => {
        let errors = validateSession(sessionToEdit);
        if (errors.length > 0) {
            setSessionErrors(errors);
            return;
        } else {
            setSessionErrors([])
        }

        try {
            let sessionDto = mapToSessionDto(sessionToEdit, selectedSeason.startDate);
            if (modalMode === ModalMode["Add Session"]){
                await createSession(sessionDto);
            } else {
                await updateSession(sessionDto);
            }
        } catch (e) {
            setSessionErrors(["Server error while saving session"]);
            return;
        }

        setSessionToEdit(new SessionEntryFormFields(selectedSeason.id));
        toggleSessionModal();
        setRefreshSessions(true);
    }

    const CreateSessionEntryForm = () => {
        return <SessionEntryForm 
                    matchTypes={matchTypes}
                    ratings={ratings}
                    facilities={facilities}
                    submit={sessionModalSubmit} 
                    errors={sessionErrors} 
                    session={sessionToEdit}
                    changeHandler={sessionChangeHandler}
                />
    }

    const sessionChangeHandler = (key:string, value:any) => {
        setSessionToEdit(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    let contents: JSX.Element;

    if (error != null) {
        contents = <div className="alert alert-danger" role="alert">{error}</div>
    } else if (sessions.length > 0) {
        contents = <>
                        <SessionsTable 
                            sessions={sessions} 
                            matchTypes={matchTypes} 
                            ratings={ratings} 
                            facilities={facilities} 
                            onDeleteClick={onDeleteClick} 
                            onEditClick={onEditClick} 
                        />
                    </>
    } else {
        contents = <p className="mt-3">No sessions created yet!</p>
    }

    return (
        <>
            <ModalTemplate
                isOpen={isSessionModalOpen} 
                submit={sessionModalSubmit} 
                headerText={ModalMode[modalMode]}
                submitButtonText={ModalMode[modalMode]}
                toggleOpen={toggleSessionModal}
                content={CreateSessionEntryForm()}
            />
            {contents}
            <Button color="primary" onClick={() => onAddSessionClick()}>Add Session</Button>
        </>
    )
}

export default SessionsView;