import { AddCaseComponent } from './Forms/add-case/add-case.component';
import { HumanRessourcesComponent } from './human-ressources/human-ressources.component';
import { CaseViewComponent } from './case-view/case-view.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TasksComponent } from './tasks/tasks.component';
import { FeesComponent } from './fees/fees.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'fees', component: FeesComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'HR', component: HumanRessourcesComponent },
      { path: 'archive/add', component: AddCaseComponent },
      { path: 'archive/:id', component: CaseViewComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
