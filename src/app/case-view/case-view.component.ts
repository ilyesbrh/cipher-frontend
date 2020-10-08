import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RestService } from '../auth-service/REST.service';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller,public api:RestService) { }
  case :any;
  async ngOnInit() {
    this.case = await this.api.getCase(this.route.snapshot.params.id);    

    this.route.fragment.subscribe(f => {
      console.log(f);

      this.viewportScroller.scrollToAnchor(f);
    })
  }

}
