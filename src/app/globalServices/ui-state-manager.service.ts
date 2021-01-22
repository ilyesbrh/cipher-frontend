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



}
