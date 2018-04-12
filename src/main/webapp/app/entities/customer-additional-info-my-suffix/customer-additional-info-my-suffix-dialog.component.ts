import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerAdditionalInfoMySuffix } from './customer-additional-info-my-suffix.model';
import { CustomerAdditionalInfoMySuffixPopupService } from './customer-additional-info-my-suffix-popup.service';
import { CustomerAdditionalInfoMySuffixService } from './customer-additional-info-my-suffix.service';

@Component({
    selector: 'jhi-customer-additional-info-my-suffix-dialog',
    templateUrl: './customer-additional-info-my-suffix-dialog.component.html'
})
export class CustomerAdditionalInfoMySuffixDialogComponent implements OnInit {

    customerAdditionalInfo: CustomerAdditionalInfoMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private customerAdditionalInfoService: CustomerAdditionalInfoMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerAdditionalInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerAdditionalInfoService.update(this.customerAdditionalInfo));
        } else {
            this.subscribeToSaveResponse(
                this.customerAdditionalInfoService.create(this.customerAdditionalInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CustomerAdditionalInfoMySuffix>>) {
        result.subscribe((res: HttpResponse<CustomerAdditionalInfoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerAdditionalInfoMySuffix) {
        this.eventManager.broadcast({ name: 'customerAdditionalInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-customer-additional-info-my-suffix-popup',
    template: ''
})
export class CustomerAdditionalInfoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerAdditionalInfoPopupService: CustomerAdditionalInfoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerAdditionalInfoPopupService
                    .open(CustomerAdditionalInfoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.customerAdditionalInfoPopupService
                    .open(CustomerAdditionalInfoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
