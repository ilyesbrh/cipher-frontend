import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../auth-service/REST.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  filter: FormGroup;
  nameFilter = new FormControl('');
  caseFilter = new FormControl('');
  maxFilter = new FormControl('');
  minFilter = new FormControl('');

  /* DATA */
  totalDetes: any;
  totalPrices: any;
  totalPayed: any;
  data: any;


  constructor(public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {
    this.filter = new FormGroup({
      name: this.nameFilter,
      case: this.caseFilter,
      max: this.maxFilter,
      min: this.minFilter
    });
  }

  async ngOnInit() {

    const { totalDetes, totalPrices, totalPayed } = await this.api.getStats() as any;

    this.totalDetes = totalDetes;
    this.totalPrices = totalPrices;
    this.totalPayed = totalPayed;

    this.data = await this.api.getCasesList(0, 0, []).toPromise();

  }

  gotoclient() {

  }
  expandPayment(c) {

    this.router.navigate(['/home/archive/' + c.id], { fragment: 'payments' });

  }
}
