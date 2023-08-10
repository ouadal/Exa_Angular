import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  PUBLIC_URL = {
    login:`${environment.backendHost}/api/v1/auth/login`,
    register:`${environment.backendHost}/api/v1/auth/register`,
    cycle:`${environment.backendHost}/Cycle/getAllCycle`
  }

  constructor(private authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(
      !(
        request.url.includes(this.PUBLIC_URL.login) ||
        request.url.includes(this.PUBLIC_URL.register) ||
        request.url.includes(this.PUBLIC_URL.cycle)
      )
    ){
        const authToken = this.authenticationService.getUserInformations();
        const authReq = request.clone({
          headers: request.headers.set('Authorization', `${authToken.token_type}${authToken.access_token}`)
        });
        return next.handle(authReq);
      }
      return next.handle(request);
  }
}
