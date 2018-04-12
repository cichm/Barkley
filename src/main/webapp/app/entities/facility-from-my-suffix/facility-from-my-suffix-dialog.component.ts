import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FacilityFromMySuffix } from './facility-from-my-suffix.model';
import { FacilityFromMySuffixPopupService } from './facility-from-my-suffix-popup.service';
import { FacilityFromMySuffixService } from './facility-from-my-suffix.service';
import { MoneyAccountMySuffix, MoneyAccountMySuffixService } from '../money-account-my-suffix';

@Component({
    selector: 'jhi-facility-from-my-suffix-dialog',
    templateUrl: './facility-from-my-suffix-dialog.component.html'
})
export class FacilityFromMySuffixDialogComponent implements OnInit {

    facilityFrom: FacilityFromMySuffix;
    isSaving: boolean;

    facilities: MoneyAccountMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private facilityFromService: FacilityFromMySuffixService,
        private moneyAccountService: MoneyAccountMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moneyAccountService
            .query({filter: 'facilityfrom-is-null'})
            .subscribe((res: HttpResponse<MoneyAccountMySuffix[]>) => {
                if (!this.facilityFrom.facilityId) {
                    this.facilities = res.body;
                } else {
                    this.moneyAccountService
                        .find(this.facilityFrom.facilityId)
                        .subscribe((subRes: HttpResponse<MoneyAccountMySuffix>) => {
                            this.facilities = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.facilityFrom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.facilityFromService.update(this.facilityFrom));
        } else {
            this.subscribeToSaveResponse(
                this.facilityFromService.create(this.facilityFrom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FacilityFromMySuffix>>) {
        result.subscribe((res: HttpResponse<FacilityFromMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FacilityFromMySuffix) {
        this.eventManager.broadcast({ name: 'facilityFromListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMoneyAccountById(index: number, item: MoneyAccountMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-facility-from-my-suffix-popup',
    template: ''
})
export class FacilityFromMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private facilityFromPopupService: FacilityFromMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.facilityFromPopupService
                    .open(FacilityFromMySuffixDialogComponent as Component, params['id']);
            } else {
                this.facilityFromPopupService
                    .open(FacilityFromMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
