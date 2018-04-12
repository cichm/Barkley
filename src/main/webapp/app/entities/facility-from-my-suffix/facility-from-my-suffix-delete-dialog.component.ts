import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FacilityFromMySuffix } from './facility-from-my-suffix.model';
import { FacilityFromMySuffixPopupService } from './facility-from-my-suffix-popup.service';
import { FacilityFromMySuffixService } from './facility-from-my-suffix.service';

@Component({
    selector: 'jhi-facility-from-my-suffix-delete-dialog',
    templateUrl: './facility-from-my-suffix-delete-dialog.component.html'
})
export class FacilityFromMySuffixDeleteDialogComponent {

    facilityFrom: FacilityFromMySuffix;

    constructor(
        private facilityFromService: FacilityFromMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.facilityFromService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'facilityFromListModification',
                content: 'Deleted an facilityFrom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-facility-from-my-suffix-delete-popup',
    template: ''
})
export class FacilityFromMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private facilityFromPopupService: FacilityFromMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.facilityFromPopupService
                .open(FacilityFromMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
