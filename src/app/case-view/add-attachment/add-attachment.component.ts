import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/auth-service/REST.service';

@Component({
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.scss']
})
export class AddAttachmentComponent implements OnInit {

  attachmentsForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    file: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<AddAttachmentComponent>, @Inject(MAT_DIALOG_DATA) public id: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async send() {
    console.log(this.attachmentsForm.value);

    try {
      const formData: FormData = new FormData();
      formData.append('name', this.attachmentsForm.value.name);
      formData.append('description', this.attachmentsForm.value.description);
      formData.append('file', this.attachmentsForm.value.file, this.attachmentsForm.value.file.name);

      const attachment = await this.api.createAttachments(formData, this.id);
      this.dialogRef.close(attachment);

    } catch (error) {
      this.dialogRef.close(false);
    }

  }

}
