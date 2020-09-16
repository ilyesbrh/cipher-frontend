import { RestService } from './../../globalServices/rest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepper } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { MatAlertDialog, MatAlertDialogData } from '@angular-material-extensions/core';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  /* Auto Complete */
  contactsList = [];
  courtList = [];

  // Case
  case: any;
  caseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl(''),
    price: new FormControl(''),
    client: new FormControl('', [Validators.required]),
    opponent: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    state: new FormControl('Active'),
    description: new FormControl(''),
    tags: new FormControl(''),
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
    fullName: new FormControl('', [Validators.required]),
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
  async createCase() {

    let values = { ...this.caseForm.value, tags: this.tags.map(v => v.name).toString() };

    console.log(values);

    try {

      this.case = await this.http.createCase(values);

      if (this.contactsList.includes(values.client)) {

        this.stepper.selectedIndex = 2;
      } else {

        this.stepper.selectedIndex = 1;
      }

    } catch (error) {
      console.log(error);

      const params: MatAlertDialogData = {
        title: 'Woohoooo!',
        message: 'Your are now free :D! Please check the instructions to book a holiday!',
        icon: 'accessibility_new',
        type: 'accent'
      }
      // TODO: show error message
      this.dialog.open(MatAlertDialog, { data: params });
    }

  }

  // client
  async createClient() {

    let values = { ...this.clientForm.value, birthday: this.clientForm.value.birthday.toDate() };

    try {

      let result = await this.http.createClient(values);

      console.log(result);

      this.stepper.next();

    } catch (error) {
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
