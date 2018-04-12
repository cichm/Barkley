import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MoneyAccountMySuffixComponent } from './money-account-my-suffix.component';
import { MoneyAccountMySuffixDetailComponent } from './money-account-my-suffix-detail.component';
import { MoneyAccountMySuffixPopupComponent } from './money-account-my-suffix-dialog.component';
import { MoneyAccountMySuffixDeletePopupComponent } from './money-account-my-suffix-delete-dialog.component';

export const moneyAccountRoute: Routes = [
    {
        path: 'money-account-my-suffix',
        component: MoneyAccountMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.moneyAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'money-account-my-suffix/:id',
        component: MoneyAccountMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.moneyAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const moneyAccountPopupRoute: Routes = [
    {
        path: 'money-account-my-suffix-new',
        component: MoneyAccountMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.moneyAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'money-account-my-suffix/:id/edit',
        component: MoneyAccountMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.moneyAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'money-account-my-suffix/:id/delete',
        component: MoneyAccountMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.moneyAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
