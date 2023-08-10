import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EnrolementService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }


  getAllEnrol():Observable<any>{
    return this.http.get(`${environment.backendHost}/Enrolement/getAllEnrolEcol`)
  }
  getAllEnrolByIdEcole(idEcole:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Enrolement/getAllEnrollementsByEcol/${idEcole}`)
  }
  getAllEcolThatAreEnrolled(idExamen:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Enrolement/getAllEcolThatAreEnrolled/${idExamen}`)
  }
  getEnrolById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Enrolement/getUnEnrol/${id}`)
  }


  addEnrol(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Enrolement/creeEnrolement`,data).pipe(
      map(response => {
        this.toastr.success('Enrolement ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editEnrol(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Enrolement/editenrol/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Enrolement modifié avec succès !', 'Succès');
        return response;
      })
    )
  }
  deleteEnrol(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Enrolement//suppEnrol/${id}`).pipe(
      map(response => {
        this.toastr.success('Enrolement supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }
}
