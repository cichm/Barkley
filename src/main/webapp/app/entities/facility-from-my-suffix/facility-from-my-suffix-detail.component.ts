import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FacilityFromMySuffix } from './facility-from-my-suffix.model';
import { FacilityFromMySuffixService } from './facility-from-my-suffix.service';

@Component({
    selector: 'jhi-facility-from-my-suffix-detail',
    templateUrl: './facility-from-my-suffix-detail.component.html'
})
export class FacilityFromMySuffixDetailComponent implements OnInit, OnDestroy {

    facilityFrom: FacilityFromMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private facilityFromService: FacilityFromMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFacilityFroms();
    }

    load(id) {
        this.facilityFromService.find(id)
            .subscribe((facilityFromResponse: HttpResponse<FacilityFromMySuffix>) => {
                this.facilityFrom = facilityFromResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFacilityFroms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'facilityFromListModification',
            (response) => this.load(this.facilityFrom.id)
        );
    }
}
