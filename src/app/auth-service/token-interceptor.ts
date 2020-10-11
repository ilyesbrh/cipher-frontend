import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthManagerService } from './auth-manager.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthManagerService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }


    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {

        // this condition is for get refresh token request
        // 'Token is invalid or expired' is unique for getRefresh token
        // if this error occurs that mean we need to logOUT
        // without this line it will not throw error
        this.authService.logout();
        return throwError(error);
      } else if (error instanceof HttpErrorResponse && error.status === 204) {
        return of(request);
      } else {
        return throwError(error);
      }
    })) as any;
  }

  private addToken(request: HttpRequest<any>, token: string) {

    let Configuration;
    Configuration = {
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    };

    return request.clone(Configuration);
  }

}
