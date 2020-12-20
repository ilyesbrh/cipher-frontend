import { UiStateManagerService } from './../globalServices/ui-state-manager.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RestService } from '../globalServices/REST.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.scss']
})
export class HumanResourcesComponent implements OnInit {

  constructor(
    public dialog: MatDialog, public api: RestService,
    public router: Router, public activeRoute: ActivatedRoute,
    public uiService: UiStateManagerService
  ) { }

  search = new FormControl('');
  users: any;

  async ngOnInit() {
    this.users = await this.api.getUsers(JSON.stringify({}));

    console.log(this.users);

  }

  openUser(user) {
    user.expand = !user.expand;
  }

  createUser() {
    this.router.navigate(['add'], { relativeTo: this.activeRoute });
  }

  saveInfo(user) {

    console.log(user);

  }

  changeRoles(role, user, event) {

    // remove selected rome
    const roles = user.role.split(',').filter(v => v !== role.value);

    // if current state is checked then add it
    if (event.checked) {
      roles.push(role.value);
    }

    user.role = roles.toString();
  }

  isActive(role, user) {
    return user.role.includes(role.value);
  }

}

