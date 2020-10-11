import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/auth-service/REST.service';

@Component({
  selector: 'app-add-fees',
  templateUrl: './add-fees.component.html',
  styleUrls: ['./add-fees.component.scss']
})
export class AddFeesComponent implements OnInit {

  amount = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddFeesComponent>, @Inject(MAT_DIALOG_DATA) public id: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async send() {

    try {
      await this.api.createFees(this.id, this.amount.value);
      this.dialogRef.close(this.amount.value);
    } catch (error) {
      this.dialogRef.close(false);
    }

  }

}
