import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  constructor(private http : HttpClient,private toastr: ToastrService) { }
  getAllElev():Observable<any>{
    return this.http.get(`${environment.backendHost}/Eleve/getAllElev`)
  }
  getAllElevByEcol(idEcole:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Eleve/getAllElevByEcol/${idEcole}`)
  }
  listdesEcollorsDunExam(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Eleve/listeDesEcolesLorsDunExamen/${id}`)
  }

  getEleveById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Eleve/getUnElev/${id}`)
  }


  addElev(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Eleve/creeEleve`,data).pipe(
      map(response => {
        this.toastr.success('Eleve ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editElev(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Eleve/editEleve/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Eleve modifié avec succès !', 'Succès');
        return response;
      })
    )
  }
  deleteElev(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Eleve/suppElev/${id}`).pipe(
      map(response => {
        this.toastr.success('Eleve supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }
}
