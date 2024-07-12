import {Repository} from './../../api/models/repository';
import {Component, EventEmitter, OnChanges, OnInit, Output, ViewChild, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Input} from '@angular/core';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnChanges, OnInit, OnChanges {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() options;
  @Input() hideSingleSelectionIndicator: boolean;
  @Input() tabIndex: number;

  @Output() onFilteredOptionsChange: EventEmitter<Repository[]> = new EventEmitter<Repository[]>();
  @Output() onFilteredValueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  get getTitle() {
    return this.title;
  }

  get getSubTitle() {
    return this.subTitle;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tabIndex) {
      this.myControl.setValue('');
    }

    if (changes.options && changes.options.currentValue) {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => value === '' ? this._filter(this.myControl.value) : this._filter(value))
        );
    }
  }

  public onValueChange() {
    this.onFilteredValueChange.emit(this.myControl.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const fileredOptions = this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    this.onFilteredOptionsChange.emit(fileredOptions);
    this.onFilteredValueChange.emit(value);
    return fileredOptions;
  }
}
