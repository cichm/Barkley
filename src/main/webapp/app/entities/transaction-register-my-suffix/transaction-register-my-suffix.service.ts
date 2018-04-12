import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TransactionRegisterMySuffix } from './transaction-register-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TransactionRegisterMySuffix>;

@Injectable()
export class TransactionRegisterMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/transaction-registers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(transactionRegister: TransactionRegisterMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(transactionRegister);
        return this.http.post<TransactionRegisterMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transactionRegister: TransactionRegisterMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(transactionRegister);
        return this.http.put<TransactionRegisterMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TransactionRegisterMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TransactionRegisterMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TransactionRegisterMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TransactionRegisterMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TransactionRegisterMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TransactionRegisterMySuffix[]>): HttpResponse<TransactionRegisterMySuffix[]> {
        const jsonResponse: TransactionRegisterMySuffix[] = res.body;
        const body: TransactionRegisterMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TransactionRegisterMySuffix.
     */
    private convertItemFromServer(transactionRegister: TransactionRegisterMySuffix): TransactionRegisterMySuffix {
        const copy: TransactionRegisterMySuffix = Object.assign({}, transactionRegister);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(transactionRegister.date);
        return copy;
    }

    /**
     * Convert a TransactionRegisterMySuffix to a JSON which can be sent to the server.
     */
    private convert(transactionRegister: TransactionRegisterMySuffix): TransactionRegisterMySuffix {
        const copy: TransactionRegisterMySuffix = Object.assign({}, transactionRegister);

        copy.date = this.dateUtils.toDate(transactionRegister.date);
        return copy;
    }
}
