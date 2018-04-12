import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerAdditionalInfoMySuffix } from './customer-additional-info-my-suffix.model';
import { CustomerAdditionalInfoMySuffixService } from './customer-additional-info-my-suffix.service';

@Component({
    selector: 'jhi-customer-additional-info-my-suffix-detail',
    templateUrl: './customer-additional-info-my-suffix-detail.component.html'
})
export class CustomerAdditionalInfoMySuffixDetailComponent implements OnInit, OnDestroy {

    customerAdditionalInfo: CustomerAdditionalInfoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerAdditionalInfoService: CustomerAdditionalInfoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomerAdditionalInfos();
    }

    load(id) {
        this.customerAdditionalInfoService.find(id)
            .subscribe((customerAdditionalInfoResponse: HttpResponse<CustomerAdditionalInfoMySuffix>) => {
                this.customerAdditionalInfo = customerAdditionalInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomerAdditionalInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerAdditionalInfoListModification',
            (response) => this.load(this.customerAdditionalInfo.id)
        );
    }
}
