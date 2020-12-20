import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const ROOT = environment.API_URL;
const USERS_LINK = `${ROOT}users/`;
const LOGIN_LINK = `${ROOT}users/login`;
const USER_LINK = `${ROOT}users/me`;
const CASES_LINK = `${ROOT}cases`;
const TASKS_LINK = `${ROOT}tasks`;
const FEES_LINK = `${ROOT}fees`;
const CONTACTS_LINK = `${ROOT}contacts`;

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

  // USERS
  getUsers(filter): Promise<any> {

    return this.http.get(ROOT + 'users', filter).toPromise();
  }

  createUser(values: any): any {
    return this.http.post(USERS_LINK + 'sign-up', values);
  }

  // CASES
  getCasesList(filter) {
    console.log('[GET CASES QUERY]');

    return this.http.get(CASES_LINK, { params: { filter: JSON.stringify(filter) } }).pipe(map((v: any) => {

      v.forEach(e => {
        if (e.transactions) {
          e.transactions = e.transactions.reverse();

        }
      });

      return v;
    }));

  }

  getCase(id: any) {
    const filter = {
      include: [
        { relation: 'tasks' },
        { relation: 'fees' },
        { relation: 'timelines' },
        { relation: 'attachments' }
      ]
    };

    return this.http.get(CASES_LINK + '/' + id, { params: { filter: JSON.stringify(filter) } }).toPromise();
  }
  createCase(values: any) {
    return this.http.post(CASES_LINK, values).toPromise();
  }
  updateCase(data) {
    console.log('[UPDATE CASE QUERY]');

    const where: any = { id: data.id };

    return this.http.patch(CASES_LINK + '/' + data.id, data).toPromise();
  }

  async deleteCase(caseId: any) {

    await this.http.delete(CASES_LINK + '/' + caseId + '/timelines', {}).toPromise();
    await this.http.delete(CASES_LINK + '/' + caseId + '/attachments', {}).toPromise();
    await this.http.delete(CASES_LINK + '/' + caseId + '/fees', {}).toPromise();
    await this.http.delete(CASES_LINK + '/' + caseId + '/tasks', {}).toPromise();

    return this.http.delete(CASES_LINK + '/' + caseId).toPromise();
  }

  /* FEES */
  createFees(id, amount) {
    return this.http.post(CASES_LINK + '/' + id + '/fees', { amount }).toPromise();
  }
  updateFees(caseId, feesId, fees) {
    const where = { id: feesId };
    return this.http.patch(CASES_LINK + '/' + caseId + '/fees/', fees, { params: { where: JSON.stringify(where) } }).toPromise();
  }
  deleteFees(caseId: any, feesId: any) {
    const where = { id: feesId };
    return this.http.delete(CASES_LINK + '/' + caseId + '/fees', { params: { where: JSON.stringify(where) } }).toPromise();
  }

  /* Stats */
  getStats() {
    return this.http.get(FEES_LINK + '/stats').toPromise();
  }

  /* CONTACTS */
  getAllContacts(): any {

    const filter = new HttpParams();
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
    return this.http.get(CONTACTS_LINK, { params: filter });
  }
  createContact(values) {
    return this.http.post(CONTACTS_LINK, values).toPromise();
  }
  updateContact(id, data) {
    console.log('[UPDATE CLIENT QUERY]');

    return this.http.patch(CONTACTS_LINK + '/' + id, data).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  }
  deleteContact(id) {
    return this.http.delete(CONTACTS_LINK + '/' + id).toPromise();
  }

  /* ATTACHMENTS */
  createAttachments(value: any, id: any) {
    return this.http.post(CASES_LINK + '/' + id + '/attachments', value).toPromise();
  }
  deleteAttachment(attachmentId, caseId) {

    const where = { id: attachmentId };

    return this.http.delete(CASES_LINK + '/' + caseId + '/attachments/', { params: { where: JSON.stringify(where) } }).toPromise();
  }

  download(url): Observable<any> {

    return this.http.get(ROOT + 'files/' + url, {
      headers: {
        accept: 'application/octet-stream',
        'content-type': 'application/octet-stream',
      },
      responseType: 'blob'
    });
  }


  /* TIMELINE */
  createTimeline(id, value) {
    return this.http.post(CASES_LINK + '/' + id + '/timelines', value).toPromise();
  }

  deleteTimeline(TimelineId, caseId) {
    const where = { id: TimelineId };

    return this.http.delete(CASES_LINK + '/' + caseId + '/attachments/', { params: { where: JSON.stringify(where) } }).toPromise();

  }

  /* TASKS */
  getTasks(filter) {

    console.log('[GETUSER QUERY]');

    return this.http.get(TASKS_LINK, { params: { filter } }).toPromise();
  }
  createTask(values: any): any {
    return this.http.post(TASKS_LINK, values).toPromise();
  }
  updateTask(id: any, data: any) {
    return this.http.patch(TASKS_LINK + '/' + id, data).toPromise();
  }
  deleteTask(id) {
    return this.http.delete(TASKS_LINK + '/' + id).pipe(map((res) => { console.log(res); return res; }));
  }

  // addSolution(id, data) {
  // console.log('[ADDANOMALY QUERY]');
  // return this.http.post(AddSolution + id + '/solutions/', data).pipe(catchError(val => { console.log(val); return null; })).toPromise();
  // }

}

