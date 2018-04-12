import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MoneyAccountMySuffix } from './money-account-my-suffix.model';
import { MoneyAccountMySuffixPopupService } from './money-account-my-suffix-popup.service';
import { MoneyAccountMySuffixService } from './money-account-my-suffix.service';

@Component({
    selector: 'jhi-money-account-my-suffix-delete-dialog',
    templateUrl: './money-account-my-suffix-delete-dialog.component.html'
})
export class MoneyAccountMySuffixDeleteDialogComponent {

    moneyAccount: MoneyAccountMySuffix;

    constructor(
        private moneyAccountService: MoneyAccountMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.moneyAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'moneyAccountListModification',
                content: 'Deleted an moneyAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-money-account-my-suffix-delete-popup',
    template: ''
})
export class MoneyAccountMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private moneyAccountPopupService: MoneyAccountMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.moneyAccountPopupService
                .open(MoneyAccountMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
