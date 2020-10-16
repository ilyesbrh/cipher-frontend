import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RestService } from 'src/app/globalServices/REST.service';

@Component({
  selector: 'app-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.scss']
})
export class ViewAttachmentComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;
  @ViewChild('swalDelete', { static: true }) private deleteSwal: SwalComponent;

  caseId = null;
  attachment = null;

  constructor(
    public dialogRef: MatDialogRef<ViewAttachmentComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {

    console.log(data);

    this.caseId = data.caseId;

    this.attachment = data.attachment;

  }

  ngOnInit() {
  }

  async open() {
    try {

      const data = await this.api.download(this.attachment.link).toPromise();

      const file = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.download = this.attachment.link;
      anchor.href = url;
      anchor.click();

    } catch (error) {

    }
  }

  async delete() {
    try {
      await this.api.deleteAttachment(this.attachment.id, this.caseId);

      await this.deleteSwal.fire();

      this.dialogRef.close();
    } catch (error) {

      this.error.fire();
    }

  }

  close(): void {
    this.dialogRef.close();
  }

}
