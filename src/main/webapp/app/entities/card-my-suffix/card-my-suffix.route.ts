import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardMySuffixComponent } from './card-my-suffix.component';
import { CardMySuffixDetailComponent } from './card-my-suffix-detail.component';
import { CardMySuffixPopupComponent } from './card-my-suffix-dialog.component';
import { CardMySuffixDeletePopupComponent } from './card-my-suffix-delete-dialog.component';

export const cardRoute: Routes = [
    {
        path: 'card-my-suffix',
        component: CardMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.card.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'card-my-suffix/:id',
        component: CardMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.card.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardPopupRoute: Routes = [
    {
        path: 'card-my-suffix-new',
        component: CardMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-my-suffix/:id/edit',
        component: CardMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-my-suffix/:id/delete',
        component: CardMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.card.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
