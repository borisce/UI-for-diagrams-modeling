import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Block } from '../../types/diagram-data.type';
import { MatTableDataSource } from '@angular/material/table';
import { InputOutput } from '../../types/data-source.type';

@Component({
  selector: 'app-edit-block-modal',
  templateUrl: './edit-block-modal.component.html',
  styleUrls: ['./edit-block-modal.component.css']
})
export class EditBlockModalComponent implements OnInit {

  public blockName: string | null = null;
  public logic: 'combinational' | 'sequential' = 'combinational';
  public sensitivityList: Block['sensitivityList'] = {
    clockSignal: null,
    clockEdge: 'rising',
    resetSignal: null,
    resetType: 'async',
    resetValue: 'active-1',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { blockName: string, logic: string, sensitivityList: Block['sensitivityList'], inputs: MatTableDataSource<InputOutput> }) {
  }

  ngOnInit(): void {
    this.blockName = this.data.blockName;
    this.logic = this.data.logic as 'combinational' | 'sequential';
    this.sensitivityList = this.data.sensitivityList ?? {
      clockSignal: null,
      clockEdge: 'rising',
      resetSignal: null,
      resetType: 'async',
      resetValue: 'active-1',
    };
  }

}
