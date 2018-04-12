import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarkleySharedModule } from '../../shared';
import {
    CardMySuffixService,
    CardMySuffixPopupService,
    CardMySuffixComponent,
    CardMySuffixDetailComponent,
    CardMySuffixDialogComponent,
    CardMySuffixPopupComponent,
    CardMySuffixDeletePopupComponent,
    CardMySuffixDeleteDialogComponent,
    cardRoute,
    cardPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cardRoute,
    ...cardPopupRoute,
];

@NgModule({
    imports: [
        BarkleySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardMySuffixComponent,
        CardMySuffixDetailComponent,
        CardMySuffixDialogComponent,
        CardMySuffixDeleteDialogComponent,
        CardMySuffixPopupComponent,
        CardMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CardMySuffixComponent,
        CardMySuffixDialogComponent,
        CardMySuffixPopupComponent,
        CardMySuffixDeleteDialogComponent,
        CardMySuffixDeletePopupComponent,
    ],
    providers: [
        CardMySuffixService,
        CardMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BarkleyCardMySuffixModule {}
