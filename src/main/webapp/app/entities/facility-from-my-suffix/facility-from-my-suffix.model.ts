import { BaseEntity } from './../../shared';

export class FacilityFromMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public facilityId?: number,
    ) {
    }
}
