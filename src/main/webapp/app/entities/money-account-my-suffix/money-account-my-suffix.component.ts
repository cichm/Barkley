import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MoneyAccountMySuffix } from './money-account-my-suffix.model';
import { MoneyAccountMySuffixService } from './money-account-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-money-account-my-suffix',
    templateUrl: './money-account-my-suffix.component.html'
})
export class MoneyAccountMySuffixComponent implements OnInit, OnDestroy {
moneyAccounts: MoneyAccountMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private moneyAccountService: MoneyAccountMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.moneyAccountService.query().subscribe(
            (res: HttpResponse<MoneyAccountMySuffix[]>) => {
                this.moneyAccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMoneyAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MoneyAccountMySuffix) {
        return item.id;
    }
    registerChangeInMoneyAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('moneyAccountListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
