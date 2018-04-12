import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FacilityDestinationMySuffix } from './facility-destination-my-suffix.model';
import { FacilityDestinationMySuffixPopupService } from './facility-destination-my-suffix-popup.service';
import { FacilityDestinationMySuffixService } from './facility-destination-my-suffix.service';

@Component({
    selector: 'jhi-facility-destination-my-suffix-delete-dialog',
    templateUrl: './facility-destination-my-suffix-delete-dialog.component.html'
})
export class FacilityDestinationMySuffixDeleteDialogComponent {

    facilityDestination: FacilityDestinationMySuffix;

    constructor(
        private facilityDestinationService: FacilityDestinationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.facilityDestinationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'facilityDestinationListModification',
                content: 'Deleted an facilityDestination'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-facility-destination-my-suffix-delete-popup',
    template: ''
})
export class FacilityDestinationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private facilityDestinationPopupService: FacilityDestinationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.facilityDestinationPopupService
                .open(FacilityDestinationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
