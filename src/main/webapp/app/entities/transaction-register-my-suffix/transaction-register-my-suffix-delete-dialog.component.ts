import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionRegisterMySuffix } from './transaction-register-my-suffix.model';
import { TransactionRegisterMySuffixPopupService } from './transaction-register-my-suffix-popup.service';
import { TransactionRegisterMySuffixService } from './transaction-register-my-suffix.service';

@Component({
    selector: 'jhi-transaction-register-my-suffix-delete-dialog',
    templateUrl: './transaction-register-my-suffix-delete-dialog.component.html'
})
export class TransactionRegisterMySuffixDeleteDialogComponent {

    transactionRegister: TransactionRegisterMySuffix;

    constructor(
        private transactionRegisterService: TransactionRegisterMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionRegisterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transactionRegisterListModification',
                content: 'Deleted an transactionRegister'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-register-my-suffix-delete-popup',
    template: ''
})
export class TransactionRegisterMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transactionRegisterPopupService: TransactionRegisterMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transactionRegisterPopupService
                .open(TransactionRegisterMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
