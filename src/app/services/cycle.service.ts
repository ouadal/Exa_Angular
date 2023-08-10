import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  constructor(private http : HttpClient, private  toastr : ToastrService) {}
  addCycle(data:any):Observable<any>{
    return this.http.post(`${environment.backendHost}/Cycle/creeCycle`,data).pipe(
      map(response => {
        this.toastr.success('Cycle ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editCycle(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Cycle/AnneeEnCours/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Cycle modifié avec succès !', 'Succès');
        return response;
      })
    )
  }

  getAllCycle(): Observable<any> {
    return this.http.get(`${environment.backendHost}/Cycle/getAllCycle`)
  }

  deleteCycle(id:number):Observable<any>{
    return this.http.delete(`${environment.backendHost}/Cycle/suppInsc/${id}`).pipe(
      map(response => {
        this.toastr.success('Cycle dupprimé avec succès !', 'Succès');
        return response;
      })
    )
  }

  getCycleById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Cycle/getUnCycle/${id}`)
  }


}
