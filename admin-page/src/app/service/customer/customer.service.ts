import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/v0/customers';

  constructor(private http: HttpClient) {}

  getCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCustomerById(id: any) {
    return this.http.get(this.baseUrl + '/' + id);
  }
}
