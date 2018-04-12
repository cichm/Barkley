/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BarkleyTestModule } from '../../../test.module';
import { CustomerAdditionalInfoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix-detail.component';
import { CustomerAdditionalInfoMySuffixService } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix.service';
import { CustomerAdditionalInfoMySuffix } from '../../../../../../main/webapp/app/entities/customer-additional-info-my-suffix/customer-additional-info-my-suffix.model';

describe('Component Tests', () => {

    describe('CustomerAdditionalInfoMySuffix Management Detail Component', () => {
        let comp: CustomerAdditionalInfoMySuffixDetailComponent;
        let fixture: ComponentFixture<CustomerAdditionalInfoMySuffixDetailComponent>;
        let service: CustomerAdditionalInfoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [CustomerAdditionalInfoMySuffixDetailComponent],
                providers: [
                    CustomerAdditionalInfoMySuffixService
                ]
            })
            .overrideTemplate(CustomerAdditionalInfoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerAdditionalInfoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerAdditionalInfoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerAdditionalInfoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customerAdditionalInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
