/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BarkleyTestModule } from '../../../test.module';
import { CustomerAdditionalInfoMySuffixComponent } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix.component';
import { CustomerAdditionalInfoMySuffixService } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix.service';
import { CustomerAdditionalInfoMySuffix } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix.model';

describe('Component Tests', () => {

    describe('CustomerAdditionalInfoMySuffix Management Component', () => {
        let comp: CustomerAdditionalInfoMySuffixComponent;
        let fixture: ComponentFixture<CustomerAdditionalInfoMySuffixComponent>;
        let service: CustomerAdditionalInfoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [CustomerAdditionalInfoMySuffixComponent],
                providers: [
                    CustomerAdditionalInfoMySuffixService
                ]
            })
            .overrideTemplate(CustomerAdditionalInfoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerAdditionalInfoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerAdditionalInfoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CustomerAdditionalInfoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customerAdditionalInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
