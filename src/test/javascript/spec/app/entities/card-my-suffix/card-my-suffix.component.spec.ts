/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BarkleyTestModule } from '../../../test.module';
import { CardMySuffixComponent } from '../../../../../../main/webapp/app/entities/card-my-suffix/card-my-suffix.component';
import { CardMySuffixService } from '../../../../../../main/webapp/app/entities/card-my-suffix/card-my-suffix.service';
import { CardMySuffix } from '../../../../../../main/webapp/app/entities/card-my-suffix/card-my-suffix.model';

describe('Component Tests', () => {

    describe('CardMySuffix Management Component', () => {
        let comp: CardMySuffixComponent;
        let fixture: ComponentFixture<CardMySuffixComponent>;
        let service: CardMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarkleyTestModule],
                declarations: [CardMySuffixComponent],
                providers: [
                    CardMySuffixService
                ]
            })
            .overrideTemplate(CardMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CardMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
