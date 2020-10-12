import { UiStateManagerService } from '../globalServices/ui-state-manager.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../globalServices/REST.service';
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


  constructor(
    public api: RestService, public uiState: UiStateManagerService,
    public router: Router, public activeRoute: ActivatedRoute) {
    this.filter = new FormGroup({
      name: this.nameFilter,
      case: this.caseFilter,
      max: this.maxFilter,
      min: this.minFilter
    });
  }

  async ngOnInit() {

    const { totalDetes, totalPrices, totalPayed } = await this.uiState.getStats();
    this.totalDetes = totalDetes;
    this.totalPrices = totalPrices;
    this.totalPayed = totalPayed;

    this.data = await this.api.getCasesList({}).toPromise();

  }

  gotoclient() {

  }
  expandPayment(c) {

    this.router.navigate(['/home/archive/' + c.id], { fragment: 'payments' });

  }
}
