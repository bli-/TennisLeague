import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { LeagueSeason } from "../../models/LeagueSeason";
import { Season } from "../../models/Season";
import { SeasonStatus } from "../../models/SeasonStatus";
import { SeasonStatuses } from "../../models/SeasonStatusEnum";
import { addDaysToDate } from "../../utilities/dateTimeHelpers";
import SeasonStatusBadge from "./SeasonStatusBadge";

type Props = {
    seasonsOfYear: Season[]
    currentSeason: LeagueSeason,
    statuses: SeasonStatus[],
    onEditClick: (id: number) => void
}

const SeasonHeader = (props: Props) => {
    const { seasonsOfYear, currentSeason, statuses, onEditClick } = props;
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        setShowEdit(currentSeason?.statusID !== SeasonStatuses.Completed);
    }, [currentSeason])

    const buildHeader = (seasonsOfYear: Season[], season: LeagueSeason): string => {
        if (seasonsOfYear.length === 0 || !season) return;

        return `${seasonsOfYear.find(s => s.id === season.seasonID).name} ${season.year}`
    }

    const buildSeasonDates = (season: LeagueSeason): string => {
        if (!season) return;
        return `${season.startDate.toLocaleDateString()} to ${addDaysToDate(season.startDate, season.durationInWeeks * 7).toLocaleDateString()}`
    }

    return (
        <>
        {
            currentSeason ? 
                <div className="text-center mb-3">
                    <h3>
                        {buildHeader(seasonsOfYear, currentSeason)}
                    </h3>
                    <div className="center">
                        {buildSeasonDates(currentSeason)}
                        <Button outline color="primary" onClick={() => onEditClick(currentSeason.id)} size="sm" className={"ml-2 " + (showEdit ? undefined : 'hidden')}><i className="fa-solid fa-pen"></i></Button> 
                    </div>
                    <SeasonStatusBadge statuses={statuses} seasonStatusId={currentSeason?.statusID} />
                </div> : null
        }
        </>
    )
}

export default SeasonHeader;