/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { FacilityDestinationMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix-dialog.component';
import { FacilityDestinationMySuffixService } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.service';
import { FacilityDestinationMySuffix } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.model';
import { MoneyAccountMySuffixService } from '../../../../../../main/webapp/app/entities/money-account-my-suffix';

describe('Component Tests', () => {

    describe('FacilityDestinationMySuffix Management Dialog Component', () => {
        let comp: FacilityDestinationMySuffixDialogComponent;
        let fixture: ComponentFixture<FacilityDestinationMySuffixDialogComponent>;
        let service: FacilityDestinationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [FacilityDestinationMySuffixDialogComponent],
                providers: [
                    MoneyAccountMySuffixService,
                    FacilityDestinationMySuffixService
                ]
            })
            .overrideTemplate(FacilityDestinationMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FacilityDestinationMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacilityDestinationMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FacilityDestinationMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.facilityDestination = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'facilityDestinationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FacilityDestinationMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.facilityDestination = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'facilityDestinationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
