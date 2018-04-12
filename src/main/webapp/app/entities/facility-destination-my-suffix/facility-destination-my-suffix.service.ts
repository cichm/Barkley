import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FacilityDestinationMySuffix } from './facility-destination-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FacilityDestinationMySuffix>;

@Injectable()
export class FacilityDestinationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/facility-destinations';

    constructor(private http: HttpClient) { }

    create(facilityDestination: FacilityDestinationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(facilityDestination);
        return this.http.post<FacilityDestinationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(facilityDestination: FacilityDestinationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(facilityDestination);
        return this.http.put<FacilityDestinationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FacilityDestinationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FacilityDestinationMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FacilityDestinationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FacilityDestinationMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FacilityDestinationMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FacilityDestinationMySuffix[]>): HttpResponse<FacilityDestinationMySuffix[]> {
        const jsonResponse: FacilityDestinationMySuffix[] = res.body;
        const body: FacilityDestinationMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FacilityDestinationMySuffix.
     */
    private convertItemFromServer(facilityDestination: FacilityDestinationMySuffix): FacilityDestinationMySuffix {
        const copy: FacilityDestinationMySuffix = Object.assign({}, facilityDestination);
        return copy;
    }

    /**
     * Convert a FacilityDestinationMySuffix to a JSON which can be sent to the server.
     */
    private convert(facilityDestination: FacilityDestinationMySuffix): FacilityDestinationMySuffix {
        const copy: FacilityDestinationMySuffix = Object.assign({}, facilityDestination);
        return copy;
    }
}
