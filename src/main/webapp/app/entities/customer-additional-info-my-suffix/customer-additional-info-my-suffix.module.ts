import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarkleySharedModule } from '../../shared';
import {
    CustomerAdditionalInfoMySuffixService,
    CustomerAdditionalInfoMySuffixPopupService,
    CustomerAdditionalInfoMySuffixComponent,
    CustomerAdditionalInfoMySuffixDetailComponent,
    CustomerAdditionalInfoMySuffixDialogComponent,
    CustomerAdditionalInfoMySuffixPopupComponent,
    CustomerAdditionalInfoMySuffixDeletePopupComponent,
    CustomerAdditionalInfoMySuffixDeleteDialogComponent,
    customerAdditionalInfoRoute,
    customerAdditionalInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerAdditionalInfoRoute,
    ...customerAdditionalInfoPopupRoute,
];

@NgModule({
    imports: [
        BarkleySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerAdditionalInfoMySuffixComponent,
        CustomerAdditionalInfoMySuffixDetailComponent,
        CustomerAdditionalInfoMySuffixDialogComponent,
        CustomerAdditionalInfoMySuffixDeleteDialogComponent,
        CustomerAdditionalInfoMySuffixPopupComponent,
        CustomerAdditionalInfoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CustomerAdditionalInfoMySuffixComponent,
        CustomerAdditionalInfoMySuffixDialogComponent,
        CustomerAdditionalInfoMySuffixPopupComponent,
        CustomerAdditionalInfoMySuffixDeleteDialogComponent,
        CustomerAdditionalInfoMySuffixDeletePopupComponent,
    ],
    providers: [
        CustomerAdditionalInfoMySuffixService,
        CustomerAdditionalInfoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyCustomerAdditionalInfoMySuffixModule {}
