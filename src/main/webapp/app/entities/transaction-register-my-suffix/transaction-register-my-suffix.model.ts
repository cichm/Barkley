import { BaseEntity } from './../../shared';

export const enum TransactionType {
    'TRANSFER',
    'ATM_CASH_GET',
    'PHONE_CASH_TRANSFER'
}

export class TransactionRegisterMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public amount?: number,
        public type?: TransactionType,
        public fromId?: number,
        public destinationId?: number,
    ) {
    }
}
