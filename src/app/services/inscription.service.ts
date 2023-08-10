import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http : HttpClient,private toastr: ToastrService) { }

  getAllInsc():Observable<any>{
    return this.http.get(`${environment.backendHost}/Inscription/getAllInscrPerElev`)
  }
  listInscPerEcolAndExam(idEcole:number,idExamen:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Inscription/listInscPerEcolAndExam?idEcole=${idEcole}&idExamen=${idExamen}`)
  }

  listInscDesElevPerExam(idElev:number,idExamen:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Inscription/listInscDesElevPerExam?idElev=${idElev}&idExamen=${idExamen}`)
  }
  getInscById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Inscription/getUneInsc/${id}`)
  }

  allInscByExam(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Inscription/getAllInscrPerExam/${id}`)
  }


  addInsc(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Inscription/creeInscription`,data).pipe(
      map(response => {
        this.toastr.success('Inscription ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editInsc(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Inscription/editInscription/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Inscription modifié avec succès !', 'Succès');
        return response;
      })
    )
  }
  deleteInsc(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Inscription/suppInsc/${id}`).pipe(
      map(response => {
        this.toastr.success('Inscription supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }

}


