/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BarkleyTestModule } from '../../../test.module';
import { FacilityFromMySuffixComponent } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix.component';
import { FacilityFromMySuffixService } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix.service';
import { FacilityFromMySuffix } from '../../../../../../main/webapp/app/entities/facility-from-my-suffix/facility-from-my-suffix.model';

describe('Component Tests', () => {

    describe('FacilityFromMySuffix Management Component', () => {
        let comp: FacilityFromMySuffixComponent;
        let fixture: ComponentFixture<FacilityFromMySuffixComponent>;
        let service: FacilityFromMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [FacilityFromMySuffixComponent],
                providers: [
                    FacilityFromMySuffixService
                ]
            })
            .overrideTemplate(FacilityFromMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FacilityFromMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacilityFromMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FacilityFromMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.facilityFroms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
