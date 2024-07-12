import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RepositoryService } from 'src/app/core/service/repository.service';
import { Repository } from 'src/app/api/models/repository';
import * as shape from 'd3-shape';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface RepoType {
  name: String;
  value: number;
}

export interface GraphData {
  name: String;
  series: any;
}

export interface RepoActivity {
  date: any;
  deleted: boolean;
  created: boolean;
  modified: boolean;
}

@Component({
  selector: 'app-repository-graph',
  templateUrl: './repository-graph.component.html',
  styleUrls: ['./repository-graph.component.scss']
})

export class RepositoryGraphComponent implements OnInit {
  public loadingState: boolean = true;
  public all_repos: Repository[] = [];
  public repo_activity: RepoActivity[] = [];
  private created_repos: RepoType[] = [];
  private deleted_repos: RepoType[] = [];
  private modified_repos: RepoType[] = [];
  public repo_action: RepoType[] = [];
  public multiElem: GraphData[] = [];
  public multi: any[] = [];
  public repoInterval: number = 12;

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
    domain: ['#2a9d8f', '#e76f51', '#003566']
  };
  maxYAxisTickLength: any;
  maxXAxisTickLength: any;
  yAxisLabel: any;
  xAxisLabel: any;
  view: any;

  constructor(
    private repositoryService: RepositoryService
  ) {
    this.all_repos = [];
    this.created_repos = [];
    this.deleted_repos = [];
    this.modified_repos = [];
    this.repo_activity = [];
  }

  ngOnInit(): void {
    this.showPage();
  }

  public async showPage(): Promise<any> {
    // Page wasn't loaded yet, make API call
    this.loadingState = true;

    const responseRepos: any = await this.repositoryService.getAllRepos().toPromise();
    this.all_repos.push(...responseRepos.content);

    const responseActivity: any = await this.repositoryService.getRepoActivityAdmin().toPromise();
    this.repo_activity.push(...responseActivity.content);

    this.extractDate();
    this.createMultiData();

    if(this.noData == true) {
      this.yScaleMax = 1;
    }

    this.loadingState = false;

  }

  public initArray(todaysDate: Date) {
    for(let i = 0; i < this.repoInterval; i++) {
      let prevDate = new Date();
      let repoDate: RepoType = {'name':'0', 'value':0};
      prevDate.setDate(todaysDate.getDate() - i);
      const [month, day] = [("0" + (prevDate.getMonth() + 1)).slice(-2), ("0" + prevDate.getDate()).slice(-2)];
      const prevDateString = month + '-' + day;

      repoDate.name = prevDateString;
      repoDate.value = 0;

      this.created_repos.push(repoDate);
      this.deleted_repos.push(repoDate);
      this.modified_repos.push(repoDate);
    }

  }

  public changeInterval(selectedInterval: number) {
    this.repoInterval = selectedInterval;
    this.refreshData();
  }

  public extractDate(): any {
    let todaysDate = new Date();
    let minDate = new Date();

    minDate.setDate(todaysDate.getDate() - this.repoInterval);
    const [month, day, year] = [minDate.getMonth() + 1, minDate.getDate(), minDate.getFullYear()];
    const minDateString = year + '-' + month + '-' + day;

    this.initArray(todaysDate);

    for(let repo of this.repo_activity) {
      var activityDate = new Date(repo.date);
      const [month, day] = [("0" + (activityDate.getMonth() + 1)).slice(-2), ("0" + (activityDate.getDate())).slice(-2)];
      const activityDateConverted = month + '-' + day;

      if(activityDate >= minDate) {
        if(repo.created === true) {
          this.created_repos.forEach((part, index) => {
            if(activityDateConverted === part.name) {
              var num = part.value;
              this.created_repos[index] = {
                name: part.name,
                value: num + 1
              }
              this.noData = false;
            }
            this[index] = part;
          }, this.created_repos);
        }
        if(repo.deleted === true) {
          this.deleted_repos.forEach((part, index) => {
            if(activityDateConverted === part.name) {
              var num = part.value;
              this.deleted_repos[index] = {
                name: part.name,
                value: num + 1
              }
              this.noData = false;
            }
            this[index] = part;
          }, this.deleted_repos);
        }
        if(repo.modified === true) {
          this.modified_repos.forEach((part, index) => {
            if(activityDateConverted === part.name) {
              var num = part.value;
              this.modified_repos[index] = {
                name: part.name,
                value: num + 1
              }
              this.noData = false;
            }
            this[index] = part;
          }, this.modified_repos);
        }
      }

    }

    this.created_repos = this.created_repos.reverse();
    this.modified_repos = this.modified_repos.reverse();
    this.deleted_repos = this.deleted_repos.reverse();

    return 0;
  }

  public createMultiData(): any {
    let multiElem: GraphData = {'name':'0', 'series': []};

    multiElem.name = "Created";
    multiElem.series = this.created_repos;
    this.multi.push(multiElem);

    multiElem = {'name':'0', 'series': []};

    multiElem.name = "Deleted";
    multiElem.series = this.deleted_repos;
    this.multi.push(multiElem);

    multiElem = {'name':'0', 'series': []};

    multiElem.name = "Modified";
    multiElem.series = this.modified_repos;
    this.multi.push(multiElem);
  }

  onSelect(event) {
    console.debug(event);
  }

  public refreshData() {
    this.all_repos = [];
    this.created_repos = [];
    this.deleted_repos = [];
    this.modified_repos = [];
    this.multi = [];
    this.repo_activity = [];
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
