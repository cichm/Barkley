/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { TransactionRegisterMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix-delete-dialog.component';
import { TransactionRegisterMySuffixService } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.service';

describe('Component Tests', () => {

    describe('TransactionRegisterMySuffix Management Delete Component', () => {
        let comp: TransactionRegisterMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionRegisterMySuffixDeleteDialogComponent>;
        let service: TransactionRegisterMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [TransactionRegisterMySuffixDeleteDialogComponent],
                providers: [
                    TransactionRegisterMySuffixService
                ]
            })
            .overrideTemplate(TransactionRegisterMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionRegisterMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionRegisterMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
