import { TaskComponent } from './task/task.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../globalServices/rest.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  search = new FormControl('');

  constructor(public dialog: MatDialog, public api: RestService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  createTask() {

  }

  openTask() {
    this.dialog.open(TaskComponent, {

    })
  }

}
