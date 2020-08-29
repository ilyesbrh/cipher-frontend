import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.route.fragment.subscribe(f => {
      console.log(f);

      this.viewportScroller.scrollToAnchor(f);
    })
  }

}
