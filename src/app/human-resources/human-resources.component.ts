import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RestService } from '../globalServices/REST.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskComponent } from '../tasks/task/task.component';

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.scss']
})
export class HumanResourcesComponent implements OnInit {

  search = new FormControl('');

  constructor(public dialog: MatDialog, public api: RestService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  createTask() {

  }

  expand = true;

  openUser() {
    this.expand = !this.expand;

    return false;
  }

}
