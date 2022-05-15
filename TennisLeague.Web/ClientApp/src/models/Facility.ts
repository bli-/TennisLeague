export class Facility {
    constructor() {
        this.name = '';
        this.addressLine1 = '';
        this.city = '';
        this.state = '';
        this.zip = '';
        this.numberOfCourts = 0;
    }

    id?: number;
    name: string;
    addressLine1: string;
    city: string;
    state: string;
    zip: string;
    numberOfCourts: number;
}