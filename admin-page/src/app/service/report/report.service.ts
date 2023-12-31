import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseOrderUrl = 'http://localhost:8080/api/v0/income-reports';

  private baseCustomerUrl = 'http://localhost:8080/api/v0/customer-reports';

  constructor(private http: HttpClient) {}

  getDefaultIncomeReport(): Observable<any[]> {
    return this.http.get<any[]>(this.baseOrderUrl + '/default-list');
  }
  getIncomeReportByDay(from: String, to: String): Observable<any[]> {
    return this.http.get<any[]>(this.baseOrderUrl + "/byTime?from="+ from + "&to=" + to);
  }

  getAllCustomerReport(): Observable<any[]> {
    return this.http.get<any[]>(this.baseCustomerUrl + '/all-list');
  }

  getBuyingCustomerReport(): Observable<any[]> {
    return this.http.get<any[]>(this.baseCustomerUrl + '/buying-list');
  }

  getNoneBuyingCustomerReport(): Observable<any[]> {
    return this.http.get<any[]>(this.baseCustomerUrl + '/none-buying-list');
  }
  getStatus(): Observable<string> {
    return this.http.get<string>(`${this.baseCustomerUrl}/status`);
  }
}
