import React from "react";
import { Input } from "reactstrap";
import { LeagueSeason } from "../../models/LeagueSeason";
import { Season } from "../../models/Season";

type Props = {
    seasons: LeagueSeason[];
    seasonsOfYear: Season[];
    loading: boolean;
    onSelect: (id: number) => void;
}

const SeasonsDropdown = (props: Props) => {
    const {seasons, seasonsOfYear, onSelect, loading } = props;

    const onSeasonSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelect && onSelect(parseInt(event.target.value));
    }

    const getSeasonName = (seasonId: number): string => {
        if (!seasonId || !seasonsOfYear || seasonsOfYear.length === 0) {
            return '';
        }

        return seasonsOfYear.find(s => s.id === seasonId).name
    }

    return (
        <Input type="select" name="seasons" id="seasonsSelect" onChange={onSeasonSelect} disabled={loading}>
            {seasons.map((season: LeagueSeason) => 
                <option key={season.id} value={season.id}>{getSeasonName(season.seasonID)} {season.year}</option>
            )}
        </Input>
    );
}

export default SeasonsDropdown;