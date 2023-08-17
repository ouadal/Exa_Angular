import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AttributionMatiereService {

  constructor(private http : HttpClient,private toastr: ToastrService) { }
  getAllAttMat():Observable<any>{
    return this.http.get(`${environment.backendHost}/AttributionMat/getAllAttriMatAnn`)
  }
  getAttMatById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/AttributionMat/getUneAttMat/${id}`)
  }
  getAttMatByEcolConn(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/AttributionMat/getAttMatByEcolConn/${id}`)
  }

  getAttMatByEcolConnAndExamen(idEcole:number,idExamen:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/AttributionMat/getAttMatByEcolConnAndExamen?idEcole=${idEcole}&idExamen=${idExamen}`)
  }

  getAttMatByExam(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/AttributionMat/getAllAttPerExam/${id}`)
  }


  addAttMAt(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/AttributionMat/creeAttribution`,data).pipe(
      map(response => {
        this.toastr.success('Matiere ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editAttMat(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/AttributionMat/editAttribu/${id}`,data).pipe(
      map(response => {
      this.toastr.info('attribu mat modifié avec succès !', 'Succès');
      return response;
    }))

  }
  deleteAttMat(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/AttributionMat/suppAttri/${id}`).pipe(
      map(response => {
        this.toastr.success('att mat supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }



}
