import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypeExamenService {

  constructor(private http : HttpClient,private toastr : ToastrService) { }
  addTypeExamen(data:any):Observable<any>{
    return this.http.post(`${environment.backendHost}/TypeExamen/creeTypeExam`,data).pipe(
      map(response => {
        this.toastr.success('Type examen ajoutée avec succès !', 'Succès');
        return response;
      })
    )

  }

  editTypeExamen(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/TypeExamen/editTypeExam/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Type examen modifié avec succès !', 'Succès');
        return response;
      })
    )
  }

  getAllTypeExamen():Observable<any>{
    return this.http.get (`${environment.backendHost}/TypeExamen/getAllInscrEcol`)
  }


  getTypeExamenById(id:number):Observable<any>{
    return this.http.get (`${environment.backendHost}/TypeExamen/getUnTypExam/${id}`)
  }

  deleteTypeExamen(id:number):Observable<any>{
    return this.http.delete(`${environment.backendHost}/TypeExamen/suppTypeExam/${id}`).pipe(
      map(response => {
        this.toastr.success('Type examen supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }
}
