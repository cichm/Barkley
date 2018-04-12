import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FacilityDestinationMySuffix } from './facility-destination-my-suffix.model';
import { FacilityDestinationMySuffixService } from './facility-destination-my-suffix.service';

@Injectable()
export class FacilityDestinationMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private facilityDestinationService: FacilityDestinationMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.facilityDestinationService.find(id)
                    .subscribe((facilityDestinationResponse: HttpResponse<FacilityDestinationMySuffix>) => {
                        const facilityDestination: FacilityDestinationMySuffix = facilityDestinationResponse.body;
                        this.ngbModalRef = this.facilityDestinationModalRef(component, facilityDestination);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.facilityDestinationModalRef(component, new FacilityDestinationMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    facilityDestinationModalRef(component: Component, facilityDestination: FacilityDestinationMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.facilityDestination = facilityDestination;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
