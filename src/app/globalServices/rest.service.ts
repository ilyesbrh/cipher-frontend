import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const ROOT = environment.API_URL;
const RefreshTokenLink = `${ROOT}auth/token/refresh/`;
const signUpLink = `${ROOT}auth/signup/`;
const signInLink = `${ROOT}auth/signin/`;
const signOutLink = `${ROOT}auth/signout/`;
const UserLink = `${ROOT}auth/user/`;
const addPlayerIDLink = `${ROOT}auth/user/player_id`;
const AllAnomalies = `${ROOT}anomalies/`;
const AllHistory = `${ROOT}anomalies/history/`;
const AddSolution = `${ROOT}anomalies/`;
const ResendEmailLink = `${ROOT}auth/email/resend-confirm/`;

@Injectable({
  providedIn: 'root'
})
export class RestService {


  constructor(private http: HttpClient) {
  }

  getRefreshToken(refresh) {

    return this.http.post(RefreshTokenLink, { refresh }).pipe(
      catchError((err) => {
        console.log('error getting token');

        return throwError(err);
      }));
  }
  register(user) {
    console.log(user);

    return this.http.post(signUpLink, user);
  }
  login(email, password) {
    console.log('[LOGIN QUERY]');

    return this.http.post(signInLink, { email, password }).pipe(map((res) => { console.log(res); return res; }));
  }
  confirmEmail(email) {
    console.log('[CONFIRMATION QUERY]');

    return this.http.post(ResendEmailLink, { email }).pipe(map((res) => { console.log(res); return res; }));
  }
  logOut(player_id: string) {
    console.log('[LOGOUT QUERY]');

    return this.http.post(signOutLink, { player_id }).toPromise();
  }
  getUser() {

    console.log('[GETUSER QUERY]');

    return this.http.get(UserLink).toPromise();
  }
  getAnomalies() {
    console.log('[GET HISTORY QUERY]');

    return this.http.get(AllAnomalies).pipe(map((v: any) => {
      console.log(v);

      v.forEach(element => {
        element.created = new Date(element.created).getTime();
        element.updated = new Date(element.updated).getTime();
      });
      return v;

    }));
  }
  getHistory() {
    console.log('[GET ANOMALIES QUERY]');

    return this.http.get(AllHistory).pipe(map((v: any) => {
      console.log(v);

      v.forEach(element => {
        element.created = new Date(element.created).getTime();
        element.updated = new Date(element.updated).getTime();
      });
      return v;

    }));

  }

  getNotifications() {
    console.log('[GETNOTIFS QUERY]');

    return null;
  }
  markAsSeen(id) {
    console.log('[MARKASSEEN QUERY]');

    return null;
  }
  updateProfile(editUser: { address: string; domain: string; email: string; first_name: string; last_name: string; phone: string; }) {
    console.log('[UPDATEPROFILE QUERY]');
    console.log(editUser);

    return this.http.patch(UserLink, editUser);
  }
  addSolution(id, data) {
    console.log('[ADDANOMALY QUERY]');

    return this.http.post(AddSolution + id + '/solutions/', data).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  }
  sendPlayerId(id) {
    console.log('[SEND ID]');
    this.http.post(addPlayerIDLink, { player_id: id }).toPromise();
  }
}

