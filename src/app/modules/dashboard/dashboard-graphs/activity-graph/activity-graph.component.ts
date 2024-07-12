import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserService } from 'src/app/core/service/user.service';
import { NewUser } from 'src/app/api/models/new-user';
import * as shape from 'd3-shape';

export interface UserType {
  name: String;
  value: number;
}

export interface GraphData {
  name: String;
  series: any;
}

export interface UserActivity {
  date: any;
  signed: boolean;
  logged: boolean;
  edited: boolean;
}

@Component({
  selector: 'app-activity-graph',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.scss']
})

export class ActivityGraphComponent implements OnInit {
  public loadingState: boolean = true;
  public all_users: NewUser[] = [];
  private created_users: UserType[] = [];
  private active_users: UserType[] = [];
  private modified_users: UserType[] = [];
  public user_action: UserType[] = [];
  public multiElem: GraphData[] = [];
  public multi: any[] = [];
  public user_activity: UserActivity[] = [];
  public activityInterval: number = 12;

  // Graph
  public linearCurve = shape.curveMonotoneX;
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  timeline: boolean = false;
  legendPosition: String = "below";
  legendTitle: String = "";
  yScaleMax: number;
  noData: boolean = true;

  colorScheme = {
    domain: ['#2a9d8f', '#7209b7', '#003566']
  };
  maxYAxisTickLength: any;
  maxXAxisTickLength: any;
  yAxisLabel: any;
  xAxisLabel: any;
  view: any;

  constructor(
    private userService: UserService
  ) {
    this.all_users = [];
    this.created_users = [];
    this.active_users = [];
    this.modified_users = [];
    this.user_activity = [];
  }

  ngOnInit(): void {
    this.showPage();
  }

  public async showPage(): Promise<any> {
    // Page wasn't loaded yet, make API call
    this.loadingState = true;

    const responseUsers: any = await this.userService.getAllUsers().toPromise();
    this.all_users.push(...responseUsers.content)

    const responseActivity: any = await this.userService.getUserActivityAdmin().toPromise();
    this.user_activity.push(...responseActivity.content);

    this.extractDate();
    this.createMultiData();

    if(this.noData == true) {
      this.yScaleMax = 1;
    }

    this.loadingState = false;

  }

  public changeInterval(selectedInterval: number) {
    this.activityInterval = selectedInterval;
    this.refreshData();
  }

  public initArray(todaysDate: Date) {
    for(let i = 0; i < this.activityInterval; i++) {
      let prevDate = new Date();
      let userDate: UserType = {'name':'0', 'value':0};
      prevDate.setDate(todaysDate.getDate() - i);
      const [month, day] = [("0" + (prevDate.getMonth() + 1)).slice(-2), ("0" + prevDate.getDate()).slice(-2)];
      const prevDateString = month + '-' + day;

      userDate.name = prevDateString;
      userDate.value = 0;

      this.created_users.push(userDate);
      this.active_users.push(userDate);
      this.modified_users.push(userDate);
    }

  }

  public extractDate(): any {
    let todaysDate = new Date();
    let minDate = new Date();

    minDate.setDate(todaysDate.getDate() - this.activityInterval);
    const [month, day, year] = [minDate.getMonth() + 1, minDate.getDate(), minDate.getFullYear()];
    const minDateString = year + '-' + month + '-' + day;

    this.initArray(todaysDate);

    for(let user of this.user_activity) {
      var activityDate = new Date(user.date);
      const [month, day] = [("0" + (activityDate.getMonth() + 1)).slice(-2), ("0" + (activityDate.getDate())).slice(-2)];
      const activityDateConverted = month + '-' + day;

      if(activityDate >= minDate) {
        if(user.logged === true) {
          this.active_users.forEach((part, index) => {
            if(activityDateConverted === part.name) {
              var num = part.value;
              this.active_users[index] = {
                name: part.name,
                value: num + 1
              }
              this.noData = false;
            }
            this[index] = part;
          }, this.active_users);
        }
        if(user.edited === true) {
          this.modified_users.forEach((part, index) => {
            if(activityDateConverted === part.name) {
              var num = part.value;
              this.modified_users[index] = {
                name: part.name,
                value: num + 1
              }
              this.noData = false;
            }
            this[index] = part;
          }, this.modified_users);
        }
      }
    }

    for(let user of this.all_users) {
      var createdDate = new Date(user.created);

      if(createdDate >= minDate) {
        this.created_users.forEach((part, index) => {
          if((user.created).substring(5,10) === part.name) {
            var num = part.value;
            this.created_users[index] = {
              name: part.name,
              value: num + 1
            }
            this.noData = false;
          }
          this[index] = part;
        }, this.created_users);
      }
    }

    this.created_users = this.created_users.reverse();
    this.modified_users = this.modified_users.reverse();
    this.active_users = this.active_users.reverse();

    return 0;

  }

  public createMultiData(): any {
    let multiElem: GraphData = {'name':'0', 'series': []};

    multiElem.name = "Signed Up";
    multiElem.series = this.created_users;
    this.multi.push(multiElem);

    multiElem = {'name':'0', 'series': []};

    multiElem.name = "Logged In";
    multiElem.series = this.active_users;
    this.multi.push(multiElem);

    multiElem = {'name':'0', 'series': []};

    multiElem.name = "Edited";
    multiElem.series = this.modified_users;
    this.multi.push(multiElem);
  }

  onSelect(event) {
    console.debug(event);
  }

  public refreshData() {
    this.all_users = [];
    this.created_users = [];
    this.active_users = [];
    this.modified_users = [];
    this.user_activity = [];
    this.multi = [];
    this.showPage();
  }

  axisFormat(val) {
    if (val % 1 === 0) {
      return val.toLocaleString();
    }
    else {
      return '';
    }
  }

}
