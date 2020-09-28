import { TaskComponent } from './task/task.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../auth-service/REST.service';

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
    sortBy: new FormControl(''),
  });

  constructor(public dialog: MatDialog, public api: RestService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  createTask() {
    this.router.navigate(['add'], { relativeTo: this.activeRoute });
  }

  async openTask() {
    this.dialog.open(TaskComponent, {});
  }

}
