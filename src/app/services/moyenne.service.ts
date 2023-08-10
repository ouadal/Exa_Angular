import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MoyenneService {

  constructor(private http : HttpClient,private toastr: ToastrService) { }

  getAllMoy():Observable<any>{
    return this.http.get(`${environment.backendHost}/Moyenne/getAllMoySess`)
  }
  getMoyById(id:number):Observable<any>{
    return this.http.get(`${environment.backendHost}/Moyenne/getUneMoy/${id}`)
  }

  // moyForAllEcol(id:number):Observable<any>{
  //   return this.http.get(`${environment.backendHost}/Moyenne/getMoyForAllEcolRang/${id}`)
  // }

  // moyForUneEcol(id:number):Observable<any>{
  //   return this.http.get(`${environment.backendHost}/Moyenne/getMoyForUneEcolRang/${id}`)
  // }

  //listNotePerExamSesion(idExamen:number,idSession:number){
 //   return this.http.get(environment.backendHost+"/Moyenne/genererMoyenne/"+idExamen+"/"+idSession)
  //}


    genererMoy(idExamen:number,idsession:number):Observable<any>{
      return this.http.get(environment.backendHost+"/Moyenne/genererMoyenne?idExamen="+idExamen+"&idsession="+idsession)
    }

  getMoyForAllEcolRang(idExamen:number,idsession:number):Observable<any>{
      return this.http.get(environment.backendHost+"/Moyenne/getMoyForAllEcolRang?idExamen="+idExamen+"&idsession="+idsession)
    }


   calculrMoy(id:number):Observable<any>{
     return this.http.get(`${environment.backendHost}/Moyenne/calculerMoyenne/${id}`)
   }






  addMoy(data:any): Observable<any> {
    return this.http.post(`${environment.backendHost}/Moyenne/creeMoyen`,data).pipe(
      map(response => {
        this.toastr.success('Moyenne ajoutée avec succès !', 'Succès');
        return response;
      })
    )
  }

  editMoy(id: number | undefined, data: any):Observable<any>{
    return this.http.put(`${environment.backendHost}/Moyenne/editMoyen/${id}`,data).pipe(
      map(response => {
        this.toastr.info('Moyenne modifié avec succès !', 'Succès');
        return response;
      })
    )
  }
  deleteMoy(id: number): Observable<any> {
    return this .http.delete(`${environment.backendHost}/Moyenne/suppMoy/${id}`).pipe(
      map(response => {
        this.toastr.success('Moyenne supprimé avec succès !', 'Succès');
        return response;
      })
    )
  }

}

