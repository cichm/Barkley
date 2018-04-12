/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { CustomerAdditionalInfoMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix-dialog.component';
import { CustomerAdditionalInfoMySuffixService } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix.service';
import { CustomerAdditionalInfoMySuffix } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix.model';

describe('Component Tests', () => {

    describe('CustomerAdditionalInfoMySuffix Management Dialog Component', () => {
        let comp: CustomerAdditionalInfoMySuffixDialogComponent;
        let fixture: ComponentFixture<CustomerAdditionalInfoMySuffixDialogComponent>;
        let service: CustomerAdditionalInfoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [CustomerAdditionalInfoMySuffixDialogComponent],
                providers: [
                    CustomerAdditionalInfoMySuffixService
                ]
            })
            .overrideTemplate(CustomerAdditionalInfoMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerAdditionalInfoMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerAdditionalInfoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerAdditionalInfoMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customerAdditionalInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerAdditionalInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerAdditionalInfoMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.customerAdditionalInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerAdditionalInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
