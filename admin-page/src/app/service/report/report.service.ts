import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/api/v0/income-reports';

  constructor(private http: HttpClient) {}

  getDefaultIncomeReport(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/default-list');
  }
  getAllOrderDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/byTime');
  }
}
