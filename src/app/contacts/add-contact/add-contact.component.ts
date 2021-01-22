import { Router } from '@angular/router';
import { RestService } from 'src/app/globalServices/REST.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;

  // CLient
  client: any;
  clientForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required,]),
    phone: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl(''),
    father: new FormControl(''),
    mother: new FormControl(''),
    role: new FormControl(''),
    birthday: new FormControl(''),
  });

  constructor(private http: RestService, private router: Router) { }

  ngOnInit() {
  }

  async createContact() {
    try {

      let values = { ...this.clientForm.value };

      if (this.clientForm.value.birthday === '') {
        delete values.birthday;
      } else {
        values.birthday = this.clientForm.value.birthday.toDate();
      }

      let result = await this.http.createContact(values);

      this.success.fire();

      this.router.navigate(['home/contacts']);
    } catch (error) {

      this.error.fire();

      console.log(error);
    }
  }

}
