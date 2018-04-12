import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardMySuffix } from './card-my-suffix.model';
import { CardMySuffixPopupService } from './card-my-suffix-popup.service';
import { CardMySuffixService } from './card-my-suffix.service';
import { MoneyAccountMySuffix, MoneyAccountMySuffixService } from '../money-account-my-suffix';

@Component({
    selector: 'jhi-card-my-suffix-dialog',
    templateUrl: './card-my-suffix-dialog.component.html'
})
export class CardMySuffixDialogComponent implements OnInit {

    card: CardMySuffix;
    isSaving: boolean;

    moneyaccounts: MoneyAccountMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cardService: CardMySuffixService,
        private moneyAccountService: MoneyAccountMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moneyAccountService.query()
            .subscribe((res: HttpResponse<MoneyAccountMySuffix[]>) => { this.moneyaccounts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.card.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardService.update(this.card));
        } else {
            this.subscribeToSaveResponse(
                this.cardService.create(this.card));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardMySuffix>>) {
        result.subscribe((res: HttpResponse<CardMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardMySuffix) {
        this.eventManager.broadcast({ name: 'cardListModification', content: 'OK'});
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
    selector: 'jhi-card-my-suffix-popup',
    template: ''
})
export class CardMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardPopupService
                    .open(CardMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cardPopupService
                    .open(CardMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
