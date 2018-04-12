import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FacilityFromMySuffixComponent } from './facility-from-my-suffix.component';
import { FacilityFromMySuffixDetailComponent } from './facility-from-my-suffix-detail.component';
import { FacilityFromMySuffixPopupComponent } from './facility-from-my-suffix-dialog.component';
import { FacilityFromMySuffixDeletePopupComponent } from './facility-from-my-suffix-delete-dialog.component';

export const facilityFromRoute: Routes = [
    {
        path: 'facility-from-my-suffix',
        component: FacilityFromMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityFrom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'facility-from-my-suffix/:id',
        component: FacilityFromMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityFrom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const facilityFromPopupRoute: Routes = [
    {
        path: 'facility-from-my-suffix-new',
        component: FacilityFromMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityFrom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'facility-from-my-suffix/:id/edit',
        component: FacilityFromMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityFrom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'facility-from-my-suffix/:id/delete',
        component: FacilityFromMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityFrom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
