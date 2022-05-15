import { SessionEntryFormFields } from "./SessionEntryFormFields";

export default function validateSession (session: SessionEntryFormFields): string[] {
    let errors: string[] = [];

    if (session.facilityIds.length === 0) {
        errors.push("At least one facility must be assigned");
    }

    return errors;
}