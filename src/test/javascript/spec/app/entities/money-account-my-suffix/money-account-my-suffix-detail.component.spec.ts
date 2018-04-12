/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BarkleyTestModule } from '../../../test.module';
import { MoneyAccountMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix-detail.component';
import { MoneyAccountMySuffixService } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.service';
import { MoneyAccountMySuffix } from '../../../../../../main/webapp/app/entities/money-account-my-suffix/money-account-my-suffix.model';

describe('Component Tests', () => {

    describe('MoneyAccountMySuffix Management Detail Component', () => {
        let comp: MoneyAccountMySuffixDetailComponent;
        let fixture: ComponentFixture<MoneyAccountMySuffixDetailComponent>;
        let service: MoneyAccountMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [MoneyAccountMySuffixDetailComponent],
                providers: [
                    MoneyAccountMySuffixService
                ]
            })
            .overrideTemplate(MoneyAccountMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MoneyAccountMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MoneyAccountMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MoneyAccountMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.moneyAccount).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
