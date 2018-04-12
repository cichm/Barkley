import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FacilityFromMySuffix } from './facility-from-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FacilityFromMySuffix>;

@Injectable()
export class FacilityFromMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/facility-froms';

    constructor(private http: HttpClient) { }

    create(facilityFrom: FacilityFromMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(facilityFrom);
        return this.http.post<FacilityFromMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(facilityFrom: FacilityFromMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(facilityFrom);
        return this.http.put<FacilityFromMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FacilityFromMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FacilityFromMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FacilityFromMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FacilityFromMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FacilityFromMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FacilityFromMySuffix[]>): HttpResponse<FacilityFromMySuffix[]> {
        const jsonResponse: FacilityFromMySuffix[] = res.body;
        const body: FacilityFromMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FacilityFromMySuffix.
     */
    private convertItemFromServer(facilityFrom: FacilityFromMySuffix): FacilityFromMySuffix {
        const copy: FacilityFromMySuffix = Object.assign({}, facilityFrom);
        return copy;
    }

    /**
     * Convert a FacilityFromMySuffix to a JSON which can be sent to the server.
     */
    private convert(facilityFrom: FacilityFromMySuffix): FacilityFromMySuffix {
        const copy: FacilityFromMySuffix = Object.assign({}, facilityFrom);
        return copy;
    }
}
