import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../globalServices/REST.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UiStateManagerService } from '../globalServices/ui-state-manager.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;
  @ViewChild('swalConfirmation', { static: true }) private confirm: SwalComponent;

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

      stats: {
        totalCases: 0,
        totalActive: 0,
        totalArchived: 0
      },

      start: 0,
      end: 10,
    }

  };


  constructor(
    public api: RestService, public router: Router, public uiService: UiStateManagerService,
    public activeRoute: ActivatedRoute, private http: RestService) { }

  async ngOnInit() {

    /* get stats */
    this.uiService.getStats().then(stats => {
      this.OBJECT_VALUE.uiState.stats = stats;
      console.log(this.OBJECT_VALUE.uiState.stats);
    });


    // setup filter
    const start = this.OBJECT_VALUE.uiState.start;
    const end = this.OBJECT_VALUE.uiState.end;

    // Load data from server
    this.OBJECT_VALUE.data =
      await this.http.getCasesList({ offset: start, limit: end, include: [{ relation: 'tasks' }] }).toPromise();

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

  async bookCase(c) {
    c.isSaved = true;

    try {
      await this.http.updateCase({ isSaved: c.isSaved, id: c.id });

      await this.success.fire();
    } catch (error) {

      this.error.fire();
    }
  }
}
