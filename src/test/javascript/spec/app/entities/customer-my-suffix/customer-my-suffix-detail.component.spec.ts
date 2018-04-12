/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BarkleyTestModule } from '../../../test.module';
import { CustomerMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix-detail.component';
import { CustomerMySuffixService } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.service';
import { CustomerMySuffix } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.model';

describe('Component Tests', () => {

    describe('CustomerMySuffix Management Detail Component', () => {
        let comp: CustomerMySuffixDetailComponent;
        let fixture: ComponentFixture<CustomerMySuffixDetailComponent>;
        let service: CustomerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [CustomerMySuffixDetailComponent],
                providers: [
                    CustomerMySuffixService
                ]
            })
            .overrideTemplate(CustomerMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CustomerMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
