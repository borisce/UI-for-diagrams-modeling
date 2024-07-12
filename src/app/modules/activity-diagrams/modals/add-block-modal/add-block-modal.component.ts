import { Component, Inject, OnInit } from '@angular/core';
import { Block } from '../../types/diagram-data.type';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InputOutput } from '../../types/data-source.type';

@Component({
  selector: 'app-add-block-modal',
  templateUrl: './add-block-modal.component.html',
  styleUrls: ['./add-block-modal.component.css']
})
export class AddBlockModalComponent implements OnInit {

  public blockName: string | null = null;
  public logic: 'combinational' | 'sequential' = 'combinational';
  public sensitivityList: Block['sensitivityList'] = {
    clockSignal: null,
    clockEdge: 'rising',
    resetSignal: null,
    resetType: 'async',
    resetValue: 'active-1',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { inputs: MatTableDataSource<InputOutput> }) { }

  ngOnInit(): void {
  }

}
