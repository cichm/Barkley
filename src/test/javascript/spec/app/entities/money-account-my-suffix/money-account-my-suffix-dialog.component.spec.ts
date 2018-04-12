/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { MoneyAccountMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix-dialog.component';
import { MoneyAccountMySuffixService } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.service';
import { MoneyAccountMySuffix } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.model';
import { CustomerMySuffixService } from '../../../../../../main/webapp/app/entities/customer-my-suffix';

describe('Component Tests', () => {

    describe('MoneyAccountMySuffix Management Dialog Component', () => {
        let comp: MoneyAccountMySuffixDialogComponent;
        let fixture: ComponentFixture<MoneyAccountMySuffixDialogComponent>;
        let service: MoneyAccountMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [MoneyAccountMySuffixDialogComponent],
                providers: [
                    CustomerMySuffixService,
                    MoneyAccountMySuffixService
                ]
            })
            .overrideTemplate(MoneyAccountMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MoneyAccountMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MoneyAccountMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MoneyAccountMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.moneyAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'moneyAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MoneyAccountMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.moneyAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'moneyAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
