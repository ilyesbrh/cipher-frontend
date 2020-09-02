import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RestService } from '../globalServices/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskComponent } from '../tasks/task/task.component';

@Component({
  selector: 'app-human-ressources',
  templateUrl: './human-ressources.component.html',
  styleUrls: ['./human-ressources.component.scss']
})
export class HumanRessourcesComponent implements OnInit {

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
