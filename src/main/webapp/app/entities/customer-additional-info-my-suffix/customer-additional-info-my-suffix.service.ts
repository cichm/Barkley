import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CustomerAdditionalInfoMySuffix } from './customer-additional-info-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CustomerAdditionalInfoMySuffix>;

@Injectable()
export class CustomerAdditionalInfoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/customer-additional-infos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(customerAdditionalInfo: CustomerAdditionalInfoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(customerAdditionalInfo);
        return this.http.post<CustomerAdditionalInfoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customerAdditionalInfo: CustomerAdditionalInfoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(customerAdditionalInfo);
        return this.http.put<CustomerAdditionalInfoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CustomerAdditionalInfoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CustomerAdditionalInfoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomerAdditionalInfoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CustomerAdditionalInfoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CustomerAdditionalInfoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CustomerAdditionalInfoMySuffix[]>): HttpResponse<CustomerAdditionalInfoMySuffix[]> {
        const jsonResponse: CustomerAdditionalInfoMySuffix[] = res.body;
        const body: CustomerAdditionalInfoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CustomerAdditionalInfoMySuffix.
     */
    private convertItemFromServer(customerAdditionalInfo: CustomerAdditionalInfoMySuffix): CustomerAdditionalInfoMySuffix {
        const copy: CustomerAdditionalInfoMySuffix = Object.assign({}, customerAdditionalInfo);
        copy.birthdate = this.dateUtils
            .convertDateTimeFromServer(customerAdditionalInfo.birthdate);
        return copy;
    }

    /**
     * Convert a CustomerAdditionalInfoMySuffix to a JSON which can be sent to the server.
     */
    private convert(customerAdditionalInfo: CustomerAdditionalInfoMySuffix): CustomerAdditionalInfoMySuffix {
        const copy: CustomerAdditionalInfoMySuffix = Object.assign({}, customerAdditionalInfo);

        copy.birthdate = this.dateUtils.toDate(customerAdditionalInfo.birthdate);
        return copy;
    }
}
