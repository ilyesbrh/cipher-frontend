import { ContactComponent } from './contact/contact.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../globalServices/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  filter: FormGroup;
  nameFilter = new FormControl('');
  emailFilter = new FormControl('');
  phoneFilter = new FormControl('');
  roleFilter = new FormControl('');


  constructor(public dialog: MatDialog, public api: RestService, public router: Router, public activeRoute: ActivatedRoute) {
    this.filter = new FormGroup({
      name: this.nameFilter,
      email: this.emailFilter,
      phone: this.phoneFilter,
      role: this.roleFilter,
    });
  }

  ngOnInit() {
  }

  gotoclient(e) {

  }
  async openContact(user) {

    await this.dialog.open(ContactComponent, { data: user }).afterClosed().toPromise();


  }
}
