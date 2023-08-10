import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EcoleService {

  constructor(private http : HttpClient, private toastr: ToastrService) { }

  getAllEcol():Observable<any>{
    return this.http.get(`${environment.backendHost}/Ecole/getAllEcolCycle`)
  }
  // listdesEcollorsDunExam(id:number):Observable<any>{
  //   return this.http.get(`${environment.backendHost}/Ecole/listeDesEcolesLorsDunExamen/${id}`)
  // }

  getEcolById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Ecole/getUneEcol/${id}`)
  }


  addEcol(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Ecole/creeEcole`,data).pipe(
      map(response => {
        this.toastr.success('Ecole ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editEcol(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Ecole/editecole/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Ecole modifié avec succès !', 'Succès');
        return response;
      })
    )
  }
  deleteEcol(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Ecole/suppEcol/${id}`).pipe(
      map(response => {
        this.toastr.success('Ecole supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }

  listeDesEcolesLorsDunExamen(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Ecole/listeDesEcolesLorsDunExamen/${id}`)
  }

}
