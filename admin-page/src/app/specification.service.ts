import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
   providedIn: 'root'
})
export class SpecificationService {
   baseUrl="http://localhost:8080/api/v0/specification";
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
   deleteSpec(id:number){
      return this.http.delete(this.baseUrl+"/"+id);
   }
}