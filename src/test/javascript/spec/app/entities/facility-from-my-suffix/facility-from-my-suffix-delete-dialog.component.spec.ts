/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { FacilityFromMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix-delete-dialog.component';
import { FacilityFromMySuffixService } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix.service';

describe('Component Tests', () => {

    describe('FacilityFromMySuffix Management Delete Component', () => {
        let comp: FacilityFromMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FacilityFromMySuffixDeleteDialogComponent>;
        let service: FacilityFromMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [FacilityFromMySuffixDeleteDialogComponent],
                providers: [
                    FacilityFromMySuffixService
                ]
            })
            .overrideTemplate(FacilityFromMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FacilityFromMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacilityFromMySuffixService);
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
