import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../globalServices/REST.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UiStateManagerService } from '../globalServices/ui-state-manager.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { debounceTime, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;
  @ViewChild('swalConfirmation', { static: true }) private confirm: SwalComponent;

  filter = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    opponent: new FormControl(),
    client: new FormControl(),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    Jugement: new FormControl(''),
    startJugementDate: new FormControl(''),
    endJugementDate: new FormControl(''),
    description: new FormControl(''),
    state: new FormControl(),
    tags: new FormControl(),
    sortBy: new FormControl('name'),
  });


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Array<any> = [];

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

    this.filter.valueChanges.pipe(debounceTime(1000)).subscribe(async (v) => {

      this.OBJECT_VALUE.uiState.start = 0;
      this.OBJECT_VALUE.uiState.end = 10;

      // NOTE: change to object type instead of string
      const Tempfilter = this.filterFactory(v);

      this.OBJECT_VALUE.data = await this.api.getCasesList(Tempfilter).toPromise();

      this.OBJECT_VALUE.data = this.OBJECT_VALUE.data.map(v => {
        v.tags = v.tags.split(',');
        return v;
      });

      console.log(this.OBJECT_VALUE.data);

    });
  }

  addToFilter(name, value, where) {

    switch (typeof value) {
      case 'string':
        return value === '' ? where : { ...where, [name]: { like: '%' + value + '%' } };
      case 'number':
        return { ...where, [name]: value };
      default:
        return where;
    }
  }

  filterFactory(v) {

    let where = {};

    where = this.addToFilter('number', v.number, where);
    where = this.addToFilter('name', v.name, where);
    where = this.addToFilter('client', v.client, where);
    where = this.addToFilter('opponent', v.opponent, where);
    where = this.addToFilter('Jugement', v.Jugement, where);
    where = this.addToFilter('description', v.description, where);
    where = this.addToFilter('state', v.state, where);
    where = { ...where, price: { between: [(v.minPrice || 0), (v.maxPrice || 999999999)] } };


    let tags = this.tags.length > 0 ? this.tags.map(v => v.name).join('|') : '';
    let regexp = new RegExp(`(${tags})`, 'g');

    where = tags !== '' ? { ...where, tags: { regexp } } : where;

    let JugementDate = null;


    try {
      let start = v.startJugementDate.toDate().getTime();
      let end = v.endJugementDate.toDate().getTime();
      JugementDate = { between: [start, end] };
    } catch (error) { }


    // if deadline is null then don't add deadline
    where = JugementDate ? { ...where, JugementDate } : where;

    // sort items by title or deadline
    const order = v.sortBy + ' ASC';

    let filter = { offset: 0, limit: 10, include: [{ relation: 'tasks' }], where, order };

    console.log(JSON.stringify(filter));

    return filter;


  }

  gotoClient() {
  }

  openCase(c) {
    this.router.navigate([c.id], { relativeTo: this.activeRoute })
  }

  async bookCase(c) {
    c.isSaved = !c.isSaved;

    try {
      await this.http.updateCase({ isSaved: c.isSaved, id: c.id });

      await this.success.fire();
    } catch (error) {

      this.error.fire();
    }
  }


  /* tags input */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
