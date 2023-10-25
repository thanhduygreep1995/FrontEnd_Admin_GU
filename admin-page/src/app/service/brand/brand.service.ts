import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class brandService {
  private apiUrl = 'http://localhost:8080/api/v0/brands'; // Thay thế URL_API_BRAND bằng URL thực tế của API Brand

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

    getBrandById(brandId: number): Observable<any> {
    const url = `${this.apiUrl}/${brandId}`;
    return this.http.get(url);
  }
}