import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, retry} from "rxjs";
import { map } from 'rxjs/operators';
// @ts-ignore
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  constructor(private http : HttpClient,private toastr: ToastrService) {
  }
  getAllAnnee():Observable<any>{
    return this.http.get(`${environment.backendHost}/Annee/getAllAnn`)
  }
  getAnneeById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Annee/getUneAnnee/${id}`)
  }
  activerAnnee(id:number):Observable<any>{
    return this.http.put(`${environment.backendHost}/Annee/AnneeEnCours/${id}`,null)
  }

  addAnnee(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Annee/creeAnnee`,data).pipe(
      map(response => {
        this.toastr.success('Année ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editAnnee(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Annee/editAnnee/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Année modifié avec succès !', 'Succès');
        return response;
      })
    )
  }
  deleteAnnee(id: number): Observable<any> {
 return this .http.delete(`${environment.backendHost}/Annee/suppAnn/${id}`).pipe(
   map(response => {
     this.toastr.success('Année supprimé avec succès !', 'Succès');
     return response;
   })
 )
  }

}
