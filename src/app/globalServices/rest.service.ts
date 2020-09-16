import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const ROOT = environment.API_URL;
const LOGIN_LINK = `${ROOT}auth/signin`;
const USER_LINK = `${ROOT}users/me`;
const CASE_CREATE_LINK = `${ROOT}cases`;
const CONTACT_LINK = `${ROOT}contacts`;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  /* AUTHENTICATION */

  login(email, password) {
    console.log('[LOGIN QUERY]');

    return this.http.post(LOGIN_LINK, { email, password }).pipe(map((res) => { console.log(res); return res; }));
  }
  register(user) {
    console.log(user);

    return this.http.post('signUP', user);
  }

  getUser() {

    console.log('[GETUSER QUERY]');

    return this.http.get(USER_LINK).toPromise();
  }

  /* DATA QUERY */
  getAllContacts() {

    let filter = new HttpParams();
    filter.append('filter', `
    {
      "fields": {
        "id": false,
        "fullName": true,
        "father": false,
        "mother": false,
        "phone": false,
        "birthday": false,
        "address": false,
        "email": false,
        "description": false,
        "createdAt": false,
        "updatedAt": false
      }
    }`);
    return this.http.get(CONTACT_LINK, { params: filter });
  }


  /* DATA MUTATE */
  createCase(values: any) {
    return this.http.post(CASE_CREATE_LINK, values).toPromise();
  }
  createAttachments(value: any, id: any) {
    return this.http.post(CASE_CREATE_LINK + '/' + id + '/attachments', value).toPromise();
  }
  createClient(values) {
    return this.http.post(CONTACT_LINK, values).toPromise();
  }

  updateProfile(editUser) {
    console.log('[UPDATEPROFILE QUERY]');
    console.log(editUser);

    return this.http.patch(USER_LINK, editUser);
  }

  // addSolution(id, data) {
  //   console.log('[ADDANOMALY QUERY]');
  //   return this.http.post(AddSolution + id + '/solutions/', data).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  // }

}

