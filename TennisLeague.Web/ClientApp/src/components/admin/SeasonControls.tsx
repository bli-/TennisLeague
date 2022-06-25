import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Label } from "reactstrap";
import { createSeason, getSeasons, getSeasonAttributes } from "../../api/seasonApi";
import { LeagueSeason } from "../../models/LeagueSeason";
import { Season } from "../../models/Season";
import { SeasonAttributes } from "../../models/SeasonAttributes";
import { SeasonStatus } from "../../models/SeasonStatus";
import ModalTemplate from "../shared/ModalTemplate";
import SeasonEntryForm from "./SeasonEntryForm";
import { SeasonFormEntryFields } from "./SeasonEntryFormFields";
import SeasonHeader from "./SeasonHeader";
import SeasonsDropdown from "./SeasonsDropdown";
import validateSeason from "./SeasonValidation";
import { mapToSeasonDto, mapToSeasonEntryFields } from "./translation";

type Props = {
    selectedSeason: LeagueSeason,
    loading: boolean,
    setSelectedSeason: React.Dispatch<React.SetStateAction<LeagueSeason>>
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

enum ModalMode {
    "Add Season",
    "Edit Season"
}

const SeasonControls = (props: Props) => {
    const { selectedSeason, loading, setSelectedSeason, setError, setLoading} = props;

    const [seasonsOfYear, setSeasonsOfYear] = useState<Season[]>([]);
    const [seasonStatuses, setSeasonStatuses] = useState<SeasonStatus[]>([]);
    const [seasons, setSeasons] = useState<LeagueSeason[]>([]);
    const [isSeasonModalOpen, setSeasonModalOpen] = useState(false);
    const [seasonErrors, setSeasonErrors] = useState<string[]>([]);
    const [seasonToEdit, setSeasonToEdit] = useState<SeasonFormEntryFields>(new SeasonFormEntryFields());
    const [refreshSeasons, setRefreshSeasons] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>(ModalMode["Add Season"]);

    useEffect(() => {
        const populateSeasons = async () => {
            let seasons: LeagueSeason[];
            try {
                seasons = await getSeasons();

                setSeasons(seasons);
                if (seasons.length > 0) {
                    setSelectedSeason(seasons[0]);
                }
            } catch(e) {
                setError("Server error. Please try again later.");
                return;
            }
            setLoading(false);
        }

        populateSeasons();
        setRefreshSeasons(false);
    }, [refreshSeasons, setSeasons, setLoading, setError, setSelectedSeason])

    useEffect(() => {
        const populateSeasonAttributes = async () => {
            let attributes: SeasonAttributes;
            try {
                attributes = await getSeasonAttributes();
            } catch (e) {
                setError("Server error. Please try again later.");
                return;
            }
            
            setSeasonsOfYear(attributes.seasons);
            setSeasonStatuses(attributes.statuses);
            setLoading(false);
        }

        populateSeasonAttributes();
    }, [setError, setLoading])

    const onSeasonSelect = (id: number) => {
        const season = seasons.find(s => s.id === id);
        setSelectedSeason(season);
    }

    const seasonModalSubmit = async () => {
        var errors = validateSeason(seasonToEdit, seasons);
        if (errors.length > 0) {
            setSeasonErrors(errors);
            return;
        } else {
            setSeasonErrors([])
        }

        try {
            await createSeason(mapToSeasonDto(seasonToEdit));
        } catch (e) {
            setError("Server error while creating season");
            return;
        }

        setSeasonToEdit(new SeasonFormEntryFields());
        toggleSeasonModal();
        setRefreshSeasons(true);
    }

    const seasonChangeHandler = (key:string, value:any) => {
        setSeasonToEdit(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    const toggleSeasonModal = () => {
        if (!isSeasonModalOpen) {
            setSeasonErrors([]);
        }
        setSeasonModalOpen(!isSeasonModalOpen);
    }

    const createSeasonEntryForm = () => {
        return <SeasonEntryForm 
                    submit={seasonModalSubmit} 
                    errors={seasonErrors} 
                    season={seasonToEdit} 
                    seasonsOfYear={seasonsOfYear}
                    changeHandler={seasonChangeHandler}
                />
    }

    const onAddSeasonClick = () => {
        setSeasonToEdit(new SeasonFormEntryFields());
        setModalMode(ModalMode["Add Season"]);
        toggleSeasonModal();
    }

    const onEditSeasonClick = (id: number) => {
        let season = seasons.find(s => s.id === id);
        setSeasonToEdit(mapToSeasonEntryFields(season));
        setModalMode(ModalMode["Edit Season"]);
        toggleSeasonModal();
    }

    return (
        <>
            <ModalTemplate
                isOpen={isSeasonModalOpen} 
                submit={seasonModalSubmit} 
                headerText={ModalMode[modalMode]}
                submitButtonText={ModalMode[modalMode]}
                toggleOpen={toggleSeasonModal}
                content={createSeasonEntryForm()}
            />
            <Form>
                <FormGroup row>
                    <Label sm={1} for="seasonsSelect">Season:</Label>
                    <Col sm={2}>
                        <SeasonsDropdown seasons={seasons} seasonsOfYear={seasonsOfYear} onSelect={onSeasonSelect} loading={loading} />
                    </Col>
                    <Col sm={{size: 3, offset: 6}} className="d-flex justify-content-end">
                        <Button outline color="primary" onClick={onAddSeasonClick} disabled={loading}>Create New Season</Button>
                    </Col>
                </FormGroup>
            </Form>
            <SeasonHeader seasonsOfYear={seasonsOfYear} currentSeason={selectedSeason} statuses={seasonStatuses} onEditClick={onEditSeasonClick}/>
        </>
    )
}

export default SeasonControls;
