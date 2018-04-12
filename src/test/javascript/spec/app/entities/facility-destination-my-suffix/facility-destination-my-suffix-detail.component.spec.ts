/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BarkleyTestModule } from '../../../test.module';
import { FacilityDestinationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix-detail.component';
import { FacilityDestinationMySuffixService } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.service';
import { FacilityDestinationMySuffix } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.model';

describe('Component Tests', () => {

    describe('FacilityDestinationMySuffix Management Detail Component', () => {
        let comp: FacilityDestinationMySuffixDetailComponent;
        let fixture: ComponentFixture<FacilityDestinationMySuffixDetailComponent>;
        let service: FacilityDestinationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [FacilityDestinationMySuffixDetailComponent],
                providers: [
                    FacilityDestinationMySuffixService
                ]
            })
            .overrideTemplate(FacilityDestinationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FacilityDestinationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacilityDestinationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FacilityDestinationMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.facilityDestination).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
