import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBase } from 'src/app/shared/models/response-base';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public http: HttpClient) { }

  createOrder(data: any): Observable<ResponseBase> {
    return this.http.post<ResponseBase>(
      `${environment.baseUrl.url}${environment.methods.Sales}/Order/CreateOrder`,
      data
    );
  }

}
