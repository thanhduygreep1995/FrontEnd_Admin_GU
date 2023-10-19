import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Product } from "./product";      

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   private baseUrl="http://localhost:8080/api/v0/product";
   constructor(private http: HttpClient){}

   getProductList(): Observable<Product[]>{
      return this.http.get<Product[]>(this.baseUrl);
   }
   // findSpecByID(id:any){
   //    return this.http.get(this.baseUrl+);
   // }
   createProduct(product: any): Observable<any> {
      const url = `${this.baseUrl+"/create"}`;
      return this.http.post(url, product, { responseType: 'text' });
    }
  
    updateProduct(id: number, product: any): Observable<any> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.put(url, Product, { responseType: 'text' });
    }
    deleteProduct(id: any): Observable<any> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete(url, { responseType: 'text' });
    }
    getActiveProduct() {
      return this.http.get(this.baseUrl + '/active');
    }
  
   getProductById(id: number){
      return this.http.get(this.baseUrl+"/"+id);
    }
}