import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-load-diagram-modal',
  templateUrl: './load-diagram-modal.component.html',
  styleUrls: ['./load-diagram-modal.component.css']
})
export class LoadDiagramModalComponent implements OnInit {

  public selectedFile: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { files: { id: string, name: string } }) { }

  ngOnInit(): void {
  }

}
