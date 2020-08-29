import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* Angular material components */
import { MatRippleModule, MatListModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatButtonToggleModule, MatExpansionModule, MatSlideToggleModule, MatDatepickerModule, MatDialogModule } from '@angular/material';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
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
    FeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    /* material components */
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
    /* datetime Picker */
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
  ],
  entryComponents: [ContactComponent, TaskComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
