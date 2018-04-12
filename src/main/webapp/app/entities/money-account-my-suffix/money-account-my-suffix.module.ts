import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarkleySharedModule } from '../../shared';
import {
    MoneyAccountMySuffixService,
    MoneyAccountMySuffixPopupService,
    MoneyAccountMySuffixComponent,
    MoneyAccountMySuffixDetailComponent,
    MoneyAccountMySuffixDialogComponent,
    MoneyAccountMySuffixPopupComponent,
    MoneyAccountMySuffixDeletePopupComponent,
    MoneyAccountMySuffixDeleteDialogComponent,
    moneyAccountRoute,
    moneyAccountPopupRoute,
} from './';

const ENTITY_STATES = [
    ...moneyAccountRoute,
    ...moneyAccountPopupRoute,
];

@NgModule({
    imports: [
        BarkleySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MoneyAccountMySuffixComponent,
        MoneyAccountMySuffixDetailComponent,
        MoneyAccountMySuffixDialogComponent,
        MoneyAccountMySuffixDeleteDialogComponent,
        MoneyAccountMySuffixPopupComponent,
        MoneyAccountMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MoneyAccountMySuffixComponent,
        MoneyAccountMySuffixDialogComponent,
        MoneyAccountMySuffixPopupComponent,
        MoneyAccountMySuffixDeleteDialogComponent,
        MoneyAccountMySuffixDeletePopupComponent,
    ],
    providers: [
        MoneyAccountMySuffixService,
        MoneyAccountMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyMoneyAccountMySuffixModule {}
