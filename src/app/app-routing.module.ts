import { CaseViewComponent } from './case-view/case-view.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { ContactsComponent } from './contacts/contacts.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'Contacts', component: ContactsComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'archive/:id', component: CaseViewComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
