import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http : HttpClient,private toastr: ToastrService) { }

  getAllNot():Observable<any>{
    return this.http.get(`${environment.backendHost}/Note/getAllNotSess`)
  }



  // notPerExam(id:number):Observable<any>{
  //   return this.http.get(`${environment.backendHost}/Note/getNotePerExam/${id}`)
  // }




  getNotById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Note/getUneNot/${id}`)
  }


  // mettreAjourNot(id:number):Observable<any>{
  //   return this.http.put(`${environment.backendHost}/Note/miseAjourDeToutesLesNotes/${id}`)
  // }




  // notElevPerExamPerSess(id:number):Observable<any>{
  //   return this.http.get(`${environment.backendHost}/Note/getNotElevPerExamSession/${id}`)
  // }


  // notGener(id:number):Observable<any>{
  //   return this.http.get(`${environment.backendHost}/Note/getAllNoGen/${id}`)
  // }

  genereNotePerExam(idExam: number | null, idSession: number):Observable<any>{
    return this.http.get(environment.backendHost+"/Note/getNotePerExam/"+idExam+"/"+idSession)
  }


  listNotePerExamSess(idExam: number | null, idSession: number | null):Observable<any>{
    return this.http.get(environment.backendHost+"/Note/listNotePerExamSesion/"+idExam+"/"+idSession)
  }



  // findNotePerExamAttribSess(idExam: number | null, idAttriMat: number | null, idSession: number | null){
  //   return this.http.get(environment.backendHost+"/Note/findNotePerExamAttribSess/"+idExam+"/"+idSession+"/"+idAttriMat)
  // }
  listNotePerExamSesionMat(idExam: number | null, idSession: number | null, idAttriMat: number | null){
    return this.http.get(environment.backendHost+"/Note/listNotePerExamSesionMat?idExamen="+idExam+"&idSession="+idSession+"&idMat="+idAttriMat)
  }


  addNot(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Note/creeNote`,data).pipe(
      map(response => {
        this.toastr.success('Note ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editNot(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Note/editNote/${id}`,data)

  }
  deleteNot(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Note/suppNot/${id}`).pipe(
      map(response => {
        this.toastr.success('Note supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }

}


