import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from "../../../core/service/core.service";
import {OrderService} from "../../../core/service/order.service";
import {Order} from "../../../core/model/order";
import {Page} from "../../../core/model/page";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {StatusMessageService} from "../../../core/service/status-message.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class OrderListComponent implements OnInit {

  public orders: Page<Order> = null;
  public loadingState: boolean = true;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('paginator') public paginator: MatPaginator;
  public dataSource: MatTableDataSource<Order>;
  public displayedColumns: string[] = ['price', 'created', 'last_modified', 'state', 'content', 'actions'];

  constructor(
    private router: Router,
    private coreService: CoreService,
    public orderService: OrderService,
    private statusMessageService: StatusMessageService,
  ) {
  }

  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getOrders();
  }

  public ngOnInit(): void {
    this.loadingState = true;
    this.getOrders();
  }

  public getOrders(): void {
    this.orderService.getOrders(this.pageIndex, this.pageSize)
      .subscribe((p: Page<Order>) => {
          this.orders = p;
          this.dataSource = new MatTableDataSource<Order>(this.orders.content);
          this.dataSource.paginator = this.paginator;
          this.loadingState = false;
        },
        (error) => {
          this.statusMessageService.addError(error);
          this.loadingState = false;
        });
  }

  public viewOrder(uuid: any): void {
    this.router.navigate(['/orders', uuid]).finally();
  }

  public showContent(order: Order): string {
    const items: string = order.items.map(item => item.core.name).join(', ');
    if (items.length < 40) {
      return items;
    } else {
      return items.substring(0, 40) + '...';
    }
  }
}
