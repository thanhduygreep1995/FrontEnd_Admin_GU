import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class originService {
  private apiUrl = 'http://localhost:8080/api/v0/origins'; // Thay thế URL_API_BRAND bằng URL thực tế của API Brand

  constructor(private http: HttpClient) { }

  getOrigins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOriginById(originId: number): Observable<any> {
    const url = `${this.apiUrl}/${originId}`;
    return this.http.get(url);
  }
}