import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http : HttpClient,private toastr: ToastrService) { }

  getAllMat():Observable<any>{
    return this.http.get(`${environment.backendHost}/Matiere/getTypMat`)
  }

    getMatById(id: number | undefined):Observable<any>{
    return this.http.get(`${environment.backendHost}/Matiere/getUneMat/${id}`)
  }

  getMatByElev():Observable<any>{
    return this.http.get(`${environment.backendHost}/Matiere/getMatPerElev`)
  }


  addMat(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Matiere/creeMatiere`,data).pipe(
      map(response => {
        this.toastr.success('Matiere ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editMat(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Matiere/editMatiere/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Matiere modifié avec succès !','Succès');
        return response;
      })
    )
  }
  deleteMat(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Matiere/suppMat/${id}`).pipe(
      map(response => {
        this.toastr.success('Matiere supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }



}
