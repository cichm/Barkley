import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerMySuffix } from './customer-my-suffix.model';
import { CustomerMySuffixPopupService } from './customer-my-suffix-popup.service';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { CustomerAdditionalInfoMySuffix, CustomerAdditionalInfoMySuffixService } from '../customer-additional-info-my-suffix';

@Component({
    selector: 'jhi-customer-my-suffix-dialog',
    templateUrl: './customer-my-suffix-dialog.component.html'
})
export class CustomerMySuffixDialogComponent implements OnInit {

    customer: CustomerMySuffix;
    isSaving: boolean;

    aditionalinfos: CustomerAdditionalInfoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerMySuffixService,
        private customerAdditionalInfoService: CustomerAdditionalInfoMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerAdditionalInfoService
            .query({filter: 'customer-is-null'})
            .subscribe((res: HttpResponse<CustomerAdditionalInfoMySuffix[]>) => {
                if (!this.customer.aditionalInfoId) {
                    this.aditionalinfos = res.body;
                } else {
                    this.customerAdditionalInfoService
                        .find(this.customer.aditionalInfoId)
                        .subscribe((subRes: HttpResponse<CustomerAdditionalInfoMySuffix>) => {
                            this.aditionalinfos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(
                this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerMySuffix>>) {
        result.subscribe((res: HttpResponse<CustomerMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerMySuffix) {
        this.eventManager.broadcast({ name: 'customerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerAdditionalInfoById(index: number, item: CustomerAdditionalInfoMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-customer-my-suffix-popup',
    template: ''
})
export class CustomerMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerPopupService
                    .open(CustomerMySuffixDialogComponent as Component, params['id']);
            } else {
                this.customerPopupService
                    .open(CustomerMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
