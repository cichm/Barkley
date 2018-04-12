import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CardMySuffix } from './card-my-suffix.model';
import { CardMySuffixService } from './card-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-card-my-suffix',
    templateUrl: './card-my-suffix.component.html'
})
export class CardMySuffixComponent implements OnInit, OnDestroy {
cards: CardMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cardService: CardMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cardService.query().subscribe(
            (res: HttpResponse<CardMySuffix[]>) => {
                this.cards = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCards();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CardMySuffix) {
        return item.id;
    }
    registerChangeInCards() {
        this.eventSubscriber = this.eventManager.subscribe('cardListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
