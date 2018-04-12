import { BaseEntity } from './../../shared';

export const enum AccountType {
    'SIMPLE_ACCOUNT',
    'BUSINESS_ACCOUNT',
    'SAVINGS_ACCOUNT'
}

export const enum Currency {
    'PLN',
    'EUR',
    'USD',
    'CHF'
}

export class MoneyAccountMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: AccountType,
        public number?: string,
        public currency?: Currency,
        public isActive?: boolean,
        public saldo?: number,
        public customerId?: number,
        public cards?: BaseEntity[],
    ) {
        this.isActive = false;
    }
}
