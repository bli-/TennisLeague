import { Facility } from "../../models/Facility";

export default function validateFacility (facility: Facility) {
    var errors = [];
    if (!facility.name) {
        errors.push("Name required");
    } else if (facility.name.length > 200) {
        errors.push("Name must be less than 200 characters");
    }

    if (!facility.addressLine1) {
        errors.push("Address required");
    } else if (facility.addressLine1.length > 100) {
        errors.push("Address must be less than 100 characters");
    }

    if (!facility.city) {
        errors.push("City required");
    } else if (facility.city.length > 100) {
        errors.push("City must be less than 100 characters");
    }

    if (!facility.zip) {
        errors.push("Zip required");
    } else if (facility.zip.length !== 5 || facility.zip < '00000' || facility.zip > '99999') {
        errors.push("Zip Code must be between 00000 and 99999");
    }

    if (!facility.numberOfCourts) {
        errors.push("Number of courts required");
    } else if (isNaN(facility.numberOfCourts)) {
        errors.push("Number of courts must be numeric");
    } else if (facility.numberOfCourts < 0) {
        errors.push("Number of courts must be greater than zero");
    }

    return errors;
}