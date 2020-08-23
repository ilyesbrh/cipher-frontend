import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from 'src/app/globalServices/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  filter: FormGroup;
  nameFilter = new FormControl('');
  emailFilter = new FormControl('');
  phoneFilter = new FormControl('');
  addressFilter = new FormControl('');
  noteFilter = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ContactComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {
    this.filter = new FormGroup({
      name: this.nameFilter,
      email: this.emailFilter,
      phone: this.phoneFilter,
      address: this.addressFilter,
      note: this.noteFilter,
    });
  }


  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}

