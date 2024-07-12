import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilesService } from '../../../../core/fileSystem/Filer/files.service';
import { CodeToDiaExtractService } from '../../../../api/systemverilogparser/services/code-to-dia-extract.service';
import { RepoFileReference } from '../classes/repoFileReference';
import { SourceCode } from '../classes/sourceCode';
import { VisualizationData } from '../classes/visualizationData';
import { ParsedModule } from '../classes/parsedModule';
import { ParsedModulesArray } from '../classes/parsedModulesArray';
import { ParsedDiagram } from '../classes/parsedDiagram';
import { ParsedPackage, ParsedPackages } from '../classes/parsedPackages';
import {
  CollabService,
  documentTitle,
  getFileNameFromDocID
} from '../../../../core/service/collab.service';
import { RepositoryService } from '../../../../core/service/repository.service';
import { ModalAlertComponent } from '../../../../modal/modal-alert/modal-alert.component';
import { MatDialog } from '@angular/material/dialog';

interface Point {
  x: number;
  y: number;
  take: boolean;
}

@Component({
  selector: 'app-diagram-generation',
  templateUrl: './diagram-generation.component.html',
  styleUrls: ['./diagram-generation.component.scss'],
  providers: [FilesService]
})

export class DiagramGenerationComponent implements OnInit {

  @Output() public subdiagramDataSubmitted:
    EventEmitter<ParsedDiagram> = new EventEmitter<ParsedDiagram>();
  @Output() public packageDataSubmitted:
    EventEmitter<ParsedPackages> = new EventEmitter<ParsedPackages>();
  public repo: any;

  constructor(
    private codeToDiaService: CodeToDiaExtractService,
    public repoService: RepositoryService,
    private collabService: CollabService,
    private dialog: MatDialog) {
  }

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  public ngOnInit(): void {
    this.repo = this.repoService.currentRepo;
  }


  public async loadAvailableSourceFiles(suffix: string): Promise<RepoFileReference[]> {
    return await this.getListOfRelevantFilesBySuffix(suffix);
  }

  public async getListOfRelevantFilesBySuffix(suffix: string): Promise<RepoFileReference[]> {
    const getFiles: any = async () => {
      this.repo = this.repoService.currentRepo;
      return (await this.collabService.getFilesBySuffix(
        suffix, this.repo.uuid, this.branch)).map(value => {
          return {
            name: value,
            displayName: getFileNameFromDocID(value),
            parentModuleInstance: null,
            length: value.split('/').length
          };
        });
    };

    if (this.repo) {
      return getFiles();
    }
  }

  public async getFileBody(fileReference: RepoFileReference): Promise<string> {
    try {
      return await this.collabService.getDocContents(fileReference.name);
    } catch (e) {
      this.dialog.open(ModalAlertComponent, {
        data: {
          title: 'Diagram couldn\'t be loaded.',
          message: `Diagram could not be loaded, because a file is missing:
          ${getFileNameFromDocID(e)}`
        }
      });
    }
  }

  public loadDiagramFromSVCode(sourceCode: string): void {
    const originModuleSourceCode: SourceCode = {
      body: {
        sourceCode
      }
    };
    this.codeToDiaService.parseForSubModuleInteraceRecognition(originModuleSourceCode).subscribe(
      response => {
        const returnedNames: Array<RepoFileReference> = [];
        response.forEach(fileReference => {
          const returnedName: RepoFileReference = {
            name: documentTitle(this.repo.uuid, fileReference.identifiedModules,
              this.repo.authorUUID, this.branch),
            parentModuleInstance: fileReference.identifiedInstance,
            length: fileReference.identifiedModules.length
          };
          returnedNames.push(returnedName);
        });
        this.onFileNamesReturned(returnedNames, originModuleSourceCode);
      }
    );
  }

  public onFileNamesReturned(names: RepoFileReference[], originModuleSourceCode: SourceCode): void {
    const arrSize: number = names.length;
    const returnArray: ParsedModule[] = [];
    let moduleSourceCode: SourceCode;
    names.forEach(async fileReference => {
      const code: string = await this.getFileBody(fileReference);
      moduleSourceCode = {
        body: {
          sourceCode: code,
        }
      };
      this.codeToDiaService.parseForVisualization(moduleSourceCode).subscribe(response => {
        const moduleData: ParsedModule = JSON.parse(response[0].json);
        moduleData.mainModuleInstance = fileReference.parentModuleInstance;
        returnArray.push(moduleData);
        // very poor synchronization method but it does the job and too
        // much time was spent to try somehow synchronize returnArray snych
        // tslint:disable-next-line:triple-equals
        if (returnArray.length == arrSize) {
          this.parseAllBeforeVisualization(returnArray, originModuleSourceCode);
        }
      });
    });
  }

  public parseAllBeforeVisualization(identifiedInterfaces: ParsedModule[],
    originModuleSourceCode: SourceCode): void {
    const wrappedInterfaces: ParsedModulesArray = {
      modules: identifiedInterfaces
    };
    const preparedData: VisualizationData = {
      body: {
        sourceCode: originModuleSourceCode.body.sourceCode,
        subModuleInterfaces: JSON.stringify(wrappedInterfaces)
      }
    };
    this.codeToDiaService.parseForSubDiaVisualization(preparedData).subscribe(response => {
      const moduleData: ParsedDiagram = JSON.parse(response.json);
      this.enahnceReceivedExtractedDataFromCodeWithCoordinates(moduleData);
    });
  }

  public enahnceReceivedExtractedDataFromCodeWithCoordinates(moduleData: ParsedDiagram): void {
    const gridSize: number = Math.ceil(Math.pow(moduleData.modules.length, 1 / 2));
    let moduleXcoord: number = 150;
    let moduleYcoord: number = 50;
    const moduleWidth: number = 180;
    const moduleWidthOffset: number = 240;
    const moduleHeight: number = 90;
    const moduleHeightOffset: number = 150;
    const multi: Point[] = new Array<Point>();
    for (let i: number = 0; i < gridSize; i++) {
      moduleXcoord = 150;
      for (let j: number = 0; j < gridSize; j++) {
        const coords: Point = { x: moduleXcoord, y: moduleYcoord, take: false };
        multi.push(coords);
        moduleXcoord += moduleWidth + moduleWidthOffset;
      }
      moduleYcoord += moduleHeight + moduleHeightOffset;
    }
    moduleData.modules.forEach(module => {
      let cell: number = Math.floor(Math.random() * (((gridSize * gridSize) - 1) + 1));
      while (multi[cell].take !== false) {
        cell = Math.floor(Math.random() * (((gridSize * gridSize) - 1) + 1));
      }
      multi[cell].take = true;
      module.x = multi[cell].x;
      module.y = multi[cell].y;
    });

    const mainportInputXCoord: number = 30;
    const mainportOutputXCoord: number = moduleXcoord + 120;
    let mainportYCoord: number = 75;
    const mainportHeight: number = 20;
    const maintportOffset: number = 60;
    moduleData.mainPorts.forEach(port => {
      if (port.direction === 'input') {
        port.x = mainportInputXCoord;
        port.y = mainportYCoord;
        mainportYCoord += mainportHeight + maintportOffset;
      }
    });
    mainportYCoord = 75;
    moduleData.mainPorts.forEach(port => {
      if (port.direction === 'output') {
        port.x = mainportOutputXCoord;
        port.y = mainportYCoord;
        mainportYCoord += mainportHeight + maintportOffset;
      }
    });

    this.subdiagramDataSubmitted.emit(moduleData);
  }

  public async getAvailablePackages(): Promise<void> {
    const packages: RepoFileReference[] =
      await this.getListOfRelevantFilesBySuffix('_package.sv');
    let packageSourceCode: SourceCode;
    const identifiedPackages: ParsedPackages = {
      items: [] as ParsedPackage[]
    };
    const arrSize: number = packages.length;
    for (const _package of packages) {
      const code: string = await this.getFileBody(_package);
      packageSourceCode = {
        body: {
          sourceCode: code,
        }
      };
      this.codeToDiaService.parsePackageInformation(packageSourceCode).subscribe(response => {
        identifiedPackages.items.push({
          package: {
            name: _package.displayName,
            dataTypes: response
          }
        });
        // very poor synchronization method but it does the job and too much time was spent to try
        // somehow synchronize returnArray snych
        if (identifiedPackages.items.length === arrSize) {
          this.packageDataSubmitted.emit(identifiedPackages);
        }
      });
    }
  }

  public saveFile(fileName: string, sourceCode: string): void {
    const filePath: string = documentTitle(this.repo.uuid, fileName, this.repo.authorUUID, this.branch);
    this.collabService.createOrUpdateDocument(filePath, sourceCode, this.repo.uuid, this.branch);
  }


}
