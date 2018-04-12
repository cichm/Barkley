import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionRegisterMySuffix } from './transaction-register-my-suffix.model';
import { TransactionRegisterMySuffixService } from './transaction-register-my-suffix.service';

@Component({
    selector: 'jhi-transaction-register-my-suffix-detail',
    templateUrl: './transaction-register-my-suffix-detail.component.html'
})
export class TransactionRegisterMySuffixDetailComponent implements OnInit, OnDestroy {

    transactionRegister: TransactionRegisterMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transactionRegisterService: TransactionRegisterMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransactionRegisters();
    }

    load(id) {
        this.transactionRegisterService.find(id)
            .subscribe((transactionRegisterResponse: HttpResponse<TransactionRegisterMySuffix>) => {
                this.transactionRegister = transactionRegisterResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransactionRegisters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transactionRegisterListModification',
            (response) => this.load(this.transactionRegister.id)
        );
    }
}
