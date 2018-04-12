import { BaseEntity } from './../../shared';

export class CustomerAdditionalInfoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public birthdate?: any,
        public street?: string,
        public housenum?: string,
        public postalCode?: string,
        public city?: string,
        public isActive?: boolean,
    ) {
        this.isActive = false;
    }
}
