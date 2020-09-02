import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../globalServices/rest.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  filter: FormGroup;
  nameFilter = new FormControl('');
  regionFilter = new FormControl('');
  phoneFilter = new FormControl('');


  constructor(public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {
    this.filter = new FormGroup({
      name: this.nameFilter,
      region: this.regionFilter,
      phone: this.phoneFilter
    });
  }

  ngOnInit() {
  }

  gotoclient() {

  }
  openCase() {
    console.log('azer');

    this.router.navigate(['azer'], { relativeTo: this.activeRoute })
  }
}
