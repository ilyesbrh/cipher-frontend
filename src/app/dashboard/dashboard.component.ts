import { UiStateManagerService } from './../globalServices/ui-state-manager.service';
import { TaskComponent } from './../tasks/task/task.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { RestService } from '../globalServices/REST.service';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  view: CalendarView = CalendarView.Month;

  calendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<button mat-button>edit</button>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<button mat-button>edit</button>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<button mat-button>delete</button>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;
  stats = {
    totalDetes: 0,
    totalPrices: 0,
    totalPayed: 0,
    totalCases: 0,
    totalActive: 0,
    totalArchived: 0
  };

  tasks = [];
  cases = [];

  constructor(
    public api: RestService, public router: Router, public uiService: UiStateManagerService,
    private dialog: MatDialog, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    /* get stats */
    this.uiService.getStats().then(stats => {
      this.stats = stats;
      console.log(this.stats);
    });

    /* Init chart */
    const myChart = new Chart(document.getElementById('chartContainer'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'feb', 'mar', 'avr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
        datasets: [{
          label: '$/month',
          data: [12, 19, 3, 5, 2, 3, 34, 34, 1, 12, 42, 11],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    myChart.render();

    /* tasks filter */
    const tasksFilter = {
      where: { isDone: false },
      order: 'deadline ASC',
      include: [{ relation: 'cases' }]
    };

    // fetch tasks
    this.api.getTasks(JSON.stringify(tasksFilter))
      .then((tasks: any) => {
        this.tasks = tasks;
        tasks = tasks
          .map(v =>
            ({
              title: v.title,
              color: v.isAlarmActive ? colors.red : colors.blue,
              start: moment.unix(v.deadline / 1000).toDate(),
              meta: v
            }));
        this.events = [...tasks];
      });

    // cases filter
    const filter = {
      where: { isSaved: true },
      order: 'updatedAt ASC'
    };

    // fetch cases
    this.api.getCasesList(filter).subscribe(cases => {
      this.cases = cases;
    });

  }

  gotoClient(c) {

  }

  openTask(task) {
    this.dialog.open(TaskComponent, { data: task, panelClass: 'overflow' });
  }

  openCase() {
    console.log('azer');

    this.router.navigate(['azer'], { relativeTo: this.activeRoute })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {

    this.dialog.open(TaskComponent, { data: event.meta, panelClass: 'overflow' });
  }

  setView(view) {
    console.log(view);

    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
