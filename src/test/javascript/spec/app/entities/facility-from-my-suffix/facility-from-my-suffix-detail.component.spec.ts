/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BarkleyTestModule } from '../../../test.module';
import { FacilityFromMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix-detail.component';
import { FacilityFromMySuffixService } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix.service';
import { FacilityFromMySuffix } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix.model';

describe('Component Tests', () => {

    describe('FacilityFromMySuffix Management Detail Component', () => {
        let comp: FacilityFromMySuffixDetailComponent;
        let fixture: ComponentFixture<FacilityFromMySuffixDetailComponent>;
        let service: FacilityFromMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [FacilityFromMySuffixDetailComponent],
                providers: [
                    FacilityFromMySuffixService
                ]
            })
            .overrideTemplate(FacilityFromMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FacilityFromMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacilityFromMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FacilityFromMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.facilityFrom).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
