import { BaseEntity } from './../../shared';

export class CustomerMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public document?: string,
        public pesel?: string,
        public phoneNumber?: string,
        public email?: string,
        public aditionalInfoId?: number,
        public accounts?: BaseEntity[],
    ) {
    }
}
