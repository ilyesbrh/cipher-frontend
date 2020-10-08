import { FilterComponent } from './filter/filter.component';
import { TaskComponent } from './task/task.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../auth-service/REST.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  filter = new FormGroup({
    search: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    sortBy: new FormControl('title'),
    isAlarmActive: new FormControl(true),
    isDone: new FormControl(false),
  });

  tasks: any;

  constructor(public dialog: MatDialog, public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {


  }

  async ngOnInit() {

    const fields = {
      id: true,
      name: true,
      number: false,
      price: false,
      description: false,
      opponent: true,
      client: true,
      tags: false,
      location: false,
      isSaved: false,
      state: false,
      Jugement: false,
      JugementDate: false,
      totalDetes: false,
      createdAt: false,
      updatedAt: false
    };

    const filter = { order: 'title ASC', include: [{ relation: 'cases', scope: { fields } }], where: { isDone: false } };

    console.log(JSON.stringify(filter));

    this.tasks = await this.api.getTasks(JSON.stringify(filter));

    this.filter.valueChanges.pipe(debounceTime(1000)).subscribe(async (v) => {

      // NOTE: change to object type instead of string
      const Tempfilter = this.filterFactory(v);

      this.tasks = await this.api.getTasks(JSON.stringify(Tempfilter));

    });
  }

  filterFactory(v: any) {
    const title = { like: '%' + v.search + '%' };

    let deadline = null;

    try {
      v.startDate = v.startDate.toDate().getTime();
      v.endDate = v.endDate.toDate().getTime();

      if (v.startDate < v.endDate) {
        const temp = v.startDate;
        v.startDate = v.endDate;
        v.endDate = temp;
      }

      deadline = { lte: v.startDate, gte: v.endDate };

    } catch (error) {
    }

    // if search empty then return void object
    let where: any = v.search === '' ? {} : { title };

    // if deadline is null then don't add deadline
    where = deadline ? { ...where, deadline } : where;

    where = { ...where, isDone: v.isDone, isAlarmActive: v.isAlarmActive };

    // sort items by title or deadline
    const order = v.sortBy + ' ASC';

    // if where empty don't add it to filter
    const filter = Object.keys(where).length === 0 ? { order } : { where, order };

    console.log(JSON.stringify(filter));
    return filter;
  }

  createTask() {
    this.router.navigate(['add'], { relativeTo: this.activeRoute });
  }

  openFilter() {
    this.dialog.open(FilterComponent, { data: this.filter, panelClass: 'filter' });
  }

  async openTask(task) {
    this.dialog.open(TaskComponent, { data: task });
  }

  async deleteTask(task) {

  }

}
