import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product";      

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   private baseUrl="http://localhost:8080/api/v0/product";
   constructor(private http:HttpClient){}

   getProductList(): Observable<Product[]>{
      return this.http.get<Product[]>(this.baseUrl);
   }
   // findSpecByID(id:any){
   //    return this.http.get(this.baseUrl+);
   // }
   saveProduct(product: Product): Observable<any> {
      return this.http.post<any>(this.baseUrl+"/create", product);
    }
   // updateProduct(product:any){
   //    return this.http.put(this.baseUrl,product);
   // }
   deleteProduct(id:number): Observable<Object> {
      return this.http.delete(this.baseUrl+"/"+id);
   }
}