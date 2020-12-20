import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/globalServices/REST.service';

@Component({
  selector: 'app-delete-case',
  templateUrl: './delete-case.component.html',
  styleUrls: ['./delete-case.component.scss']
})
export class DeleteCaseComponent implements OnInit {

  info = false;
  tasks = false;
  attachments = false;
  fees = false;
  timeline = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteCaseComponent>, @Inject(MAT_DIALOG_DATA) public c: any,
    public api: RestService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async deleteCase() {

    await this.api.deleteCase(this.c);

    this.dialogRef.close(true);

  }

}
