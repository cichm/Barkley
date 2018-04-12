import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarkleySharedModule } from '../../shared';
import {
    FacilityDestinationMySuffixService,
    FacilityDestinationMySuffixPopupService,
    FacilityDestinationMySuffixComponent,
    FacilityDestinationMySuffixDetailComponent,
    FacilityDestinationMySuffixDialogComponent,
    FacilityDestinationMySuffixPopupComponent,
    FacilityDestinationMySuffixDeletePopupComponent,
    FacilityDestinationMySuffixDeleteDialogComponent,
    facilityDestinationRoute,
    facilityDestinationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...facilityDestinationRoute,
    ...facilityDestinationPopupRoute,
];

@NgModule({
    imports: [
        BarkleySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FacilityDestinationMySuffixComponent,
        FacilityDestinationMySuffixDetailComponent,
        FacilityDestinationMySuffixDialogComponent,
        FacilityDestinationMySuffixDeleteDialogComponent,
        FacilityDestinationMySuffixPopupComponent,
        FacilityDestinationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FacilityDestinationMySuffixComponent,
        FacilityDestinationMySuffixDialogComponent,
        FacilityDestinationMySuffixPopupComponent,
        FacilityDestinationMySuffixDeleteDialogComponent,
        FacilityDestinationMySuffixDeletePopupComponent,
    ],
    providers: [
        FacilityDestinationMySuffixService,
        FacilityDestinationMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyFacilityDestinationMySuffixModule {}
