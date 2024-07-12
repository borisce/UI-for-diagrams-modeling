import { Component, Input, OnInit } from '@angular/core';
import { RepositoryService } from '../../../../../core/service/repository.service';
import { SynthesisResult } from '../../../../../api/models/synthesis-result';
import { EditorTabsService } from '../../editor-tabs/service/editor-tabs.service';
import { FileCode } from '../../editor-tabs/model/file-code/file-code';
import { EditorComponentComponent } from '../../editor-component.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'synthesis-results',
  templateUrl: './synthesis-results.component.html',
  styleUrls: ['./synthesis-results.component.scss']
})
export class SynthesisResultsComponent implements OnInit {

  public results: SynthesisResult[] = [];
  public resultsPage: number = 0;
  public resultsPageSize: number = 5;
  public resultsTotalElements: number = 0;
  public resultsInterval: any;

  @Input('context') public context: EditorComponentComponent;

  constructor(
    private repositoryService: RepositoryService,
    private editorTabsService: EditorTabsService
  ) {
  }

  public async getResults(): Promise<void> {
    const result: any = await this.repositoryService
      .getRepositorySynthesisResults(this.repositoryService.currentRepoUuid, Math.max(this.resultsPage, 0), this.resultsPageSize).toPromise();
    this.updateResults(result.content);
    this.resultsTotalElements = result.totalElements;
    this.resultsPage = Math.min(this.resultsPage, result.totalPages - 1);
    this.checkMaxPage();
  }

  public checkMaxPage() {
    if ((this.resultsPage * this.resultsPageSize) + 1 > this.resultsTotalElements) {
      this.resultsPage = -Math.floor(-((this.resultsTotalElements / this.resultsPageSize) - 1));
    }
  }

  public ngOnInit(): void {
    this.getResults().then(() => { });
    this.resultsInterval = setInterval(() => {
      if (this.context && this.context.currentWindow && this.context.currentWindow == 'synthesis-results') {
        this.getResults().then(() => { });
      }
    }, 2000);
  }

  public ngOnDestroy(): void {
    clearInterval(this.resultsInterval);
  }

  // tslint:disable:max-line-length
  public async openFile(filename: string, simulation: SynthesisResult, fileUuid: string): Promise<void> {
    const fileContent: any = await this.repositoryService
      .getRepositorySynthesisFile(this.repositoryService.currentRepoUuid, simulation.uuid, fileUuid)
      .toPromise();
    if (filename.endsWith('.vcd')) {
      this.editorTabsService.openVCD(fileContent);
    } else {
      const fileCode: FileCode = new FileCode(filename, (new Date(simulation.end_time)).toLocaleDateString('sk-SK') + ' ' + (new Date(simulation.end_time)).toLocaleTimeString('sk-SK'), fileUuid);
      this.editorTabsService.addTab(fileCode, fileContent);
    }
  }

  public async deleteSynthesis(synthesis: SynthesisResult): Promise<void> {
    synthesis.deleting_status = true;
    const content: any = await this.repositoryService
      .deleteRepositorySynthesis(this.repositoryService.currentRepoUuid, synthesis.uuid)
      .toPromise();
  }

  public async downloadFile(filename: string, simulation: SynthesisResult, fileUuid: string): Promise<void> {
    const fileContent: any = await this.repositoryService
      .getRepositorySynthesisFile(this.repositoryService.currentRepoUuid, simulation.uuid, fileUuid)
      .toPromise();
    var binaryData = [];
    binaryData.push(fileContent);
    var url = window.URL.createObjectURL(new Blob(binaryData, { type: "text/plain" }));
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.setAttribute('target', 'blank');
    a.href = url;
    a.download = filename.split('/').reverse()[0];
    a.click();
  }

  public async downloadZip(filename: string, synthesis: SynthesisResult): Promise<void> {
    const fileContent: any = await this.repositoryService
      .getRepositorySynthesisZip(this.repositoryService.currentRepoUuid, synthesis.uuid)
      .toPromise();
    var binaryData = [];
    binaryData.push(fileContent);
    var url = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.setAttribute('target', 'blank');
    a.href = url;
    a.download = filename.split('/').reverse()[0];
    a.click();
  }

  public updateResults(results) {
    //this.results = results;
    /* setTimeout(() => {
      console.log(results);
    }, 500); */
    this.results.forEach((oldRes, key) => {
      var deleteResIndex = results.findIndex(el => el.uuid == oldRes.uuid);
      if (deleteResIndex == -1) {
        this.results = this.results.filter(function (res) {
          res.uuid !== oldRes.uuid;
        });
      }
    });

    results.reverse().forEach((newRes, key) => {
      var oldRes = this.results.find(el => el.uuid == newRes.uuid);
      if (!oldRes || oldRes == undefined) {
        this.results.unshift(newRes);
      } else {
        Object.keys(newRes).forEach(key => {
          oldRes[key] !== newRes[key] ? oldRes[key] = newRes[key] : '';
        })
      }
    });
  }

  public getFilesInDir(result, dir) {
    return result.files.filter(el => el.file_name.split('/')[0] == dir);
  }

  public getFinishedCssClass(result) {
    if (result.finished == true) {
      if (result.synthesize !== 'crashed' && result.place !== 'crashed' && result.sta !== 'crashed' && result.route !== 'crashed' && result.backanno !== 'crashed') {
        return 'finished';
      } else {
        return 'crashed';
      }
    } else {
      return 'running';
    }
  }
}
