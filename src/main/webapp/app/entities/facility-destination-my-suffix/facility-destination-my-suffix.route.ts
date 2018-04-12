import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FacilityDestinationMySuffixComponent } from './facility-destination-my-suffix.component';
import { FacilityDestinationMySuffixDetailComponent } from './facility-destination-my-suffix-detail.component';
import { FacilityDestinationMySuffixPopupComponent } from './facility-destination-my-suffix-dialog.component';
import { FacilityDestinationMySuffixDeletePopupComponent } from './facility-destination-my-suffix-delete-dialog.component';

export const facilityDestinationRoute: Routes = [
    {
        path: 'facility-destination-my-suffix',
        component: FacilityDestinationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityDestination.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'facility-destination-my-suffix/:id',
        component: FacilityDestinationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityDestination.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const facilityDestinationPopupRoute: Routes = [
    {
        path: 'facility-destination-my-suffix-new',
        component: FacilityDestinationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityDestination.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'facility-destination-my-suffix/:id/edit',
        component: FacilityDestinationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityDestination.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'facility-destination-my-suffix/:id/delete',
        component: FacilityDestinationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.facilityDestination.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
