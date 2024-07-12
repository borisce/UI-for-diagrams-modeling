import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {AuthenticationService} from '../../../../core/service';
import {CoreService} from '../../../../core/service/core.service';
import {CorePublic} from '../../../../core/model/core-public';
import {Page} from '../../../../core/model/page';
import {CoreCategory} from '../../../../core/model/core-category';
import {PriceRange} from '../../../../core/model/price-range';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {Options} from '@angular-slider/ngx-slider';
import {StatusMessageService} from "../../../../core/service/status-message.service";

@Component({
  selector: 'app-core-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})

export class CoreListingComponent implements OnInit {
  @ViewChild('paginator') public paginator: MatPaginator;
  public loadingState: boolean = true;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  public cores: Page<CorePublic>;
  public categories: CoreCategory[] = [];
  public priceRange: PriceRange;
  public filterData: object;

  public filters: UntypedFormGroup = new UntypedFormGroup({
    s: new UntypedFormControl(''),
    author: new UntypedFormControl(''),
    price_range: new UntypedFormControl([0, 0]),
    categories: new UntypedFormGroup({})
  });

  public priceRangeOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 0.01,
    translate: (val) => {
      return val.toLocaleString('sk-SK', {
        style: 'currency',
        currency: 'EUR'
      });
    }
  };

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private coreService: CoreService,
    private statusMessageService: StatusMessageService,
  ) {
  }

  public pageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCores();
  }

  public ngOnInit(): void {
    this.getCategories();
    this.getPriceRange();
    this.loadStoredFilters();
    this.getCores();
  }

  public getCategories(): void {
    this.coreService.getCategories().subscribe((cats: CoreCategory[]) => {
        const form: UntypedFormGroup = this.filters.get('categories') as UntypedFormGroup;
        for (const category of Object.values(cats)) {
          form.addControl(category.name, new UntypedFormControl(false));
        }
        this.categories = cats;
      },
      error => {
        this.statusMessageService.addError(error);
      });
  }

  public getPriceRange(): void {
    // https://angular-slider.github.io/ngx-slider/demos
    this.coreService.getCoresPriceRange().subscribe((range: PriceRange) => {
        this.priceRange = range;
        const newOptions: Options = Object.assign({}, this.priceRangeOptions);
        newOptions.floor = this.priceRange.min_price;
        newOptions.ceil = this.priceRange.max_price;
        this.priceRangeOptions = newOptions;
        setTimeout(() => {
          this.filters.patchValue({
            price_range: [this.priceRange.min_price,
              this.priceRange.max_price]
          });
        }, 0);

        // this.filters.get('price_range').setValue([this.priceRange.min_price,
        //   this.priceRange.max_price]);
        // this.filters.get('price_range').setValue([200,
        //   500]);
        // const currVal: number[] = this.filters.get('price_range').value;
        // console.log(currVal);
        // if (currVal[0] === 100 && currVal[1] === 100) {
        //   this.filters.get('price_range').setValue([this.priceRange.min_price,
        //     this.priceRange.max_price]);
        // }
      },
      error => {
        this.statusMessageService.addError(error);
      });
  }

  public getCores(): void {
    this.loadingState = true;
    this.coreService
      .getCores(this.pageIndex, this.pageSize, this.filterData)
      .subscribe((cores: Page<CorePublic>) => {
          this.cores = cores;
          this.loadingState = false;
        },
        error => {
          this.loadingState = false;
          this.statusMessageService.addError(error);
        });
  }

  public applyFilters(): void {
    this.getFilterValues();
    this.pageIndex = 0;
    this.saveFilters();
    this.getCores();
  }

  public loadStoredFilters(): void {
    const filtersString: string = localStorage.getItem('coreFilters');
    if (filtersString !== null) {
      const storedFilters: object = JSON.parse(filtersString);

      const categories: UntypedFormGroup = this.filters.get('categories') as UntypedFormGroup;
      categories.reset();
      Object.entries(storedFilters['categories']).forEach(e => {
        categories.addControl(e[0], new UntypedFormControl(e[1]));
      });
      setTimeout(() => {
        this.filters.patchValue({
          s: storedFilters['s'],
          author: storedFilters['author'],
          price_range: [storedFilters['price_range'][0], storedFilters['price_range'][1]]
        });
      }, 500);
      this.getFilterValues();
    }
  }

  public saveFilters(): void {
    localStorage.setItem('coreFilters', JSON.stringify(this.filters.value));
  }

  public resetFilters(): void {
    this.filters.patchValue({
      s: '',
      author: '',
      price_range: [this.priceRangeOptions.floor, this.priceRangeOptions.ceil]
    });
    this.applyFilters();
  }

  private getFilterValues(): void {
    this.filterData = {
      price_range: {
        min: this.filters.value.price_range[0],
        max: this.filters.value.price_range[1],
      },
      s: this.filters.value.s,
      author: this.filters.value.author,
      categories: Object.entries(this.filters.value.categories)
        .filter(e => e[1] === true).map(e => e[0])
    };
  }
}
