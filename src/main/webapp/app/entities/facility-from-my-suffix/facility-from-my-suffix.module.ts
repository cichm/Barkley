import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarkleySharedModule } from '../../shared';
import {
    FacilityFromMySuffixService,
    FacilityFromMySuffixPopupService,
    FacilityFromMySuffixComponent,
    FacilityFromMySuffixDetailComponent,
    FacilityFromMySuffixDialogComponent,
    FacilityFromMySuffixPopupComponent,
    FacilityFromMySuffixDeletePopupComponent,
    FacilityFromMySuffixDeleteDialogComponent,
    facilityFromRoute,
    facilityFromPopupRoute,
} from './';

const ENTITY_STATES = [
    ...facilityFromRoute,
    ...facilityFromPopupRoute,
];

@NgModule({
    imports: [
        BarkleySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FacilityFromMySuffixComponent,
        FacilityFromMySuffixDetailComponent,
        FacilityFromMySuffixDialogComponent,
        FacilityFromMySuffixDeleteDialogComponent,
        FacilityFromMySuffixPopupComponent,
        FacilityFromMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FacilityFromMySuffixComponent,
        FacilityFromMySuffixDialogComponent,
        FacilityFromMySuffixPopupComponent,
        FacilityFromMySuffixDeleteDialogComponent,
        FacilityFromMySuffixDeletePopupComponent,
    ],
    providers: [
        FacilityFromMySuffixService,
        FacilityFromMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyFacilityFromMySuffixModule {}
