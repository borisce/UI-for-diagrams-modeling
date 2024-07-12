import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../../../core/service/repository.service';
import { SimulationResult } from '../../../../../api/models/simulation-result';
import { EditorTabsService } from '../../editor-tabs/service/editor-tabs.service';
import { FileCode } from '../../editor-tabs/model/file-code/file-code';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'simulation-results',
  templateUrl: './simulation-results.component.html',
  styleUrls: ['./simulation-results.component.scss']
})
export class SimulationResultsComponent implements OnInit {

  public results: SimulationResult[] = [];

  constructor(
    private repositoryService: RepositoryService,
    private editorTabsService: EditorTabsService
  ) {
  }

  public async getResults(): Promise<void> {
    const result: any = await this.repositoryService
      .getRepositorySimulationResults(this.repositoryService.currentRepoUuid).toPromise();
    this.results = result.content;
  }

  public ngOnInit(): void {
    this.getResults().then(() => { });
    this.editorTabsService.onSimulationFinished.subscribe(() => {
      this.getResults().then(() => { });
    });
  }

  // tslint:disable:max-line-length
  public async openFile(filename: string, simulation: SimulationResult, fileUuid: string): Promise<void> {
    const fileContent: any = await this.repositoryService
      .getRepositorySimulationFile(this.repositoryService.currentRepoUuid, simulation.uuid, fileUuid)
      .toPromise();
    if (filename.endsWith('.vcd')) {
      this.editorTabsService.openVCD(fileContent);
    } else {
      const fileCode: FileCode = new FileCode(filename, (new Date(simulation.start_time)).toLocaleDateString('sk-SK') + ' ' + (new Date(simulation.start_time)).toLocaleTimeString('sk-SK'), fileUuid);
      this.editorTabsService.addTab(fileCode, fileContent);
    }
  }
}
