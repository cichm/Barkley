import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerAdditionalInfoMySuffixComponent } from './customer-additional-info-my-suffix.component';
import { CustomerAdditionalInfoMySuffixDetailComponent } from './customer-additional-info-my-suffix-detail.component';
import { CustomerAdditionalInfoMySuffixPopupComponent } from './customer-additional-info-my-suffix-dialog.component';
import {
    CustomerAdditionalInfoMySuffixDeletePopupComponent
} from './customer-additional-info-my-suffix-delete-dialog.component';

export const customerAdditionalInfoRoute: Routes = [
    {
        path: 'customer-additional-info-my-suffix',
        component: CustomerAdditionalInfoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.customerAdditionalInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-additional-info-my-suffix/:id',
        component: CustomerAdditionalInfoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.customerAdditionalInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerAdditionalInfoPopupRoute: Routes = [
    {
        path: 'customer-additional-info-my-suffix-new',
        component: CustomerAdditionalInfoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.customerAdditionalInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-additional-info-my-suffix/:id/edit',
        component: CustomerAdditionalInfoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.customerAdditionalInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-additional-info-my-suffix/:id/delete',
        component: CustomerAdditionalInfoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.customerAdditionalInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
