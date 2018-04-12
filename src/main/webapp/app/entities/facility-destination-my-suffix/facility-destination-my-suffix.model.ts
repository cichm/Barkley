import { BaseEntity } from './../../shared';

export class FacilityDestinationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public facilityId?: number,
    ) {
    }
}
