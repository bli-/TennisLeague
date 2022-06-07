import { Session } from "../../models/Session";
import { findFirstDayAfterDate } from "../../utilities/dateTimeHelpers";
import { SessionEntryFormFields } from "./SessionEntryFormFields";

export function mapToSessionDto (sessionFields: SessionEntryFormFields, seasonStartDate: Date): Session {
    let hour24Format = sessionFields.matchAmpm === 'AM' ? sessionFields.matchHour : sessionFields.matchHour + 12;
    let matchStartDate = findFirstDayAfterDate(seasonStartDate, sessionFields.dayOfWeek);
    matchStartDate.setHours(hour24Format, 0, 0, 0);

    let ret = new Session();
    ret.id = sessionFields.id;
    ret.leagueSeasonID = sessionFields.leagueSeasonID;
    ret.matchStart = new Date(matchStartDate);
    ret.matchTypeID = sessionFields.matchTypeID;
    ret.ratingID = sessionFields.ratingID;
    ret.gender = sessionFields.gender;
    ret.availableFacilityIDs = sessionFields.facilityIds;
    return ret;
}

export function mapToSessionEntryFields(session: Session): SessionEntryFormFields {
    let fields = new SessionEntryFormFields();
    fields.id = session.id
    fields.gender = session.gender;
    fields.leagueSeasonID = session.leagueSeasonID;
    fields.ratingID = session.ratingID;
    fields.matchTypeID = session.matchTypeID;
    fields.facilityIds = session.availableFacilityIDs;
    fields.matchHour = session.matchStart.getHours() >= 12 ? session.matchStart.getHours() - 12 : session.matchStart.getHours();
    fields.matchAmpm = session.matchStart.getHours() >= 12 ? 'PM' : 'AM';
    fields.dayOfWeek = session.matchStart.getDay();
    return fields;
}