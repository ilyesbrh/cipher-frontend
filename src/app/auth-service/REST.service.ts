import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const ROOT = environment.API_URL;
const loginLink = `${ROOT}users/login`;
const addClient = `${ROOT}users/`;
const addTransaction = `${ROOT}users/`;
const removeClient = `${ROOT}users/`;
const allClient = `${ROOT}users/`;

@Injectable({
  providedIn: 'root'
})
export class RestService {



  constructor(private http: HttpClient) {
  }
  login(email, password) {
    console.log('[LOGIN QUERY]');

    return this.http.post(loginLink, { email, password }).pipe(map((res) => { console.log(res); return res; }));
  }

  addTransaction(v, id): any {
    return this.http.post(addTransaction + id + '/transactions', v).pipe(map((res) => { console.log(res); return res; })).toPromise();
  }

  deleteClient(id: any) {
    return this.http.delete(removeClient + id).pipe(map((res) => { console.log(res); return res; }));
  }

  getClients() {
    console.log('[GET ANOMALIES QUERY]');

    let filter = `
    {
      "include": [
        {
          "relation": "transactions"
        }
      ]
    }
    `

    return this.http.get(allClient, { params: { filter } }).pipe(map((v: any) => {

      v.forEach(e => {
        if (e.transactions) {
          e.transactions = e.transactions.reverse();

        }
      });

      return v;
    }));

  }

  addClient(data) {
    console.log('[ADD ANOMALY QUERY]');

    return this.http.post(addClient, data).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  }
}

