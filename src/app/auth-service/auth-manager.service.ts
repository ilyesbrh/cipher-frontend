import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RestService } from './REST.service';
import { tap, mapTo, catchError, filter, map, switchMap, retryWhen, delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  connection$: any;
  RETRY_SECONDS: 10;

  constructor(private http: RestService, private router: Router) { }

  login(email: string, password: string) {
    return this.http.login(email, password).pipe(
      tap(result => this.doLoginUser(email, result)),
      mapTo({ success: true, message: '' }),
      catchError(error => {
        console.log(error.error);

        return of({ success: false, message: 'Mail or password incorrect' });
      }));
  }

  async logout() {
    this.router.navigate(['/login']);
    this.doLogoutUser();
    return true;

  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, result: any) {
    this.loggedUser = email;
    this.storeTokens(result.token, null);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    console.log('[new JWT]' + jwt);
  }

  private storeTokens(jwt, refreshToken) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    // Player ID is fix no need to remove it
    //localStorage.removeItem(this.PLAYER_ID);
  }
}
