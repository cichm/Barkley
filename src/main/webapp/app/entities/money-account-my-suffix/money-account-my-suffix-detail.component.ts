import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MoneyAccountMySuffix } from './money-account-my-suffix.model';
import { MoneyAccountMySuffixService } from './money-account-my-suffix.service';

@Component({
    selector: 'jhi-money-account-my-suffix-detail',
    templateUrl: './money-account-my-suffix-detail.component.html'
})
export class MoneyAccountMySuffixDetailComponent implements OnInit, OnDestroy {

    moneyAccount: MoneyAccountMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private moneyAccountService: MoneyAccountMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMoneyAccounts();
    }

    load(id) {
        this.moneyAccountService.find(id)
            .subscribe((moneyAccountResponse: HttpResponse<MoneyAccountMySuffix>) => {
                this.moneyAccount = moneyAccountResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMoneyAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'moneyAccountListModification',
            (response) => this.load(this.moneyAccount.id)
        );
    }
}
