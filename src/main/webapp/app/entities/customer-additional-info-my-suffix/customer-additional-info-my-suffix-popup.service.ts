import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CustomerAdditionalInfoMySuffix } from './customer-additional-info-my-suffix.model';
import { CustomerAdditionalInfoMySuffixService } from './customer-additional-info-my-suffix.service';

@Injectable()
export class CustomerAdditionalInfoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private customerAdditionalInfoService: CustomerAdditionalInfoMySuffixService

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
                this.customerAdditionalInfoService.find(id)
                    .subscribe((customerAdditionalInfoResponse: HttpResponse<CustomerAdditionalInfoMySuffix>) => {
                        const customerAdditionalInfo: CustomerAdditionalInfoMySuffix = customerAdditionalInfoResponse.body;
                        customerAdditionalInfo.birthdate = this.datePipe
                            .transform(customerAdditionalInfo.birthdate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.customerAdditionalInfoModalRef(component, customerAdditionalInfo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.customerAdditionalInfoModalRef(component, new CustomerAdditionalInfoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    customerAdditionalInfoModalRef(component: Component, customerAdditionalInfo: CustomerAdditionalInfoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.customerAdditionalInfo = customerAdditionalInfo;
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
