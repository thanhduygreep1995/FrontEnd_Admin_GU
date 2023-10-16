import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: 'root'
})
export class ProductService {
   baseUrl="http://localhost:8080/api/product";
   constructor(private http:HttpClient){}

   getAllProduct(){
      return this.http.get(this.baseUrl);
   }
   // findSpecByID(id:any){
   //    return this.http.get(this.baseUrl+);
   // }
   // addSpec(specifications:any){
   //    return this.http.post(this.baseUrl+"/list");
   // }
   updateProduct(product:any){
      return this.http.put(this.baseUrl,product);
   }
   deleteProduct(id:any){
      return this.http.delete(this.baseUrl+"/"+id);
   }
}