import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TransactionRegisterMySuffixComponent } from './transaction-register-my-suffix.component';
import { TransactionRegisterMySuffixDetailComponent } from './transaction-register-my-suffix-detail.component';
import { TransactionRegisterMySuffixPopupComponent } from './transaction-register-my-suffix-dialog.component';
import { TransactionRegisterMySuffixDeletePopupComponent } from './transaction-register-my-suffix-delete-dialog.component';

export const transactionRegisterRoute: Routes = [
    {
        path: 'transaction-register-my-suffix',
        component: TransactionRegisterMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.transactionRegister.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transaction-register-my-suffix/:id',
        component: TransactionRegisterMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.transactionRegister.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionRegisterPopupRoute: Routes = [
    {
        path: 'transaction-register-my-suffix-new',
        component: TransactionRegisterMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.transactionRegister.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-register-my-suffix/:id/edit',
        component: TransactionRegisterMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.transactionRegister.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transaction-register-my-suffix/:id/delete',
        component: TransactionRegisterMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'barkleyApp.transactionRegister.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
