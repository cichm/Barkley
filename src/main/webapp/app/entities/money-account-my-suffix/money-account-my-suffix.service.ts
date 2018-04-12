import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MoneyAccountMySuffix } from './money-account-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MoneyAccountMySuffix>;

@Injectable()
export class MoneyAccountMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/money-accounts';

    constructor(private http: HttpClient) { }

    create(moneyAccount: MoneyAccountMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(moneyAccount);
        return this.http.post<MoneyAccountMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(moneyAccount: MoneyAccountMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(moneyAccount);
        return this.http.put<MoneyAccountMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MoneyAccountMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MoneyAccountMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MoneyAccountMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MoneyAccountMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MoneyAccountMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MoneyAccountMySuffix[]>): HttpResponse<MoneyAccountMySuffix[]> {
        const jsonResponse: MoneyAccountMySuffix[] = res.body;
        const body: MoneyAccountMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MoneyAccountMySuffix.
     */
    private convertItemFromServer(moneyAccount: MoneyAccountMySuffix): MoneyAccountMySuffix {
        const copy: MoneyAccountMySuffix = Object.assign({}, moneyAccount);
        return copy;
    }

    /**
     * Convert a MoneyAccountMySuffix to a JSON which can be sent to the server.
     */
    private convert(moneyAccount: MoneyAccountMySuffix): MoneyAccountMySuffix {
        const copy: MoneyAccountMySuffix = Object.assign({}, moneyAccount);
        return copy;
    }
}
