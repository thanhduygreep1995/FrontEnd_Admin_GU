import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Spec} from "./specification";
const headers = new HttpHeaders({
   'Content-Type': 'application/json', // Thiết lập kiểu dữ liệu gửi đi (ở đây là JSON)
   'Authorization': 'Bearer ' // Nếu bạn có sử dụng token xác thực
   // Các headers khác nếu cần
 });
@Injectable({
   providedIn: 'root'
})
export class SpecificationService {
   baseUrl="http://localhost:8080/api/v0/specification";


   constructor(private http:HttpClient){}
   // getData(): Observable<any[]> {
   //    return this.http.get<any[]>(`${this.baseUrl}/list`);
   //  }
   getAllSpecifications(): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl, { headers: headers })
      
   }
   // findSpecByID(id:any){
   //    return this.http.get(this.baseUrl+);
   // }
   saveSpec(specification: Spec){
      return this.http.post<any>(this.baseUrl+"/create", specification);
   }
   // updateSpec(specification:any){
   //    return this.http.put(this.baseUrl,specification);
   // }
   deleteSpec(id:number): Observable<Object> {
      return this.http.delete(this.baseUrl+"/"+id);
   }
}