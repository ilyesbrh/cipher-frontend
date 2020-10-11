import { AddFeesComponent } from './add-fees/add-fees.component';
import { AddAttachmentComponent } from './add-attachment/add-attachment.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RestService } from '../auth-service/REST.service';
import { MatDialog } from '@angular/material';
import { TaskComponent } from '../tasks/task/task.component';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AddTimelineComponent } from './add-timeline/add-timeline.component';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;
  @ViewChild('swalConfirmation', { static: true }) private confirm: SwalComponent;

  case: any;
  constructor(
    private route: ActivatedRoute, public dialog: MatDialog,
    private viewportScroller: ViewportScroller, public api: RestService) { }
  async ngOnInit() {
    this.case = await this.api.getCase(this.route.snapshot.params.id);

    console.log(this.case);

    this.route.fragment.subscribe(f => {
      console.log(f);

      this.viewportScroller.scrollToAnchor(f);
    })
  }

  async openTask(task) {
    this.dialog.open(TaskComponent, { data: task });
  }
  async markAsDone(task) {
    task.isDone = true;

    try {
      await this.api.updateTask(task.id, { isDone: task.isDone });
      this.success.fire();
    } catch (e) {
      this.error.fire();
    }
  }

  async deleteAttachment(attachment) {

    const question = await this.confirm.fire();

    if (!question.isConfirmed) { return; }

    try {
      await this.api.deleteAttachment(attachment.id, this.case.id);

      this.case = await this.api.getCase(this.route.snapshot.params.id); this.success.fire();

    } catch (error) {
      this.error.fire();
    }
  }

  async addAttachment() {
    this.dialog.open(AddAttachmentComponent, { data: this.case.id }).afterClosed().subscribe(async v => {

      if (v) {
        await this.success.fire();

        this.case = await this.api.getCase(this.route.snapshot.params.id);
      } else {
        this.error.fire();
      }
    });
  }

  async addTimeline() {
    this.dialog.open(AddTimelineComponent, { data: this.case.id }).afterClosed().subscribe(async v => {

      if (v) {
        await this.success.fire();

        this.case = await this.api.getCase(this.route.snapshot.params.id);
      } else {
        this.error.fire();
      }
    });
  }

  async addTransaction() {
    this.dialog.open(AddFeesComponent, { data: this.case.id }).afterClosed().subscribe(async v => {

      if (v) {
        await this.success.fire();

        this.case = await this.api.getCase(this.route.snapshot.params.id);
      } else {
        this.error.fire();
      }
    });

  }

  async saveFees(transaction) {

    try {
      if (transaction) {

        this.api.updateFees(this.case.id, transaction.id, { amount: transaction.amount, isReceived: transaction.isReceived });

        await this.success.fire();

        this.case = await this.api.getCase(this.route.snapshot.params.id);
        return;
      }
    } catch (error) { }
    this.error.fire();
  }

  async deleteFees(transaction) {
    try {
      if (transaction) {

        const question = await this.confirm.fire();

        if (!question.isConfirmed) { return; }

        this.api.deleteFees(this.case.id, transaction.id);

        this.case.fees = this.case.fees.filter(trans => trans.id !== transaction.id);
        this.success.fire();

        this.case = await this.api.getCase(this.route.snapshot.params.id);
        return;
      }
    } catch (error) { }
    this.error.fire();
  }
}
