import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/auth-service/REST.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('swalError', { static: true }) private error: SwalComponent;

  userId;

  filter: FormGroup;

  clientForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl(''),
    father: new FormControl(''),
    mother: new FormControl(''),
    birthday: new FormControl(''),
  });
  constructor(
    private http: RestService,
    public dialogRef: MatDialogRef<ContactComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {

  }


  ngOnInit() {

    const { id, createdAt, updatedAt, ...data } = this.data;

    this.userId = id;

    this.clientForm.setValue(data);
  }

  close(): void {
    this.dialogRef.close();
  }

  async save() {
    try {

      let values = { ...this.clientForm.value };

      if (this.clientForm.value.birthday === '' || this.clientForm.value.birthday == null) {
        delete values.birthday;
      } else {
        if (typeof this.clientForm.value.birthday === 'string') {

          values.birthday = new Date(this.clientForm.value.birthday);
        } else
          values.birthday = this.clientForm.value.birthday.toDate();
      }

      let result = await this.http.updateContact(this.userId, values);

      this.dialogRef.close(true);

    } catch (error) {

      this.error.fire();

      console.log(error);
    }
  }

  async delete() {

    try {

      let result = await this.http.deleteContact(this.userId);

      this.dialogRef.close(true);

    } catch (error) {

      this.error.fire();

      console.log(error);
    }

  }
}

