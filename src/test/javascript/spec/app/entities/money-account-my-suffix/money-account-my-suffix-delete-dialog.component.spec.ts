/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BarkleyTestModule } from '../../../test.module';
import { MoneyAccountMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix-delete-dialog.component';
import { MoneyAccountMySuffixService } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.service';

describe('Component Tests', () => {

    describe('MoneyAccountMySuffix Management Delete Component', () => {
        let comp: MoneyAccountMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MoneyAccountMySuffixDeleteDialogComponent>;
        let service: MoneyAccountMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [MoneyAccountMySuffixDeleteDialogComponent],
                providers: [
                    MoneyAccountMySuffixService
                ]
            })
            .overrideTemplate(MoneyAccountMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MoneyAccountMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MoneyAccountMySuffixService);
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
