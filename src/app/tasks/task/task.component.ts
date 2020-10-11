import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestService } from '../../auth-service/REST.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;
  @ViewChild('swalDelete', { static: true }) private deleteSwal: SwalComponent;

  title = new FormControl('');
  deadline = new FormControl();
  description = new FormControl('');
  isAlarmActive = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {

    console.log(data);

    this.title.setValue(data.title);
    this.description.setValue(data.description);
    this.isAlarmActive.setValue(data.isAlarmActive);

    const seconds = data.deadline / 1000;
    console.log(moment.unix(seconds));

    this.deadline.setValue(moment.unix(seconds));

  }


  ngOnInit() {
  }

  async save() {

    try {
      await this.api.updateTask(
        this.data.id,
        {
          title: this.title.value,
          deadline: this.deadline.value.toDate().getTime(),
          description: this.description.value,
          isAlarmActive: this.isAlarmActive.value,
        }
      );


      this.data.id = this.data.id;
      this.data.title = this.title.value;
      this.data.deadline = this.deadline.value.toDate().getTime();
      this.data.description = this.description.value;
      this.data.isAlarmActive = this.isAlarmActive.value;

      this.success.fire();
      await this.success.afterClose.subscribe(v => {
        this.dialogRef.close();
      });
    } catch (error) {
      this.error.fire();
    }

  }

  async delete() {
    try {
      await this.api.deleteTask(this.data.id).toPromise();

      this.deleteSwal.fire();

      this.dialogRef.close();
    } catch (error) {

      this.error.fire();
    }

  }

  close(): void {
    this.dialogRef.close();
  }
}
