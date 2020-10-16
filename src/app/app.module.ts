import { UiStateManagerService } from './globalServices/ui-state-manager.service';
import { overlayViewComponent } from './overlay-view/overlay-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
/* Angular material components */
import {
  MatRippleModule, MatListModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatToolbarModule, MatButtonToggleModule, MatExpansionModule, MatSlideToggleModule,
  MatDatepickerModule, MatDialogModule, MatStepperModule, MatSelectModule, MatChipsModule, MatAutocompleteModule,
  MatRadioModule, MatProgressSpinnerModule
} from '@angular/material';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { CaseViewComponent } from './case-view/case-view.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { FeesComponent } from './fees/fees.component';
import { HumanRessourcesComponent } from './human-ressources/human-ressources.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { TokenInterceptor } from './globalServices/auth-service/token-interceptor';
import { AddCaseComponent } from './Forms/add-case/add-case.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { FilterComponent } from './tasks/filter/filter.component';
import { AddAttachmentComponent } from './case-view/add-attachment/add-attachment.component';
import { AddTimelineComponent } from './case-view/add-timeline/add-timeline.component';
import { AddFeesComponent } from './case-view/add-fees/add-fees.component';
import { ViewAttachmentComponent } from './case-view/view-attachment/view-attachment.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ArchiveComponent,
    CaseViewComponent,
    ContactsComponent,
    ContactComponent,
    TasksComponent,
    TaskComponent,
    FeesComponent,
    HumanRessourcesComponent,
    overlayViewComponent,
    AddCaseComponent,
    AddContactComponent,
    AddTaskComponent,
    FilterComponent,
    AddAttachmentComponent,
    AddTimelineComponent,
    AddFeesComponent,
    ViewAttachmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    /* material components */
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatRippleModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatStepperModule,
    MatListModule,
    MatSelectModule,
    NgxMatFileInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    /* datetime Picker */
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatChipsModule,
    /* POPUP alert */
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  entryComponents: [
    ContactComponent, TaskComponent,
    overlayViewComponent, FilterComponent,
    AddAttachmentComponent, AddTimelineComponent,
    AddFeesComponent,
    ViewAttachmentComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    UiStateManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
