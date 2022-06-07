import { Facility } from "../models/Facility";
import { MatchType } from "../models/MatchType";
import { Rating } from "../models/Rating";
import { Session } from "../models/Session";

export function buildLeagueDescription (session: Session, ratings: Rating[], matchTypes: MatchType[]): string {
    if (ratings && matchTypes && session) {
        let rating = ratings.find(r => r.id === session.ratingID).description;
        let matchType = matchTypes.find(m => m.id === session.matchTypeID).description;
        return `${session.gender} ${rating} ${matchType}`;
    } else {
        return '';
    }
}

export function getLocationNames (facilityIds: number[], facilities: Facility[]): string {
    if (!facilityIds || facilityIds.length === 0) return;

    let facilityNames = facilities.filter(fac => facilityIds.includes(fac.id)).map(fac => fac.name);
    return facilityNames.length > 1 ? facilityNames.join(', ') : facilityNames[0];
}
