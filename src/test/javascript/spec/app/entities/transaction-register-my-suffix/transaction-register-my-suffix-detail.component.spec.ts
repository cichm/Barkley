/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BarkleyTestModule } from '../../../test.module';
import { TransactionRegisterMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix-detail.component';
import { TransactionRegisterMySuffixService } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.service';
import { TransactionRegisterMySuffix } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.model';

describe('Component Tests', () => {

    describe('TransactionRegisterMySuffix Management Detail Component', () => {
        let comp: TransactionRegisterMySuffixDetailComponent;
        let fixture: ComponentFixture<TransactionRegisterMySuffixDetailComponent>;
        let service: TransactionRegisterMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [TransactionRegisterMySuffixDetailComponent],
                providers: [
                    TransactionRegisterMySuffixService
                ]
            })
            .overrideTemplate(TransactionRegisterMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionRegisterMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionRegisterMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TransactionRegisterMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.transactionRegister).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
