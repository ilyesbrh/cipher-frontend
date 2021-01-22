import { UiStateManagerService } from '../globalServices/ui-state-manager.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../globalServices/REST.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  filter = new FormGroup({
    client: new FormControl(''),
    case: new FormControl(''),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    sortBy: new FormControl('price'),
  });

  /* DATA */
  totalDetes: any;
  totalPrices: any;
  totalPayed: any;
  data: any;
  /* data limits */
  start = 0;
  end = 10;

  constructor(
    public api: RestService, public router: Router, public uiService: UiStateManagerService,
    public activeRoute: ActivatedRoute, private http: RestService) {
  }

  async ngOnInit() {

    const { totalDetes, totalPrices, totalPayed } = await this.uiService.getStats();
    this.totalDetes = totalDetes;
    this.totalPrices = totalPrices;
    this.totalPayed = totalPayed;

    this.data = await this.api.getCasesList({}).toPromise();

    // sort items by title or deadline
    const order = this.filter.value.sortBy + ' ASC';

    // Load data from server
    this.data =
      await this.http.getCasesList({ offset: this.start, limit: this.end, order }).toPromise();

    // decompress NOTE: no need for a separated function now
    this.data = this.data.map(v => {
      v.tags = v.tags.split(',');
      return v;
    });

    const f = { offset: this.start, limit: this.end, where: {} };

    this.filter.valueChanges.pipe(debounceTime(1000)).subscribe(async (v) => {

      this.start = 0;
      this.end = 10;

      // NOTE: change to object type instead of string
      const Tempfilter = this.filterFactory(v);

      this.data = await this.api.getCasesList(Tempfilter).toPromise();

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

    where = this.addToFilter('client', v.client, where);
    where = this.addToFilter('name', v.case, where);

    let gte = 0;
    let lte = Number.MAX_VALUE;

    try { gte = +v.minPrice } catch (error) { }
    try { lte = +v.maxPrice } catch (error) { }

    where = { ...where, price: { between: [gte, lte] } };

    debugger;
    // sort items by title or deadline
    const order = v.sortBy + ' ASC';

    let filter = { offset: 0, limit: 10, where, order };

    console.log(JSON.stringify(filter));

    return filter;


  }


  gotoclient() {

  }
  expandPayment(c) {

    this.router.navigate(['/home/archive/' + c.id], { fragment: 'payments' });

  }
}
