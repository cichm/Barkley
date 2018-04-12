/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BarkleyTestModule } from '../../../test.module';
import { CardMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/card-my-suffix/card-my-suffix-detail.component';
import { CardMySuffixService } from '../../../../../../main/webapp/app/entities/card-my-suffix/card-my-suffix.service';
import { CardMySuffix } from '../../../../../../main/webapp/app/entities/card-my-suffix/card-my-suffix.model';

describe('Component Tests', () => {

    describe('CardMySuffix Management Detail Component', () => {
        let comp: CardMySuffixDetailComponent;
        let fixture: ComponentFixture<CardMySuffixDetailComponent>;
        let service: CardMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [CardMySuffixDetailComponent],
                providers: [
                    CardMySuffixService
                ]
            })
            .overrideTemplate(CardMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CardMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.card).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
