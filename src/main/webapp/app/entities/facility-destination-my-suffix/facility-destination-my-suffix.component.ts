import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FacilityDestinationMySuffix } from './facility-destination-my-suffix.model';
import { FacilityDestinationMySuffixService } from './facility-destination-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-facility-destination-my-suffix',
    templateUrl: './facility-destination-my-suffix.component.html'
})
export class FacilityDestinationMySuffixComponent implements OnInit, OnDestroy {
facilityDestinations: FacilityDestinationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private facilityDestinationService: FacilityDestinationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.facilityDestinationService.query().subscribe(
            (res: HttpResponse<FacilityDestinationMySuffix[]>) => {
                this.facilityDestinations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFacilityDestinations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FacilityDestinationMySuffix) {
        return item.id;
    }
    registerChangeInFacilityDestinations() {
        this.eventSubscriber = this.eventManager.subscribe('facilityDestinationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
