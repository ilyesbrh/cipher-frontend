import { ContactComponent } from './contact/contact.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RestService } from '../auth-service/REST.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;

  filter: FormGroup;
  nameFilter = new FormControl('');
  emailFilter = new FormControl('');
  phoneFilter = new FormControl('');
  roleFilter = new FormControl('');

  contacts = [];

  constructor(private http: RestService, public dialog: MatDialog, public api: RestService,
    public router: Router, public activeRoute: ActivatedRoute) {
    this.filter = new FormGroup({
      name: this.nameFilter,
      email: this.emailFilter,
      phone: this.phoneFilter,
      role: this.roleFilter,
    });
  }

  async ngOnInit() {

    this.contacts = await this.http.getAllContacts().toPromise();

  }

  gotoclient(e) {

  }

  addContact() {
    this.router.navigate(['/home/contacts/add']);
  }

  async openContact(user) {

    let result = await this.dialog.open(ContactComponent, { data: user, panelClass: 'test' }).afterClosed().toPromise();

    if (result) {
      this.success.fire();

      this.contacts = await this.http.getAllContacts().toPromise();
    }

  }
}
