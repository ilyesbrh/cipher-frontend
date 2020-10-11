import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../auth-service/REST.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  nameFilter = new FormControl('');
  regionFilter = new FormControl('');
  phoneFilter = new FormControl('');
  filter = new FormGroup({
    name: this.nameFilter,
    region: this.regionFilter,
    phone: this.phoneFilter
  });

  OBJECT_VALUE = {
    data: null,

    uiState: {
      activeWork: 0,
      completedWork: 0,
      canceledWork: 0,

      start: 0,
      end: 10,
    }

  };


  constructor(public api: RestService, public router: Router, public activeRoute: ActivatedRoute, private http: RestService) { }

  async ngOnInit() {

    // Load data from server
    this.OBJECT_VALUE.data =
      await this.http.getCasesList(this.OBJECT_VALUE.uiState.start, this.OBJECT_VALUE.uiState.end, ['tasks']).toPromise();

    // decompress NOTE: no need for a separated function now
    this.OBJECT_VALUE.data = this.OBJECT_VALUE.data.map(v => {
      v.tags = v.tags.split(',');
      return v;
    });

    console.log(this.OBJECT_VALUE.data);


  }

  gotoClient() {

  }

  openCase(c) {
    this.router.navigate([c.id], { relativeTo: this.activeRoute })
  }
}
