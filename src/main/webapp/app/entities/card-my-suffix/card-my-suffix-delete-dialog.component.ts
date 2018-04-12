import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardMySuffix } from './card-my-suffix.model';
import { CardMySuffixPopupService } from './card-my-suffix-popup.service';
import { CardMySuffixService } from './card-my-suffix.service';

@Component({
    selector: 'jhi-card-my-suffix-delete-dialog',
    templateUrl: './card-my-suffix-delete-dialog.component.html'
})
export class CardMySuffixDeleteDialogComponent {

    card: CardMySuffix;

    constructor(
        private cardService: CardMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cardListModification',
                content: 'Deleted an card'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-my-suffix-delete-popup',
    template: ''
})
export class CardMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cardPopupService
                .open(CardMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
