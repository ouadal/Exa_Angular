import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  //  API PART
  login(loginModel:any){
    return this.http.post(`${environment.backendHost}/api/v1/auth/login`,loginModel)
  }

  register(registerModel:any){
    return this.http.post(`${environment.backendHost}/api/v1/auth/register`,registerModel);
  }

  getMyInformations(){
    return this.http.post(`${environment.backendHost}/api/v1/auth/me`,undefined);
  }

  //  TOKEN PART

  getUserInformations():any{
    return JSON.parse(localStorage.getItem('userInformations')!);
  }
  setUserInformations(LoginResponseModel:any){
    localStorage.setItem('userInformations',JSON.stringify(LoginResponseModel));
  }
  getRoles():any[]{
    return JSON.parse(localStorage.getItem('userRoles')!)
  }
  setRoles(listRoleModel:any[]){
    localStorage.setItem('userRoles',JSON.stringify(listRoleModel));
  }
}
