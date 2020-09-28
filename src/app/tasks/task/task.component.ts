import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestService } from '../../auth-service/REST.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  alarm = new FormControl('');
  description = new FormControl('');
  active = new FormControl(true);

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {

  }


  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
