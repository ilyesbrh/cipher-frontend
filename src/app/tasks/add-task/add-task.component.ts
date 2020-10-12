import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RestService } from 'src/app/globalServices/REST.service';

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
    deadline: new FormControl([Validators.required]),
    isAlarmActive: new FormControl(true, [Validators.required,]),
    casesId: new FormControl(''),

  });

  // autocomplete
  casesList = [];


  constructor(private http: RestService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {

    const id = this.route.snapshot.params.id || null;

    this.taskForm.controls.casesId.setValue(id);

    this.casesList = (await this.http.getCasesList({}).toPromise()) as any[];

  }

  async createTask() {
    try {

      const values = { ...this.taskForm.value };

      values.deadline = this.taskForm.value.deadline.toDate().getTime();

      this.task = await this.http.createTask(values);

      this.success.fire();

      this.router.navigate(['home/tasks']);
    } catch (error) {

      this.error.fire();

      console.log(error);
    }
  }

}
