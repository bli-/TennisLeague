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
import SeasonsDropdown from "./SeasonsDropdown";
import validateSeason from "./SeasonValidation";

type Props = {
    loading: boolean,
    setSelectedSeason: React.Dispatch<React.SetStateAction<LeagueSeason>>
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SeasonControls = (props: Props) => {
    const { loading, setSelectedSeason, setError, setLoading} = props;

    const [seasonsOfYear, setSeasonsOfYear] = useState<Season[]>([]);
    const [seasonStatuses, setSeasonStatuses] = useState<SeasonStatus[]>([]);
    const [seasons, setSeasons] = useState<LeagueSeason[]>([]);
    const [isSeasonModalOpen, setSeasonModalOpen] = useState(false);
    const [seasonErrors, setSeasonErrors] = useState<string[]>([]);
    const [seasonToAdd, setSeasonToAdd] = useState<SeasonFormEntryFields>(new SeasonFormEntryFields());
    const [refreshSeasons, setRefreshSeasons] = useState(false);

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
        var errors = validateSeason(seasonToAdd, seasons);
        if (errors.length > 0) {
            setSeasonErrors(errors);
            return;
        } else {
            setSeasonErrors([])
        }

        try {
            await createSeason(mapToSeasonDto(seasonToAdd));
        } catch (e) {
            setError("Server error while creating season");
            return;
        }

        setSeasonToAdd(new SeasonFormEntryFields());
        toggleSeasonModal();
        setRefreshSeasons(true);
    }
    
    const mapToSeasonDto = (seasonFields: SeasonFormEntryFields): LeagueSeason => {
        let ret = new LeagueSeason();
        ret.startDate = seasonFields.startDate;
        ret.year = seasonFields.year;
        ret.seasonID = seasonFields.seasonID;
        ret.durationInWeeks = seasonFields.seasonLength;
        return ret;
    }

    const seasonChangeHandler = (key:string, value:any) => {
        setSeasonToAdd(prevState => ({
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

    const CreateSeasonEntryForm = () => {
        return <SeasonEntryForm 
                    submit={seasonModalSubmit} 
                    errors={seasonErrors} 
                    season={seasonToAdd} 
                    seasonsOfYear={seasonsOfYear}
                    changeHandler={seasonChangeHandler}
                />
    }

    const onAddSeasonClick = () => {
        toggleSeasonModal();
    }

    return (
        <>
            <ModalTemplate
                isOpen={isSeasonModalOpen} 
                submit={seasonModalSubmit} 
                headerText={`Add Season`}
                submitButtonText={`Add Season`}
                toggleOpen={toggleSeasonModal}
                content={CreateSeasonEntryForm()}
            />
            <Form>
                <FormGroup row>
                    <Label sm={1} for="seasonsSelect">Season:</Label>
                    <Col sm={2}>
                        <SeasonsDropdown seasons={seasons} seasonsOfYear={seasonsOfYear} onSelect={onSeasonSelect} loading={loading} />
                    </Col>
                    <Col sm={{size: 2, offset: 7}}>
                        <Button outline color="primary" onClick={onAddSeasonClick} disabled={loading}>Create New Season</Button>
                    </Col>
                </FormGroup>
            </Form>
        </>
    )
}

export default SeasonControls;