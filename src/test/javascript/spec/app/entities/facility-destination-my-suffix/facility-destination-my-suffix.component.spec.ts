/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BarkleyTestModule } from '../../../test.module';
import { FacilityDestinationMySuffixComponent } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.component';
import { FacilityDestinationMySuffixService } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.service';
import { FacilityDestinationMySuffix } from '../../../../../../main/webapp/app/entities/facility-destination-my-suffix/facility-destination-my-suffix.model';

describe('Component Tests', () => {

    describe('FacilityDestinationMySuffix Management Component', () => {
        let comp: FacilityDestinationMySuffixComponent;
        let fixture: ComponentFixture<FacilityDestinationMySuffixComponent>;
        let service: FacilityDestinationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [FacilityDestinationMySuffixComponent],
                providers: [
                    FacilityDestinationMySuffixService
                ]
            })
            .overrideTemplate(FacilityDestinationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FacilityDestinationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacilityDestinationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FacilityDestinationMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.facilityDestinations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
