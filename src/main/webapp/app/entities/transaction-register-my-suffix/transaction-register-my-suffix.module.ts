import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarkleySharedModule } from '../../shared';
import {
    TransactionRegisterMySuffixService,
    TransactionRegisterMySuffixPopupService,
    TransactionRegisterMySuffixComponent,
    TransactionRegisterMySuffixDetailComponent,
    TransactionRegisterMySuffixDialogComponent,
    TransactionRegisterMySuffixPopupComponent,
    TransactionRegisterMySuffixDeletePopupComponent,
    TransactionRegisterMySuffixDeleteDialogComponent,
    transactionRegisterRoute,
    transactionRegisterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transactionRegisterRoute,
    ...transactionRegisterPopupRoute,
];

@NgModule({
    imports: [
        BarkleySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransactionRegisterMySuffixComponent,
        TransactionRegisterMySuffixDetailComponent,
        TransactionRegisterMySuffixDialogComponent,
        TransactionRegisterMySuffixDeleteDialogComponent,
        TransactionRegisterMySuffixPopupComponent,
        TransactionRegisterMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TransactionRegisterMySuffixComponent,
        TransactionRegisterMySuffixDialogComponent,
        TransactionRegisterMySuffixPopupComponent,
        TransactionRegisterMySuffixDeleteDialogComponent,
        TransactionRegisterMySuffixDeletePopupComponent,
    ],
    providers: [
        TransactionRegisterMySuffixService,
        TransactionRegisterMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyTransactionRegisterMySuffixModule {}
