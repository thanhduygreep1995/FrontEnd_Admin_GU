import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: 'root'
})
export class SpecificationService {
   baseUrl="http://localhost:8080/api/specification";
   constructor(private http:HttpClient){}

   getAllSpecifications(){
      return this.http.get(this.baseUrl);
   }
   // findSpecByID(id:any){
   //    return this.http.get(this.baseUrl+);
   // }
   // addSpec(specifications:any){
   //    return this.http.post(this.baseUrl+"/list");
   // }
   updateSpec(specification:any){
      return this.http.put(this.baseUrl,specification);
   }
   deleteSpec(id:any){
      return this.http.delete(this.baseUrl+"/"+id);
   }
}