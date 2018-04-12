import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FacilityFromMySuffix } from './facility-from-my-suffix.model';
import { FacilityFromMySuffixService } from './facility-from-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-facility-from-my-suffix',
    templateUrl: './facility-from-my-suffix.component.html'
})
export class FacilityFromMySuffixComponent implements OnInit, OnDestroy {
facilityFroms: FacilityFromMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private facilityFromService: FacilityFromMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.facilityFromService.query().subscribe(
            (res: HttpResponse<FacilityFromMySuffix[]>) => {
                this.facilityFroms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFacilityFroms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FacilityFromMySuffix) {
        return item.id;
    }
    registerChangeInFacilityFroms() {
        this.eventSubscriber = this.eventManager.subscribe('facilityFromListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
