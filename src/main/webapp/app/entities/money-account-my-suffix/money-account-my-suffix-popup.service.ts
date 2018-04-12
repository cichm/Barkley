import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MoneyAccountMySuffix } from './money-account-my-suffix.model';
import { MoneyAccountMySuffixService } from './money-account-my-suffix.service';

@Injectable()
export class MoneyAccountMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private moneyAccountService: MoneyAccountMySuffixService

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
                this.moneyAccountService.find(id)
                    .subscribe((moneyAccountResponse: HttpResponse<MoneyAccountMySuffix>) => {
                        const moneyAccount: MoneyAccountMySuffix = moneyAccountResponse.body;
                        this.ngbModalRef = this.moneyAccountModalRef(component, moneyAccount);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.moneyAccountModalRef(component, new MoneyAccountMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    moneyAccountModalRef(component: Component, moneyAccount: MoneyAccountMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.moneyAccount = moneyAccount;
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
