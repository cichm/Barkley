import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CardMySuffix } from './card-my-suffix.model';
import { CardMySuffixService } from './card-my-suffix.service';

@Component({
    selector: 'jhi-card-my-suffix-detail',
    templateUrl: './card-my-suffix-detail.component.html'
})
export class CardMySuffixDetailComponent implements OnInit, OnDestroy {

    card: CardMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cardService: CardMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCards();
    }

    load(id) {
        this.cardService.find(id)
            .subscribe((cardResponse: HttpResponse<CardMySuffix>) => {
                this.card = cardResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardListModification',
            (response) => this.load(this.card.id)
        );
    }
}
