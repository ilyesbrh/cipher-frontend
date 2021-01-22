import { ContactComponent } from './contact/contact.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RestService } from '../globalServices/REST.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { debounceTime } from 'rxjs/operators';

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

    const filter = {
      fields: {
        id: false,
        fullName: true,
        father: false,
        mother: false,
        phone: true,
        birthday: false,
        address: true,
        email: false,
        description: false,
        createdAt: false,
        updatedAt: false,
        role: true
      }
    };

    this.contacts = await this.http.getAllContacts(filter).toPromise();

    this.filter.valueChanges.pipe(debounceTime(1000)).subscribe(async (v) => {

      let where = {};

      const addToFilter = (name, value, where) => {

        switch (typeof value) {
          case 'string':
            return value === '' ? where : { ...where, [name]: { like: '%' + value + '%' } };
          case 'number':
            return { ...where, [name]: value };
          default:
            return where;
        }
      };

      // NOTE: change to object type instead of string
      where = addToFilter('fullName', v.name, where);
      where = addToFilter('phone', v.phone, where);
      where = addToFilter('role', v.role, where);
      where = addToFilter('email', v.email, where);

      this.contacts = await this.api.getAllContacts({ ...filter, where }).toPromise();

    });


  }

  gotoclient(e) {

  }

  addContact() {
    this.router.navigate(['/home/contacts/add']);
  }

  async openContact(user) {

    let result = await this.dialog.open(ContactComponent, { data: user, panelClass: 'user-dialog' }).afterClosed().toPromise();

    if (result) {
      this.success.fire();

      this.ngOnInit().then();
    }

  }
}
