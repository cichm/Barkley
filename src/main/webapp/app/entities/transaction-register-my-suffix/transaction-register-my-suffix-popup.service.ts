import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TransactionRegisterMySuffix } from './transaction-register-my-suffix.model';
import { TransactionRegisterMySuffixService } from './transaction-register-my-suffix.service';

@Injectable()
export class TransactionRegisterMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private transactionRegisterService: TransactionRegisterMySuffixService

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
                this.transactionRegisterService.find(id)
                    .subscribe((transactionRegisterResponse: HttpResponse<TransactionRegisterMySuffix>) => {
                        const transactionRegister: TransactionRegisterMySuffix = transactionRegisterResponse.body;
                        transactionRegister.date = this.datePipe
                            .transform(transactionRegister.date, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.transactionRegisterModalRef(component, transactionRegister);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transactionRegisterModalRef(component, new TransactionRegisterMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transactionRegisterModalRef(component: Component, transactionRegister: TransactionRegisterMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transactionRegister = transactionRegister;
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
