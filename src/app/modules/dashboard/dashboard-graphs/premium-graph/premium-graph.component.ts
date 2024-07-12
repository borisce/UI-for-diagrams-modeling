import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export interface GraphData {
  name: String;
  series: any;
}

@Component({
  selector: 'app-premium-graph',
  templateUrl: './premium-graph.component.html',
  styleUrls: ['./premium-graph.component.scss']
})

export class PremiumGraphComponent implements OnInit {
  public loadingState: boolean = true;
  public subscribed_users: any[] = [];
  public unsubscribed_users: any[] = [];
  public multiElem: GraphData[] = [];
  public multi: any[] = [];
  public subInterval: number = 12;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;
  timeline: boolean = false;
  legendPosition: String = "below";
  legendTitle: String = "";
  xScaleMax: number;
  noData: boolean = true;

  colorScheme = {
    domain: ['#e9c46a', '#e76f51']
  };

  constructor() {
    this.subscribed_users = [];
    this.unsubscribed_users = [];
  }

  ngOnInit(): void {
    this.showPage();
  }

  public async showPage(): Promise<any> {
    // Page wasn't loaded yet, make API call
    this.loadingState = true;

    this.extractDate();

    if(this.noData == true) {
      this.xScaleMax = 1;
    }

    this.loadingState = false;

  }

  public changeInterval(selectedInterval: number) {
    this.subInterval = selectedInterval;
    this.refreshData();
  }

  public getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  public initArray(todaysDate: Date) {
    for(let i = 0; i < this.subInterval; i++) {

      let prevDate = new Date();
      let subDate: any = {'name':'0', 'series':[]};
      prevDate.setDate(todaysDate.getDate() - i);
      const [month, day] = [("0" + (prevDate.getMonth() + 1)).slice(-2), ("0" + prevDate.getDate()).slice(-2)];
      const prevDateString = month + '-' + day;

      subDate.name = prevDateString;
      subDate.series.push({'name':'Subscribed', 'value':this.getRandomInt(60)});
      subDate.series.push({'name':'Unsubscribed', 'value':this.getRandomInt(60)});

      this.multi.push(subDate);

    }

  }

  public extractDate(): any {
    let todaysDate = new Date();
    let minDate = new Date();

    minDate.setDate(todaysDate.getDate() - this.subInterval);
    const [month, day, year] = [minDate.getMonth() + 1, minDate.getDate(), minDate.getFullYear()];
    const minDateString = year + '-' + month + '-' + day;

    this.initArray(todaysDate);

    return 0;
  }

  onSelect(event) {
    console.debug(event);
  }

  public refreshData() {
    this.subscribed_users = [];
    this.unsubscribed_users = [];
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

  // TODO HARDCODED SUBS - Change to real data after subscription implementation
  multi_a = [
    {
      "name": "1",
      "series": [
        {
          "name": "Subscribed",
          "value": 18
        },
        {
          "name": "Unsubscribed",
          "value": 2
        }
      ]
    },
    {
      "name": "2",
      "series": [
        {
          "name": "Subscribed",
          "value": 10
        },
        {
          "name": "Unsubscribed",
          "value": 0
        }
      ]
    },
    {
      "name": "3",
      "series": [
        {
          "name": "Subscribed",
          "value": 40
        },
        {
          "name": "Unsubscribed",
          "value": 3
        }
      ]
    },
    {
      "name": "4",
      "series": [
        {
          "name": "Subscribed",
          "value": 80
        },
        {
          "name": "Unsubscribed",
          "value": 0
        }
      ]
    },
    {
      "name": "5",
      "series": [
        {
          "name": "Subscribed",
          "value": 70
        },
        {
          "name": "Unsubscribed",
          "value": 10
        }
      ]
    },
    {
      "name": "6",
      "series": [
        {
          "name": "Subscribed",
          "value": 45
        },
        {
          "name": "Unsubscribed",
          "value": 0
        }
      ]
    },
    {
      "name": "7",
      "series": [
        {
          "name": "Subscribed",
          "value": 0
        },
        {
          "name": "Unsubscribed",
          "value": 5
        }
      ]
    },
    {
      "name": "8",
      "series": [
        {
          "name": "Subscribed",
          "value": 0
        },
        {
          "name": "Unsubscribed",
          "value": 10
        }
      ]
    },
    {
      "name": "9",
      "series": [
        {
          "name": "Subscribed",
          "value": 15
        },
        {
          "name": "Unsubscribed",
          "value": 0
        }
      ]
    },
    {
      "name": "10",
      "series": [
        {
          "name": "Subscribed",
          "value": 0
        },
        {
          "name": "Unsubscribed",
          "value": 0
        }
      ]
    },
    {
      "name": "11",
      "series": [
        {
          "name": "Subscribed",
          "value": 14
        },
        {
          "name": "Unsubscribed",
          "value": 0
        }
      ]
    },
    {
      "name": "12",
      "series": [
        {
          "name": "Subscribed",
          "value": 0
        },
        {
          "name": "Unsubscribed",
          "value": 2
        }
      ]
    }
  ];
  view: any;
  xAxisLabel: any;
  yAxisLabel: any;
  gradient: any;
  maxXAxisTickLength: any;
  maxYAxisTickLength: any;

}
