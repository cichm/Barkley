/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { TransactionRegisterMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix-dialog.component';
import { TransactionRegisterMySuffixService } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.service';
import { TransactionRegisterMySuffix } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.model';
import { FacilityFromMySuffixService } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix';
import { FacilityDestinationMySuffixService } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix';

describe('Component Tests', () => {

    describe('TransactionRegisterMySuffix Management Dialog Component', () => {
        let comp: TransactionRegisterMySuffixDialogComponent;
        let fixture: ComponentFixture<TransactionRegisterMySuffixDialogComponent>;
        let service: TransactionRegisterMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [TransactionRegisterMySuffixDialogComponent],
                providers: [
                    FacilityFromMySuffixService,
                    FacilityDestinationMySuffixService,
                    TransactionRegisterMySuffixService
                ]
            })
            .overrideTemplate(TransactionRegisterMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionRegisterMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionRegisterMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionRegisterMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transactionRegister = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionRegisterListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TransactionRegisterMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.transactionRegister = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'transactionRegisterListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
