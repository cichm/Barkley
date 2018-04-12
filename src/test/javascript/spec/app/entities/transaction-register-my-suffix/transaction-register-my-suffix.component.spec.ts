/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BarkleyTestModule } from '../../../test.module';
import { TransactionRegisterMySuffixComponent } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.component';
import { TransactionRegisterMySuffixService } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.service';
import { TransactionRegisterMySuffix } from '../../../../../../main/webapp/app/entities/transaction-register-my-suffix/transaction-register-my-suffix.model';

describe('Component Tests', () => {

    describe('TransactionRegisterMySuffix Management Component', () => {
        let comp: TransactionRegisterMySuffixComponent;
        let fixture: ComponentFixture<TransactionRegisterMySuffixComponent>;
        let service: TransactionRegisterMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [TransactionRegisterMySuffixComponent],
                providers: [
                    TransactionRegisterMySuffixService
                ]
            })
            .overrideTemplate(TransactionRegisterMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionRegisterMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionRegisterMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TransactionRegisterMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.transactionRegisters[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
