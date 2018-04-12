import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CardMySuffix } from './card-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CardMySuffix>;

@Injectable()
export class CardMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cards';

    constructor(private http: HttpClient) { }

    create(card: CardMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.post<CardMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(card: CardMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.put<CardMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CardMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CardMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CardMySuffix[]>): HttpResponse<CardMySuffix[]> {
        const jsonResponse: CardMySuffix[] = res.body;
        const body: CardMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CardMySuffix.
     */
    private convertItemFromServer(card: CardMySuffix): CardMySuffix {
        const copy: CardMySuffix = Object.assign({}, card);
        return copy;
    }

    /**
     * Convert a CardMySuffix to a JSON which can be sent to the server.
     */
    private convert(card: CardMySuffix): CardMySuffix {
        const copy: CardMySuffix = Object.assign({}, card);
        return copy;
    }
}
