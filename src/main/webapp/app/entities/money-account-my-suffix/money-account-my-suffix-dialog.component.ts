import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MoneyAccountMySuffix } from './money-account-my-suffix.model';
import { MoneyAccountMySuffixPopupService } from './money-account-my-suffix-popup.service';
import { MoneyAccountMySuffixService } from './money-account-my-suffix.service';
import { CustomerMySuffix, CustomerMySuffixService } from '../customer-my-suffix';

@Component({
    selector: 'jhi-money-account-my-suffix-dialog',
    templateUrl: './money-account-my-suffix-dialog.component.html'
})
export class MoneyAccountMySuffixDialogComponent implements OnInit {

    moneyAccount: MoneyAccountMySuffix;
    isSaving: boolean;

    customers: CustomerMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private moneyAccountService: MoneyAccountMySuffixService,
        private customerService: CustomerMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<CustomerMySuffix[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.moneyAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.moneyAccountService.update(this.moneyAccount));
        } else {
            this.subscribeToSaveResponse(
                this.moneyAccountService.create(this.moneyAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MoneyAccountMySuffix>>) {
        result.subscribe((res: HttpResponse<MoneyAccountMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MoneyAccountMySuffix) {
        this.eventManager.broadcast({ name: 'moneyAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-money-account-my-suffix-popup',
    template: ''
})
export class MoneyAccountMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private moneyAccountPopupService: MoneyAccountMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.moneyAccountPopupService
                    .open(MoneyAccountMySuffixDialogComponent as Component, params['id']);
            } else {
                this.moneyAccountPopupService
                    .open(MoneyAccountMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
