import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http : HttpClient, private toastr : ToastrService) { }

  addSession(data:any):Observable<any>{
    return this.http.post(`${environment.backendHost}/Session/creeSession`,data).pipe(
      map(response => {
        this.toastr.success('Session ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editSession(id:number,data:any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Session/editCycle`,data).pipe(
      map(response => {
        this.toastr.info('Session modifié avec succès !', 'Succès');
        return response;
      })
    )
  }

  getAllSession():Observable<any>{
    return this.http.get(`${environment.backendHost}/Session/getAllSess`)
  }

  deleteSession(id:number):Observable<any>{
    return this.http.delete(`${environment.backendHost}/Session/suppSess/${id}`).pipe(
      map(response => {
        this.toastr.success('Session supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }
}
