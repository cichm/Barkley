/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { FacilityDestinationMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix-delete-dialog.component';
import { FacilityDestinationMySuffixService } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.service';

describe('Component Tests', () => {

    describe('FacilityDestinationMySuffix Management Delete Component', () => {
        let comp: FacilityDestinationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FacilityDestinationMySuffixDeleteDialogComponent>;
        let service: FacilityDestinationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [FacilityDestinationMySuffixDeleteDialogComponent],
                providers: [
                    FacilityDestinationMySuffixService
                ]
            })
            .overrideTemplate(FacilityDestinationMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FacilityDestinationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacilityDestinationMySuffixService);
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
