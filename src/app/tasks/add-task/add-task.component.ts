import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import * as moment from 'moment';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RestService } from 'src/app/auth-service/REST.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('swalSuccess', { static: true }) private success: SwalComponent;
  @ViewChild('swalError', { static: true }) private error: SwalComponent;

  // CLient
  task: any;
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required,]),
    description: new FormControl(''),
    deadline: new FormControl([Validators.required,]),
    isAlarmActive: new FormControl(true, [Validators.required,]),
    casesId: new FormControl(''),

  });

  // autocomplete
  casesList = [];
  filteredOptions: Observable<any[]>;


  constructor(private http: RestService, private router: Router) { }

  async ngOnInit() {
    this.casesList = (await this.http.getArchive(0, 0).toPromise()) as any[];

    this.filteredOptions = this.taskForm.controls['casesId'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  // Auto complete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.casesList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  async createTask() {
    try {

      let values = { ...this.taskForm.value };

      values.deadline = this.taskForm.value.deadline.toDate();

      this.task = await this.http.createContact(values);

      this.success.fire();

      this.router.navigate(['home/tasks']);
    } catch (error) {

      this.error.fire();

      console.log(error);
    }
  }

}
