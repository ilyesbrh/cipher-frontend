import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../globalServices/rest.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  filter: FormGroup;
  typeFilter = new FormControl('taxi');
  nameFilter = new FormControl('');
  regionFilter = new FormControl('');
  phoneFilter = new FormControl('');


  constructor(public api: RestService, public router: Router,) {
    this.filter = new FormGroup({
      type: this.typeFilter,
      name: this.nameFilter,
      region: this.regionFilter,
      phone: this.phoneFilter
    });
  }

  ngOnInit() {
  }

}
