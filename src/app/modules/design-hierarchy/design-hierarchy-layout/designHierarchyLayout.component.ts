import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagramPaperComponent } from '../diagram-paper/diagram-paper.component';
import { FilesService } from '../../../core/fileSystem/Filer/files.service';
import { CollabService } from '../../../core/service/collab.service';
import { RepositoryService } from '../../../core/service/repository.service';
import { Repository } from '../../../api/models/repository';
import { Router } from '@angular/router';


@Component({
  selector: 'app-design-hierarchy-layout',
  templateUrl: './designHierarchyLayout.component.html',
  styleUrls: ['./designHierarchyLayout.component.scss'],
  providers: [FilesService]
})

export class DesignHierarchyLayoutComponent implements OnInit {

  @ViewChild(DiagramPaperComponent) public readonly paper: DiagramPaperComponent;

  public drawingMode: boolean = false;
  public isAnyWindowOpen: boolean = false;
  public repo: any;
  public isCodeToBeGeneratedVHDL: boolean = false;
  private language: string = '';
  private stateID: number;
  private readonly visualisationDoc: any;
  public currentWindow: string = 'project-explorer';
  public tooltipPosition: any = 'right';

  constructor(
    public repoService: RepositoryService,
    private collabService: CollabService,
    private router: Router
  ) {
    this.stateID = 2;
    const repo: Repository = this.repoService.currentRepo;
    this.visualisationDoc = collabService.getVisualisations(repo.uuid.toString());
  }

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public changeWindow(window: string): void {
    this.currentWindow = window;
  }

  public ngOnInit(): void {
    this.repo = this.repoService.currentRepo;
  }

  public loadLanguage(language: string): void {
    const vorsvText: HTMLElement = document.getElementById('VorSV');
    const vhdlText: HTMLElement = document.getElementById('VHDL');
    if (language === 'VHDL') {
      this.isCodeToBeGeneratedVHDL = true;
      vorsvText.style.fontWeight = 'normal';
      vhdlText.style.fontWeight = 'bold';
      this.paper.updateLanguage('VHDL');
    } else if (language === 'SystemVerilog') {
      this.isCodeToBeGeneratedVHDL = false;
      vorsvText.style.fontWeight = 'bold';
      vhdlText.style.fontWeight = 'normal';
      this.paper.updateLanguage('SystemVerilog');
    }
    this.paper.updateLanguage(language);
  }

  public loadDrawingMode(drawingMode: boolean): void {
    this.drawingMode = drawingMode;
    const movingModeText: HTMLElement = document.getElementById('moving-mode');
    const movingModeIcon: HTMLElement = document.getElementById('moving-mode-icon');
    const drawingModeText: HTMLElement = document.getElementById('drawing-mode');
    const drawingModeIcon: HTMLElement = document.getElementById('drawing-mode-icon');
    if (!this.drawingMode) {
      movingModeText.style.fontWeight = 'bold';
      movingModeIcon.style.color = 'black';
      drawingModeText.style.fontWeight = 'normal';
      drawingModeIcon.style.color = 'grey';
    } else {
      movingModeText.style.fontWeight = 'normal';
      movingModeIcon.style.color = 'grey';
      drawingModeText.style.fontWeight = 'bold';
      drawingModeIcon.style.color = 'black';
    }
  }

}
