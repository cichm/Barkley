import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarkleySharedModule } from '../../shared';
import {
    CustomerMySuffixService,
    CustomerMySuffixPopupService,
    CustomerMySuffixComponent,
    CustomerMySuffixDetailComponent,
    CustomerMySuffixDialogComponent,
    CustomerMySuffixPopupComponent,
    CustomerMySuffixDeletePopupComponent,
    CustomerMySuffixDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        BarkleySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerMySuffixComponent,
        CustomerMySuffixDetailComponent,
        CustomerMySuffixDialogComponent,
        CustomerMySuffixDeleteDialogComponent,
        CustomerMySuffixPopupComponent,
        CustomerMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CustomerMySuffixComponent,
        CustomerMySuffixDialogComponent,
        CustomerMySuffixPopupComponent,
        CustomerMySuffixDeleteDialogComponent,
        CustomerMySuffixDeletePopupComponent,
    ],
    providers: [
        CustomerMySuffixService,
        CustomerMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyCustomerMySuffixModule {}
