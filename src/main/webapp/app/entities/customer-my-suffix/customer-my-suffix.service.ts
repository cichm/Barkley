import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerMySuffix } from './customer-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerMySuffix>;

@Injectable()
export class CustomerMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/customers';

    constructor(private http: HttpClient) { }

    create(customer: CustomerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.post<CustomerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customer: CustomerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<CustomerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerMySuffix[]>): HttpResponse<CustomerMySuffix[]> {
        const jsonResponse: CustomerMySuffix[] = res.body;
        const body: CustomerMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerMySuffix.
     */
    private convertItemFromServer(customer: CustomerMySuffix): CustomerMySuffix {
        const copy: CustomerMySuffix = Object.assign({}, customer);
        return copy;
    }

    /**
     * Convert a CustomerMySuffix to a JSON which can be sent to the server.
     */
    private convert(customer: CustomerMySuffix): CustomerMySuffix {
        const copy: CustomerMySuffix = Object.assign({}, customer);
        return copy;
    }
}
