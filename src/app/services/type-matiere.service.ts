import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypeMatiereService {

  constructor(private http : HttpClient,private  toastr:ToastrService) { }

  addTypeMat(data:any):Observable<any>{
    return this.http.post(`${environment.backendHost}/TypeMat/creeTypeMat`,data).pipe(
      map(response => {
        this.toastr.success('Type Matiere ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editTypeMat(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/TypeMat/${id}`,data).pipe(
      map(response => {
        this.toastr.success('Type Matiere modifié avec succès !', 'Succès');
        return response;
      })
    )
  }

  getAllTypeMat():Observable<any>{
    return this.http.get (`${environment.backendHost}/TypeMat/getAllTypeMat`)
  }

  getTypeMatById(id:number):Observable<any>{
    return this.http.get (`${environment.backendHost}/TypeExamen/getUneTypMat/${id}`)
  }

  deleteTypeMat(id:number):Observable<any>{
    return this.http.delete(`${environment.backendHost}/TypeMat/suppTypeMat/${id}`).pipe(
      map(response => {
        this.toastr.success('Type Matiere supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }

}
