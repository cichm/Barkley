import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FacilityDestinationMySuffix } from './facility-destination-my-suffix.model';
import { FacilityDestinationMySuffixService } from './facility-destination-my-suffix.service';

@Component({
    selector: 'jhi-facility-destination-my-suffix-detail',
    templateUrl: './facility-destination-my-suffix-detail.component.html'
})
export class FacilityDestinationMySuffixDetailComponent implements OnInit, OnDestroy {

    facilityDestination: FacilityDestinationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private facilityDestinationService: FacilityDestinationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFacilityDestinations();
    }

    load(id) {
        this.facilityDestinationService.find(id)
            .subscribe((facilityDestinationResponse: HttpResponse<FacilityDestinationMySuffix>) => {
                this.facilityDestination = facilityDestinationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFacilityDestinations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'facilityDestinationListModification',
            (response) => this.load(this.facilityDestination.id)
        );
    }
}
