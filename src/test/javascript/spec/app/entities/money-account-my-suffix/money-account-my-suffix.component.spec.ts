/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BarkleyTestModule } from '../../../test.module';
import { MoneyAccountMySuffixComponent } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.component';
import { MoneyAccountMySuffixService } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.service';
import { MoneyAccountMySuffix } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.model';

describe('Component Tests', () => {

    describe('MoneyAccountMySuffix Management Component', () => {
        let comp: MoneyAccountMySuffixComponent;
        let fixture: ComponentFixture<MoneyAccountMySuffixComponent>;
        let service: MoneyAccountMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [MoneyAccountMySuffixComponent],
                providers: [
                    MoneyAccountMySuffixService
                ]
            })
            .overrideTemplate(MoneyAccountMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MoneyAccountMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MoneyAccountMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MoneyAccountMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.moneyAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
