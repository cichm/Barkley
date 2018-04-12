import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FacilityFromMySuffix } from './facility-from-my-suffix.model';
import { FacilityFromMySuffixService } from './facility-from-my-suffix.service';

@Injectable()
export class FacilityFromMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private facilityFromService: FacilityFromMySuffixService

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
                this.facilityFromService.find(id)
                    .subscribe((facilityFromResponse: HttpResponse<FacilityFromMySuffix>) => {
                        const facilityFrom: FacilityFromMySuffix = facilityFromResponse.body;
                        this.ngbModalRef = this.facilityFromModalRef(component, facilityFrom);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.facilityFromModalRef(component, new FacilityFromMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    facilityFromModalRef(component: Component, facilityFrom: FacilityFromMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.facilityFrom = facilityFrom;
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
