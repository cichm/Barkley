import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerAdditionalInfoMySuffix } from './customer-additional-info-my-suffix.model';
import { CustomerAdditionalInfoMySuffixPopupService } from './customer-additional-info-my-suffix-popup.service';
import { CustomerAdditionalInfoMySuffixService } from './customer-additional-info-my-suffix.service';

@Component({
    selector: 'jhi-customer-additional-info-my-suffix-delete-dialog',
    templateUrl: './customer-additional-info-my-suffix-delete-dialog.component.html'
})
export class CustomerAdditionalInfoMySuffixDeleteDialogComponent {

    customerAdditionalInfo: CustomerAdditionalInfoMySuffix;

    constructor(
        private customerAdditionalInfoService: CustomerAdditionalInfoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerAdditionalInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerAdditionalInfoListModification',
                content: 'Deleted an customerAdditionalInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-additional-info-my-suffix-delete-popup',
    template: ''
})
export class CustomerAdditionalInfoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerAdditionalInfoPopupService: CustomerAdditionalInfoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerAdditionalInfoPopupService
                .open(CustomerAdditionalInfoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
