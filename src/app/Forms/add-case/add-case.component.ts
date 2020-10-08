import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepper } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RestService } from 'src/app/auth-service/REST.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  @ViewChild('swalPopup', { static: true }) private Swal: SwalComponent;

  /* Auto Complete */
  contactsList = [];
  courtList = [];

  /* swal popup params */
  swalParams = { title: 'Input error', description: 'please verify your inputs', icon: 'error' };

  // Case
  case: any;
  caseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl(''),
    price: new FormControl(0),
    client: new FormControl('', [Validators.required]),
    opponent: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    state: new FormControl('Active'),
    description: new FormControl(''),
    tags: new FormControl('', [Validators.required]),
  });

  // Attachments
  attachments: Array<any> = [];
  attachmentsForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    file: new FormControl(),
  });

  // CLient
  client: any;
  clientForm: FormGroup = new FormGroup({
    fullName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl(''),
    father: new FormControl(''),
    mother: new FormControl(''),
    birthday: new FormControl(''),
  });

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredOptions: Observable<any[]>;

  tags: Array<any> = [];

  constructor(private http: RestService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.contactsList = (await this.http.getAllContacts().toPromise()) as any[];

    this.filteredOptions = this.caseForm.controls['client'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  /* Data functions */



  // cases
  async createCase(step1, step2) {

    try {
      const values = { ...this.caseForm.value, tags: this.tags.map(v => v.name).toString() };

      this.case = await this.http.createCase(values);

      if (this.contactsList.findIndex(v => values.client === v.fullName) > -1) {


        this.stepper.linear = false;
        this.stepper.selectedIndex = 2;
        step1.completed = true;
        step2.completed = true;
        this.stepper.linear = true;

      } else {

        this.clientForm.setValue({ ...this.clientForm.value, fullName: values.client });

        this.stepper.linear = false;
        this.stepper.selectedIndex = 1;
        step1.completed = true;
        this.stepper.linear = true;

      }

    } catch (error) {
      console.log(error);

      this.Swal.fire();

    }

  }

  // client
  async createClient(step) {

    try {
      const values = { ...this.clientForm.value, fullName: this.clientForm.controls.fullName.value };

      if (this.clientForm.value.birthday === '') {
        delete values.birthday;
      } else {
        values.birthday = this.clientForm.value.birthday.toDate();
      }

      const result = await this.http.createContact(values);

      console.log(result);

      this.stepper.linear = false;
      step.completed = true;
      this.stepper.next();
      this.stepper.linear = true;

    } catch (error) {

      this.Swal.fire();

      console.log(error);
    }
  }
  // attachments
  async sendAttachments() {

    console.log(this.attachmentsForm.value);


    const formData: FormData = new FormData();
    formData.append('name', this.attachmentsForm.value.name);
    formData.append('description', this.attachmentsForm.value.description);
    formData.append('file', this.attachmentsForm.value.file, this.attachmentsForm.value.file.name);


    let result = await this.http.createAttachments(formData, this.case.id);

    this.attachments.push(result);

  }

  async addAttachments() {
  }

  async delAttachment() {
  }

  /* UI functions */

  // done
  done() {
    this.stepper.next();
  }

  // Auto complete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.contactsList.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
