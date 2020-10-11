import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/auth-service/REST.service';

@Component({
  selector: 'app-add-timeline',
  templateUrl: './add-timeline.component.html',
  styleUrls: ['./add-timeline.component.scss']
})
export class AddTimelineComponent implements OnInit {

  TimelineForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    side: new FormControl(true),
    description: new FormControl(''),
    time: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<AddTimelineComponent>, @Inject(MAT_DIALOG_DATA) public id: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async send() {
    console.log(this.TimelineForm.value);

    try {

      const value = { ...this.TimelineForm.value, time: this.TimelineForm.value.time.toDate().getTime() };
      await this.api.createTimeline(this.id, value);
      this.dialogRef.close(value);
    } catch (error) {
      console.log(error);

      this.dialogRef.close(false);
    }

  }

}
