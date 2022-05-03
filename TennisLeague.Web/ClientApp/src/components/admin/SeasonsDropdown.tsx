import React from "react";
import { Input } from "reactstrap";
import { Season } from "../../models/Season";

type Props = {
    seasons: Season[];
    loading: boolean;
    onSelect: (id: number) => void;
}

const SeasonsDropdown = (props: Props) => {
    const {seasons, onSelect, loading } = props;

    const onSeasonSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelect && onSelect(parseInt(event.target.value));
    }

    return (
        <>
            <Input type="select" name="seasons" id="seasonsSelect" onChange={onSeasonSelect} disabled={loading}>
                {seasons.map((s: Season) => 
                    <option value={s.id}>{s.description}</option>
                )}
            </Input>
        </>
    );
}

export default SeasonsDropdown;