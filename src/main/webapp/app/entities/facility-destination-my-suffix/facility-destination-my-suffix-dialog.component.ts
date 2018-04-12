import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FacilityDestinationMySuffix } from './facility-destination-my-suffix.model';
import { FacilityDestinationMySuffixPopupService } from './facility-destination-my-suffix-popup.service';
import { FacilityDestinationMySuffixService } from './facility-destination-my-suffix.service';
import { MoneyAccountMySuffix, MoneyAccountMySuffixService } from '../money-account-my-suffix';

@Component({
    selector: 'jhi-facility-destination-my-suffix-dialog',
    templateUrl: './facility-destination-my-suffix-dialog.component.html'
})
export class FacilityDestinationMySuffixDialogComponent implements OnInit {

    facilityDestination: FacilityDestinationMySuffix;
    isSaving: boolean;

    facilities: MoneyAccountMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private facilityDestinationService: FacilityDestinationMySuffixService,
        private moneyAccountService: MoneyAccountMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moneyAccountService
            .query({filter: 'facilitydestination-is-null'})
            .subscribe((res: HttpResponse<MoneyAccountMySuffix[]>) => {
                if (!this.facilityDestination.facilityId) {
                    this.facilities = res.body;
                } else {
                    this.moneyAccountService
                        .find(this.facilityDestination.facilityId)
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
        if (this.facilityDestination.id !== undefined) {
            this.subscribeToSaveResponse(
                this.facilityDestinationService.update(this.facilityDestination));
        } else {
            this.subscribeToSaveResponse(
                this.facilityDestinationService.create(this.facilityDestination));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FacilityDestinationMySuffix>>) {
        result.subscribe((res: HttpResponse<FacilityDestinationMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FacilityDestinationMySuffix) {
        this.eventManager.broadcast({ name: 'facilityDestinationListModification', content: 'OK'});
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
    selector: 'jhi-facility-destination-my-suffix-popup',
    template: ''
})
export class FacilityDestinationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private facilityDestinationPopupService: FacilityDestinationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.facilityDestinationPopupService
                    .open(FacilityDestinationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.facilityDestinationPopupService
                    .open(FacilityDestinationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
