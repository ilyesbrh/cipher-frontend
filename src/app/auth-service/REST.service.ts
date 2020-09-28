import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const ROOT = environment.API_URL;
const CLIENTS_LINK = `${ROOT}users/`;
const LOGIN_LINK = `${ROOT}users/login`;
const USER_LINK = `${ROOT}users/me`;
const CASES_LINK = `${ROOT}cases`;
const TASKS_LINK = `${ROOT}tasks`;
const CONTACT_LINK = `${ROOT}contacts`;

@Injectable({
  providedIn: 'root'
})
export class RestService {



  constructor(private http: HttpClient) {
  }

  addTransaction(v, id): any {
    return this.http.post(CLIENTS_LINK + id + '/transactions', v).pipe(map((res) => { console.log(res); return res; })).toPromise();
  }

  deleteClient(id: any) {
    return this.http.delete(CLIENTS_LINK + id).pipe(map((res) => { console.log(res); return res; }));
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

  /* CONTACTS */
  getAllContacts(): any {

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
  createContact(values) {
    return this.http.post(TASKS_LINK, values).toPromise();
  }
  updateContact(id, data) {
    console.log('[UPDATE CLIENT QUERY]');

    return this.http.patch(CONTACT_LINK + '/' + id, data).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  }
  deleteContact(id) {

    return this.http.delete(CONTACT_LINK + '/' + id).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  }

  // CASES
  createCase(values: any) {
    return this.http.post(CASES_LINK, values).toPromise();
  }
  getArchive(start, end) {
    console.log('[GET CASES QUERY]');

    let filter = `
    {
      "offset": ${start},
      "limit": ${end}
    }
    `

    if (start === 0 && end === 0) {
      filter = `
      {
        "fields": {
          "id": true,
          "name": true,
          "number": false,
          "price": false,
          "description": false,
          "opponent": false,
          "client": false,
          "tags": false,
          "location": false,
          "isSaved": false,
          "state": false,
          "Jugement": false,
          "JugementDate": false,
          "totalDetes": false,
          "createdAt": false,
          "updatedAt": false
        }
      }
      `;
    }

    return this.http.get(CASES_LINK, { params: { filter } }).pipe(map((v: any) => {

      v.forEach(e => {
        if (e.transactions) {
          e.transactions = e.transactions.reverse();

        }
      });

      return v;
    }));

  }


  /* DATA MUTATE */

  createAttachments(value: any, id: any) {
    return this.http.post(CASES_LINK + '/' + id + '/attachments', value).toPromise();
  }

  updateProfile(editUser) {
    console.log('[UPDATE PROFILE QUERY]');
    console.log(editUser);

    return this.http.patch(USER_LINK, editUser);
  }

  // addSolution(id, data) {
  //   console.log('[ADDANOMALY QUERY]');
  //   return this.http.post(AddSolution + id + '/solutions/', data).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  // }

}

