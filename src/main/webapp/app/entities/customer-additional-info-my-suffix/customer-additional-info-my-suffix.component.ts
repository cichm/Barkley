import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerAdditionalInfoMySuffix } from './customer-additional-info-my-suffix.model';
import { CustomerAdditionalInfoMySuffixService } from './customer-additional-info-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-customer-additional-info-my-suffix',
    templateUrl: './customer-additional-info-my-suffix.component.html'
})
export class CustomerAdditionalInfoMySuffixComponent implements OnInit, OnDestroy {
customerAdditionalInfos: CustomerAdditionalInfoMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerAdditionalInfoService: CustomerAdditionalInfoMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerAdditionalInfoService.query().subscribe(
            (res: HttpResponse<CustomerAdditionalInfoMySuffix[]>) => {
                this.customerAdditionalInfos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerAdditionalInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerAdditionalInfoMySuffix) {
        return item.id;
    }
    registerChangeInCustomerAdditionalInfos() {
        this.eventSubscriber = this.eventManager.subscribe('customerAdditionalInfoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
