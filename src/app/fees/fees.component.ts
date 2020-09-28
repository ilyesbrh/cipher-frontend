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


  constructor(public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {
    this.filter = new FormGroup({
      name: this.nameFilter,
      case: this.caseFilter,
      max: this.maxFilter,
      min: this.minFilter
    });
  }

  ngOnInit() {
  }

  gotoclient() {

  }
  expandPayment() {

    this.router.navigate(['/home/archive/azer'], { fragment: 'payments' });

  }
}
