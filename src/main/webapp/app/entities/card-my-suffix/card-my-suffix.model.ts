import { BaseEntity } from './../../shared';

export const enum CardType {
    'CREDIT_CARD',
    'DEBT_CARD'
}

export class CardMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: CardType,
        public number?: string,
        public valid?: string,
        public moneyAccountId?: number,
    ) {
    }
}
