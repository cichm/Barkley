import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BarkleyCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { BarkleyCustomerAdditionalInfoMySuffixModule } from './customer-additional-info-my-suffix/customer-additional-info-my-suffix.module';
import { BarkleyMoneyAccountMySuffixModule } from './money-account-my-suffix/money-account-my-suffix.module';
import { BarkleyCardMySuffixModule } from './card-my-suffix/card-my-suffix.module';
import { BarkleyTransactionRegisterMySuffixModule } from './transaction-register-my-suffix/transaction-register-my-suffix.module';
import { BarkleyFacilityFromMySuffixModule } from './facility-from-my-suffix/facility-from-my-suffix.module';
import { BarkleyFacilityDestinationMySuffixModule } from './facility-destination-my-suffix/facility-destination-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BarkleyCustomerMySuffixModule,
        BarkleyCustomerAdditionalInfoMySuffixModule,
        BarkleyMoneyAccountMySuffixModule,
        BarkleyCardMySuffixModule,
        BarkleyTransactionRegisterMySuffixModule,
        BarkleyFacilityFromMySuffixModule,
        BarkleyFacilityDestinationMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyEntityModule {}
