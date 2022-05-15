import { useEffect, useState } from "react";

import { getSessionAttributes } from "../../api/sessionApi";
import { getAllFacilities } from "../../api/facilityApi";

import { MatchType } from "../../models/MatchType";
import { Rating } from "../../models/Rating";
import { SessionAttributes } from "../../models/SessionAttributes";
import { Facility } from "../../models/Facility";
import { LeagueSeason } from "../../models/LeagueSeason";
import SeasonControls from "./SeasonControls";
import SessionsView from "./SessionsView";

const Admin = () => {
    const [selectedSeason, setSelectedSeason] = useState<LeagueSeason>(null);
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [matchTypes, setMatchTypes] = useState<MatchType[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        populateAttributes();
        populateFacilities();
    }, [])

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

    const populateFacilities = async() => {
        let facilities: Facility[];

        try {
            facilities = await getAllFacilities();
        } catch(e) {
            setError("Server error. Please try again later.");
            setLoading(false);
            return;
        }

        setFacilities(facilities);
        setLoading(false);
    }

    return (
        <>
            <h1>Season Management</h1>
            <div>
                <SeasonControls 
                    loading={loading} 
                    setSelectedSeason={setSelectedSeason} 
                    setError={setError} 
                    setLoading={setLoading} />
                <SessionsView 
                    selectedSeason={selectedSeason} 
                    matchTypes={matchTypes} 
                    ratings={ratings} 
                    facilities={facilities} 
                    error={error}
                    setError={setError} 
                    setLoading={setLoading} />
            </div>
        </>
    );
}

export default Admin;