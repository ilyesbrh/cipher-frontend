import { UiStateManagerService } from './../../globalServices/ui-state-manager.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RestService } from 'src/app/globalServices/REST.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;

  // CLient
  task: any;
  employeeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('')
  });

  // autocomplete
  casesList = [];


  constructor(
    private http: RestService, private route: ActivatedRoute,
    private router: Router, public uiService: UiStateManagerService) { }

  async ngOnInit() {

    // this.casesList = (await this.http.getCasesList({}).toPromise()) as any[];

  }

  async createEmployee() {

    console.log(this.employeeForm.value);

    try {

      const values = { ...this.employeeForm.value };

      this.task = await this.http.createUser(values).toPromise();

      this.success.fire();

      this.router.navigate(['home/HR']);
    } catch (error) {

      this.error.fire();

      console.log(error);
    }
  }

  changeRoles(role, user, event) {

    // remove selected rome
    const roles = user.role.length > 0 ? user.role.split(',').filter(v => v !== role.value) : [];

    // if current state is checked then add it
    if (event.checked) {
      roles.push(role.value);
    }

    this.employeeForm.controls.role.setValue(roles.toString());
  }

  isActive(role, user) {
    return user.role.includes(role.value);
  }


}
