import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransactionRegisterMySuffix } from './transaction-register-my-suffix.model';
import { TransactionRegisterMySuffixPopupService } from './transaction-register-my-suffix-popup.service';
import { TransactionRegisterMySuffixService } from './transaction-register-my-suffix.service';
import { FacilityFromMySuffix, FacilityFromMySuffixService } from '../facility-from-my-suffix';
import { FacilityDestinationMySuffix, FacilityDestinationMySuffixService } from '../facility-destination-my-suffix';

@Component({
    selector: 'jhi-transaction-register-my-suffix-dialog',
    templateUrl: './transaction-register-my-suffix-dialog.component.html'
})
export class TransactionRegisterMySuffixDialogComponent implements OnInit {

    transactionRegister: TransactionRegisterMySuffix;
    isSaving: boolean;

    froms: FacilityFromMySuffix[];

    destinations: FacilityDestinationMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transactionRegisterService: TransactionRegisterMySuffixService,
        private facilityFromService: FacilityFromMySuffixService,
        private facilityDestinationService: FacilityDestinationMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.facilityFromService
            .query({filter: 'transactionregister-is-null'})
            .subscribe((res: HttpResponse<FacilityFromMySuffix[]>) => {
                if (!this.transactionRegister.fromId) {
                    this.froms = res.body;
                } else {
                    this.facilityFromService
                        .find(this.transactionRegister.fromId)
                        .subscribe((subRes: HttpResponse<FacilityFromMySuffix>) => {
                            this.froms = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.facilityDestinationService
            .query({filter: 'transactionregister-is-null'})
            .subscribe((res: HttpResponse<FacilityDestinationMySuffix[]>) => {
                if (!this.transactionRegister.destinationId) {
                    this.destinations = res.body;
                } else {
                    this.facilityDestinationService
                        .find(this.transactionRegister.destinationId)
                        .subscribe((subRes: HttpResponse<FacilityDestinationMySuffix>) => {
                            this.destinations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transactionRegister.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transactionRegisterService.update(this.transactionRegister));
        } else {
            this.subscribeToSaveResponse(
                this.transactionRegisterService.create(this.transactionRegister));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TransactionRegisterMySuffix>>) {
        result.subscribe((res: HttpResponse<TransactionRegisterMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TransactionRegisterMySuffix) {
        this.eventManager.broadcast({ name: 'transactionRegisterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFacilityFromById(index: number, item: FacilityFromMySuffix) {
        return item.id;
    }

    trackFacilityDestinationById(index: number, item: FacilityDestinationMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-register-my-suffix-popup',
    template: ''
})
export class TransactionRegisterMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionRegisterPopupService: TransactionRegisterMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transactionRegisterPopupService
                    .open(TransactionRegisterMySuffixDialogComponent as Component, params['id']);
            } else {
                this.transactionRegisterPopupService
                    .open(TransactionRegisterMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
