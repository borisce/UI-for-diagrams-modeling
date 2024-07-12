import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-diagram-modal',
  templateUrl: './save-diagram-modal.component.html',
  styleUrls: ['./save-diagram-modal.component.css']
})
export class SaveDiagramModalComponent implements OnInit {

  public fileName: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
