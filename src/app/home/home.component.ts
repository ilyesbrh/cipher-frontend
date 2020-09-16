import { RestService } from 'src/app/globalServices/rest.service';
import { UiStateManagerService } from './../ui-state-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public uiService: UiStateManagerService, public http: RestService) { }

  ngOnInit() {

    // get user
    this.http.getUser().then((v: any) => {
      // save user to global ui service
      this.uiService.user = v;
    });



  }


}
