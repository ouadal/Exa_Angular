import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http : HttpClient,private toastr: ToastrService ) { }

  getAllExam():Observable<any>{
    return this.http.get(`${environment.backendHost}/Examen/getAllExamEcol`)
  }


  getStatisques(idExam: number , idSession: number ):Observable<any>{
    return this.http.get(`${environment.backendHost}/Examen/taux-reussite-par-ecole?idexamen=${idExam}&idsession=${idSession}`)
  }

  DesactiverExam(id: number): Observable<any>{
    return this.http.put(`${environment.backendHost}/Examen/ExamToFalse/${id}`,undefined)

  }



  getExamAuCourDuneAnnee(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Examen/getExamAuCoursAnneeCourante/${id}`)
  }


  // listdesExamParEcol(id:number):Observable<any>{
  //   return this.http.get(`${environment.backendHost}/Examen/listExamPerEcol/${id}`)
  // }
  getExamById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Examen/getUnExam/${id}`)
  }
  listExamPerEcol(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Examen/listExamPerEcol/${id}`)
  }

  setActivationExam(idExamen:number,idEcole:number){
    return this.http.put(`${environment.backendHost}/Examen/setCurrentExamToActif?idExamen=${idExamen}&idEcole=${idEcole}`,undefined)
  }


  addExam(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Examen/creeExam`,data).pipe(
      map(response => {
        this.toastr.success('Examen ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editExam(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Examen/editexam/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Examen modifié avec succès !', 'Succès');
        return response;
      })
    )
  }
  deleteExam(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Examen/suppExam/${id}`).pipe(
      map(response => {
        this.toastr.success('Examen supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }}




