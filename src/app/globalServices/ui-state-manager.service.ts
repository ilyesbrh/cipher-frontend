import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { MediaMatcher } from '@angular/cdk/layout';
import { RestService } from './REST.service';


@Injectable({
  providedIn: 'root'
})
export class UiStateManagerService {

  responsive = true;

  // user object
  user = null;
  // Stats Object
  stats = null;
  // data
  newAnomalies: Array<any> = [];
  // Filters Data
  filter: Array<any>;

  // ROLES
  ROLES = [
    {
      value: 'create case',
      en: 'Can create case'
    },
    {
      value: 'view case',
      en: 'Can view case'
    },
    {
      value: 'create fees',
      en: 'Can create fees'
    },
    {
      value: 'received fees',
      en: 'Can received fees'
    },
    {
      value: 'view fees',
      en: 'Can view fees'
    },
    {
      value: 'view board',
      en: 'Can view board'
    },
    {
      value: 'view fees stats',
      en: 'Can view statistics'
    },
    {
      value: 'admin',
      en: 'ADMIN'
    },
  ];

  constructor(mediaMatcher: MediaMatcher, public api: RestService) {

    this.responsive = !mediaMatcher.matchMedia('(max-width: 900px)').matches;
    mediaMatcher.matchMedia('(max-width: 900px)')
      .addEventListener('change', e => this.responsive = !e.matches);

  }

  async getStats(): Promise<any> {

    if (!this.stats) {
      this.stats = await this.api.getStats() as any;
    }

    return this.stats;
  }

  public filterFunc(form: any, solvedAnomalies: Array<any>): Array<any> {

    let data = [];
    let filter = [];

    data = solvedAnomalies.slice().reverse();

    filter = data.filter(row => {
      let match = true;
      if (!!form.search && form.search !== '') {
        match = (row.farmer.first_name + ' ' + row.farmer.last_name).toLowerCase().search(new RegExp(form.search.toLowerCase())) !== -1;
      }
      let matchCrop = true;
      if (!!form.cropType && form.cropType !== '') {
        matchCrop = row.title.toLowerCase() == form.cropType.toLowerCase();
      }
      let matchDisease = true;
      if (!!form.disease && form.disease !== '') {
        matchDisease = row.expert_solutions[0].diag.toLowerCase() == form.disease.toLowerCase();
      }
      let from = true;
      if (match && !!form.from && moment.isMoment(form.from)) {
        from = form.from.valueOf() <= row.created;
      }
      let to = true;
      if (from && !!form.to && moment.isMoment(form.to)) {
        to = form.to.valueOf() >= row.created;
      }
      return match && matchCrop && matchDisease && from && to;
    });

    return filter;
  }

  public refresh() {

    /* if (this.isFarmerProfile) {
      this.filter = this.solvedAnomalies.slice().reverse().filter(x => x.farmer.email === this.currentFarmer.email)
    } else if (!this.isProfile) {
      this.filter = this.newAnomalies.slice();
    } else {
      this.filter = this.solvedAnomalies.slice().reverse();
    } */
  }

  tracbyfn(index, item) {
    return item.id;
  }

}
