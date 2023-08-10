import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CycleTypeExamenService {

  constructor(private http : HttpClient, private  toastr : ToastrService) { }

  addCycleTypExam(data:any):Observable<any>{
    return this.http.post(`${environment.backendHost}/CycleType/creeCycle`,data).pipe(
      map(response => {
        this.toastr.success('CycleType ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editCycleTypExam(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/CycleType/editInscription/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Cycle modifié avec succès !', 'Succès');
        return response;
      })
    )
  }

  getAllCycleTypExam(): Observable<any> {
    return this.http.get(`${environment.backendHost}/CycleType/getAllCycle`)
  }

  listtypeExamenPerCycle(id:number): Observable<any> {
    return this.http.get(`${environment.backendHost}/CycleType/listtypeExamenPerCycle/${id}`)
  }

  deleteCycleTypExam(id:number):Observable<any>{
    return this.http.delete(`${environment.backendHost}/CycleType/suppInsc/${id}`).pipe(
      map(response => {
        this.toastr.success('CycleType supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }

  getCycleTypExamById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/CycleType/getUnCycleTyp/${id}`)
  }




}
