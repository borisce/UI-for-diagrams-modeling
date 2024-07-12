import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileTreeNode} from 'src/app/core/fileSystem/FileTree/filetree.node.interface';
import {CollabService} from 'src/app/core/service/collab.service';
import {RepositoryService} from 'src/app/core/service/repository.service';
import {ModalSelectFileComponent} from 'src/app/modal/modal-select-file/modal-select-file.component';
import {ModalSelectFolderComponent} from 'src/app/modal/modal-select-folder/modal-select-folder.component';
import {environment} from 'src/environments/environment';
import {EditorComponentComponent} from '../editor-component.component';
import {RepoSimulationConfigurationDto} from "../../../../core/model/repo-simulation-configuration-dto";
import {EditorTabsService} from "../editor-tabs/service/editor-tabs.service";
import {
  ModalMultiselectFilesComponent
} from "../../../../modal/modal-multiselect-files/modal-multiselect-files.component";
import {
  ModalStartSimulationWithTranspilationComponent
} from "../../../../modal/modal-start-simulation-with-transpilation/modal-start-simulation-with-transpilation.component";

@Component({
  selector: 'app-editor-configuration',
  templateUrl: './editor-configuration.component.html',
  styleUrls: ['./editor-configuration.component.scss']
})
export class EditorConfigurationComponent implements OnInit, AfterViewInit {
  public configForm: UntypedFormGroup;

  @Input('context') public context: EditorComponentComponent;
  public svFiles: string[];
  public topmoduleAvailableFiles: string[];
  public testbenchAvailableFiles: string[];
  public otherAvailableFiles: string[];
  private dumpWaveform: boolean;

  constructor(
    private _editorTabsService: EditorTabsService,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private collabService: CollabService,
    private repoService: RepositoryService) {
    const defaultSimulator = "IVERILOG";
    this.configForm = this.formBuilder.group({
      selectedSimulator: [defaultSimulator, [Validators.required]],
      topModuleFile: ["", [Validators.required]],
      testbenchFile: ["", [Validators.required]],
      // outputFile: ["", [Validators.required]],
      // outputFolder: ["", [Validators.required]],
      selectedFilesAction: ['exclude', []],
      dumpWaveform: [{
        value: this.dumpWaveform,
        disabled: defaultSimulator != 'IVERILOG'
      }],
      // waveformOutputFile: [{
      //   value: this.dumpWaveform ? "" : '',
      //   disabled: !this.dumpWaveform
      // }, [Validators.required, Validators.pattern("(.*)\.vcd")]],
      // dumpLevel: [{
      //   value: '',
      //   disabled: !this.dumpWaveform
      // }, [Validators.pattern("^[0-9]*$")]],
      modulesArray: [[]],
    });
  }

  get waveformOutputFileErrorMessage(): string {
    const form: UntypedFormControl = (this.configForm.get('waveformOutputFile') as UntypedFormControl);
    return form.hasError('required') ?
      'Waveform filename is required' :
      form.hasError('pattern') ?
        'Filename has to end with an extension of \'.vcd\'' :
        'Incorrect value'
  }

  get levelDepthErrorMessage(): string {
    const form: UntypedFormControl = (this.configForm.get('dumpLevel') as UntypedFormControl);
    return form.hasError('pattern') ?
      'Value has to be a number' :
      'Incorrect value'
  }

  get modulesArrayErrorMessage(): string {
    const form: UntypedFormControl = (this.configForm.get('modulesArray') as UntypedFormControl);
    return form.hasError('required') ?
      'Modules are required when level is set' :
      form.hasError('pattern') ?
        'Module names contain illegal characters' :
        'Incorrect value'
  }

  getFileList() {
    const files = this.context.getHierarchicalData();
    const getSVFiles = function (obj, parent = undefined) {
      const ff = [];

      obj.forEach(item => {
        if (item.isFile && item.displayName.endsWith('.sv')) {
          ff.push((parent + '/' + item.displayName).substring(1));
        } else if (item.subChild.length > 0) {
          let dir: string = '';
          if (parent !== undefined) {
            dir = parent + '/' + item.displayName;
          }
          ff.push(...getSVFiles(item.subChild, dir));
        }
      });
      return ff;
    };
    return getSVFiles(files);
  }

  refreshFileList() {
    this.svFiles = this.getFileList();
  }

  refreshFileListClicked(e) {
    e.preventDefault();
    this.refreshFileList();
    //this.updateFileSelectionFields();
  }

  updateFileSelectionFields() {
    //console.log("updateFileSelectionFields");
    this.topmoduleAvailableFiles = [];
    this.testbenchAvailableFiles = [];
    this.otherAvailableFiles = [];
    this.svFiles.forEach((file) => {
      let inTestbench: boolean = file === this.configForm.controls['testbenchFile'].value;
      let inModules: boolean = this.configForm.controls['modulesArray'].value.includes(file);
      if (!inTestbench && !inModules) {
        this.topmoduleAvailableFiles.push(file);
      }
    });
    this.svFiles.forEach((file) => {
      let inTopmodule: boolean = file === this.configForm.controls['topModuleFile'].value;
      let inModules: boolean = this.configForm.controls['modulesArray'].value.includes(file);
      if (!inTopmodule && !inModules) {
        this.testbenchAvailableFiles.push(file);
      }
    });
    this.svFiles.forEach((file) => {
      let inTopmodule: boolean = file === this.configForm.controls['topModuleFile'].value;
      let inTestbench: boolean = file === this.configForm.controls['testbenchFile'].value;
      if (!inTopmodule && !inTestbench) {
        this.otherAvailableFiles.push(file);
      }
    });
  }

  ngOnInit(): void {
    this.dumpWaveform = false;
    this.refreshFileList();


  }

  ngAfterViewInit() {

    this.httpClient.get<RepoSimulationConfigurationDto>(environment.baseUrl + `/repos/${this.repoService.currentRepoUuid}/simulation-configuration`).subscribe(
      data => {
        this.refreshFileList();
        // console.log(data);
        // console.log(data.testbench_file);
        //this.configForm.controls['testbenchFile'].setValue("fghdfghdf");
        this.configForm.controls['selectedSimulator'].setValue(data.simulator);
        this.configForm.controls['topModuleFile'].setValue(data.top_module_file);
        this.configForm.controls['testbenchFile'].setValue(data.testbench_file);
        //this.configForm.controls['outputFile'].setValue(data.output_filename);
        //this.configForm.controls['outputFolder'].setValue(data.output_folder);
        //this.configForm.controls['moduleFiles'].setValue(data.use_all_design_files);
        this.configForm.controls['selectedFilesAction'].setValue(data.selected_files_action);
        this.configForm.controls['dumpWaveform'].setValue(data.dump_waveform);
        //this.configForm.controls['waveformOutputFile'].setValue(data.dump_waveform_filename);
        //this.configForm.controls['dumpLevel'].setValue(data.dump_level);
        this.configForm.controls['modulesArray'].setValue(data.dump_modules.split(' ').map(f => f.substring(1, f.length - 1)));

        //this.updateFileSelectionFields();
      },
      error => {

      }
    );
    //this.updateFileSelectionFields();
  }

  public async selectTestbenchFile() {
    const files = await this.context.getHierarchicalData();
    const response = this.dialog.open(ModalSelectFileComponent, {
      width: "500px",
      data: files,
      panelClass: "darkmode-dialog"
    });
    const testbenchFile = await response.afterClosed().toPromise();
    this.configForm.get('testbenchFile').setValue(testbenchFile.filename);
  }

  public async selectModulesFiles() {
    const files = await this.context.getHierarchicalData();
    const response = this.dialog.open(ModalMultiselectFilesComponent, {
      width: "500px",
      data: {
        files,
        selected: this.configForm.get('modulesArray').value
      },
      panelClass: "darkmode-dialog"
    });
    const ret = await response.afterClosed().toPromise();
    this.configForm.get('modulesArray').setValue(ret.files);
  }

  public async selectTopModuleFile() {
    const files = await this.context.getHierarchicalData();
    const response = this.dialog.open(ModalSelectFileComponent, {
      width: "500px",
      data: files,
      panelClass: "darkmode-dialog"
    });
    const topModuleFile = await response.afterClosed().toPromise();
    this.configForm.get('topModuleFile').setValue(topModuleFile.filename);
  }

  public async selectOutputFolder() {
    const files = await this.context.getHierarchicalData();
    const response = this.dialog.open(ModalSelectFolderComponent, {
      width: '500px',
      data: files,
      panelClass: "darkmode-dialog"
    });
    const outputFolder = await response.afterClosed().toPromise();
    this.configForm.get('outputFolder').setValue(outputFolder.filename);
  }

  public async onSaveClick() {
    if (this.configForm.valid) {
      // load template
      // console.log(this.configForm.value);
      // return;
      // let modules = this.getModulesFiles(this.context.getHierarchicalData()).filter(e => e != this.configForm.value['testbenchFile']).map(e => "\t\t\t'" + e + "'");
      // let modules_str = "";
      // if (this.configForm.value['moduleFiles']) {
      //   if (modules.length > 1) {
      //     modules_str = modules.join(";");
      //   } else if (modules.length == 1) {
      //     modules_str = modules[0];
      //   } else {
      //     this.snackBar.open("No modules files found!", null, {
      //       verticalPosition: 'bottom',
      //       horizontalPosition: "left",
      //       duration: 5000
      //     });
      //     return;
      //   }
      // }

      // const formData = {
      //   simulator: this.configForm.value['selectedSimulator'].toUpperCase(),
      //   use_all_design_files: this.configForm.value['moduleFiles'],
      //   top_module_file: this.configForm.value['topModuleFile'],
      //   testbench_file: this.configForm.value['testbenchFile'],
      //   output_folder: this.configForm.value['outputFolder'],
      //   output_filename: this.configForm.value['outputFile'],
      //   dump_waveform: this.configForm.value['dumpWaveform'],
      //   dump_waveform_filename: this.configForm.value['waveformOutputFile'] == null ? '' : this.configForm.value['waveformOutputFile'],
      //   dump_level: this.configForm.value['dumpLevel'],
      //   dump_modules: modules_str
      // }

      const formData = {
        simulator: this.configForm.value['selectedSimulator'].toUpperCase(),
        use_all_design_files: false,
        top_module_file: this.configForm.value['topModuleFile'],
        testbench_file: this.configForm.value['testbenchFile'],
        selected_files_action: this.configForm.value['selectedFilesAction'],
        output_folder: '-',
        output_filename: '-',
        dump_waveform: this.configForm.value['dumpWaveform'],
        dump_waveform_filename: '-',
        dump_level: '1',
        dump_modules: this.configForm.value['modulesArray'].filter(f => f.length > 0).map(f => '"' + f + '"').join(' ')
      }

      const req2 = await this.httpClient.patch(environment.baseUrl + '/repos/' + this.repoService.currentRepoUuid + '/simulation-configuration', formData).toPromise();

      this._editorTabsService.onSimulationConfigSave.next();
      //console.log(req2);

      // if (this.configForm.value['selectedSimulator'] == 'iverilog') {
      //   const waveformOutputFile = this.configForm.value['waveformOutputFile'];
      //   const dumpLevel = this.configForm.value['dumpLevel'];
      //   const modulesArray = this.configForm.value['modulesArray'];
      //
      //   this.setWaveformDump(this.configForm.value['testbenchFile'], waveformOutputFile, dumpLevel, modulesArray, this.configForm.value['dumpWaveform']);
      // }
      /*

      var modules = this.getModulesFiles(this.context.getHierarchicalData()).filter(e => e != this.configForm.value['testbenchFile']).map(e => "\t\t\t'" + e + "'");

      var generatedMakefile: string = await this.httpClient.get(`assets/makefiles/${this.configForm.value['selectedSimulator']}`, {responseType: 'text'}).toPromise();
      generatedMakefile = generatedMakefile.replace('{TOP_MODULE}', '\'' + this.configForm.value['topModuleFile'] + '\'');
      generatedMakefile = generatedMakefile.replace('{TESTBENCH}', '\'' + this.configForm.value['testbenchFile'] + '\'');
      generatedMakefile = generatedMakefile.replace('{OUTPUT_FOLDER}', this.configForm.value['outputFolder']);
      generatedMakefile = generatedMakefile.replace('{OUTPUT_FILE}', this.configForm.value['outputFile']);
      generatedMakefile = generatedMakefile.replace('{BASE_URL}', environment.baseUrl);
      generatedMakefile = generatedMakefile.replace('{WAVEFORM_FILE}', this.configForm.value['waveformOutputFile'] == null ? '' : this.configForm.value['waveformOutputFile']);
      if (this.configForm.value['moduleFiles']) {
        if (modules.length > 1) {
          generatedMakefile = generatedMakefile.replace('{MODULES}', "\n" + modules.join(" \\\n"));
        } else if (modules.length == 1) {
          generatedMakefile = generatedMakefile.replace('{MODULES}', modules[0]);
        } else {
          this.snackBar.open("No modules files found!", null, {
            verticalPosition: 'bottom',
            horizontalPosition: "left",
            duration: 5000
          });
          return;
        }
      }

      if (this.configForm.value['selectedSimulator'] == 'iverilog') {
        const waveformOutputFile = this.configForm.value['waveformOutputFile'];
        const dumpLevel = this.configForm.value['dumpLevel'];
        const modulesArray = this.configForm.value['modulesArray'];

        this.setWaveformDump(this.configForm.value['testbenchFile'], waveformOutputFile, dumpLevel, modulesArray, this.configForm.value['dumpWaveform']);
      }

      this.updateOrCreateFile("Makefile", generatedMakefile);*/

      this.snackBar.open("Configuration was successfully saved!", null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        duration: 3000
      })
    } else {
      this.snackBar.open('Makefile could not been created! Check error messages', "OK", {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    }
  }

  public onCheckedDumpWaveform() {
    this.dumpWaveform = !this.dumpWaveform;
    const waveformOutputFile = this.configForm.get('waveformOutputFile');
    const dumpLevel = this.configForm.get('dumpLevel');
    const modulesArray = this.configForm.get('modulesArray');

    const currentLevel = this.configForm.get('dumpLevel').value;

    if (this.dumpWaveform) {
      waveformOutputFile.setValidators([Validators.required, Validators.pattern("(.*)\.vcd")])
      waveformOutputFile.enable();

      dumpLevel.setValidators([Validators.pattern("^[0-9]*$")])
      dumpLevel.enable();

      if (currentLevel.length > 0) {
        modulesArray.setValidators([Validators.required, Validators.pattern("^[0-9a-zA-Z_\-]+(,[0-9a-zA-Z_\-]+)*$")])
      } else {
        modulesArray.setValidators([Validators.pattern("^[0-9a-zA-Z_\-]+(,[0-9a-zA-Z_\-]+)*$")])
      }
      modulesArray.enable();
    } else {
      waveformOutputFile.setValidators([]);
      waveformOutputFile.disable();

      dumpLevel.setValidators([]);
      dumpLevel.disable();

      modulesArray.setValidators([]);
      modulesArray.disable();
    }
  }

  public async onSimulatorChange() {

    if(this.configForm.value['selectedSimulator'].toUpperCase() === 'VERILATOR_T'){
      const dialogRef = this.dialog.open(ModalStartSimulationWithTranspilationComponent, {
        data: {message: 'You are about to run simulation using transpilation from SV/V testbench to C++ testbench that is required by Verilator.\n' +
            'Be cautions as the transpilation may introduce errors/unexpected behaviour. You can run simulation in Verilator using your own C++ testbench'},
        width: 'auto'
      });
      const result = await dialogRef.afterClosed().toPromise();
    }

    const waveformOutputFile = this.configForm.get('waveformOutputFile');
    const dumpLevel = this.configForm.get('dumpLevel');
    const modulesArray = this.configForm.get('modulesArray');
    const dumpWaveform = this.configForm.get('dumpWaveform');

    const currentLevel = this.configForm.get('dumpLevel').value.toString();



    if (this.configForm['simulator'] == 'iverilog') {
      waveformOutputFile.setValidators([Validators.required, Validators.pattern("(.*)\.vcd")])
      waveformOutputFile.enable();

      dumpLevel.setValidators([Validators.pattern("^[0-9]*$")])
      dumpLevel.enable();

      if (currentLevel.length > 0) {
        modulesArray.setValidators([Validators.required, Validators.pattern("^[0-9a-zA-Z_\-]+(,[0-9a-zA-Z_\-]+)*$")])
      } else {
        modulesArray.setValidators([Validators.pattern("^[0-9a-zA-Z_\-]+(,[0-9a-zA-Z_\-]+)*$")])
      }
      modulesArray.enable();

      dumpWaveform.enable();
    } else {
      waveformOutputFile.setValidators([]);
      waveformOutputFile.disable();

      dumpLevel.setValidators([]);
      dumpLevel.disable();

      modulesArray.setValidators([]);
      modulesArray.disable();

      this.dumpWaveform = false;
      dumpWaveform.setValue(this.dumpWaveform);
      dumpWaveform.disable();
    }
  }

  public onLevelChange() {
    const currentLevel = this.configForm.get('dumpLevel').value.toString();
    const modulesArray = this.configForm.get('modulesArray');

    if (currentLevel.length > 0) {
      modulesArray.setValidators([Validators.required, Validators.pattern("^[0-9a-zA-Z_\-]+(,[0-9a-zA-Z_\-]+)*$")])
      modulesArray.updateValueAndValidity();
    } else {
      modulesArray.setValidators([Validators.pattern("^[0-9a-zA-Z_\-]+(,[0-9a-zA-Z_\-]+)*$")])
      modulesArray.updateValueAndValidity();
    }
  }

  public onFormReset() {
    this.dumpWaveform = false;

    this.configForm.get('waveformOutputFile').disable();
    this.configForm.get('dumpLevel').disable();
    this.configForm.get('modulesArray').disable();
  }

  private async setWaveformDump(testbench: string, filename: string, level: string, modules: string, exportWaveform: boolean) {
    const rootNode = this.context.getHierarchicalData()[0];
    const newId: string = `${rootNode.id}/${testbench}?${this.context.myGit}`;

    const dumpfileRegex = /\$dumpfile\(.*\);/i;
    const dumpvarsRegex = /\$dumpvars(.*);/i;

    var testbenchFileContent = await this.collabService.getDocContents(newId);

    if (exportWaveform) {
      const dumpfile = `$dumpfile("${filename}");`;
      const dumpvars = level == '' && modules == '' ? `$dumpvars;` :
        level == '' && modules != '' ? `$dumpvars(0, ${modules});` :
          `$dumpvars(${level}, ${modules});`;

      if (testbenchFileContent.search(dumpfileRegex) == -1 && testbenchFileContent.search(dumpvarsRegex) == -1) {
        if (testbenchFileContent.search('endmodule') == -1) {
          this.snackBar.open('Waveform dump could not be set, check your testbench file!', "OK", {
            duration: 3000,
            verticalPosition: "bottom",
            horizontalPosition: 'left'
          })
        } else {
          testbenchFileContent = testbenchFileContent.replace('endmodule', `// Autogenerated waveform dump\ninitial\nbegin\n\t${dumpfile}\n\t${dumpvars}\nend\n\nendmodule`)
        }

      } else {
        if (testbenchFileContent.search(dumpfileRegex) != -1) {
          // dumpfile enabled
          testbenchFileContent = testbenchFileContent.replace(dumpfileRegex, dumpfile)
        } else {
          testbenchFileContent = testbenchFileContent.replace(dumpvarsRegex, dumpfile + " " + dumpvars)

        }

        if (testbenchFileContent.search(dumpvarsRegex) != -1) {
          // dumpvars enabled
          testbenchFileContent = testbenchFileContent.replace(dumpvarsRegex, dumpvars)
        } else {
          testbenchFileContent = testbenchFileContent.replace(dumpfileRegex, dumpfile + " " + dumpvars)
        }
      }
    } else {
      // Disable waveform export

      testbenchFileContent = testbenchFileContent.replace(dumpfileRegex, '');
      testbenchFileContent = testbenchFileContent.replace(dumpvarsRegex, '');
    }

    this.collabService.createOrUpdateDocument(newId, testbenchFileContent, this.repoService.currentRepoUuid, this.context.myGit);
  }

  private getFilePath(file: FileTreeNode): string {
    const filepathArray = file.id.split("/");
    filepathArray.shift();
    filepathArray[filepathArray.length - 1] = filepathArray[filepathArray.length - 1].split("?")[0];

    return filepathArray.join("/");
  }

  private getModulesFiles(data: FileTreeNode[]): string[] {
    var modules = [];
    data.forEach((e) => {
      if (e.isFile) {
        if (e.displayName.endsWith(".v") || e.displayName.endsWith(".sv")) {
          const filename = this.getFilePath(e);
          modules = modules.concat(filename);
        }
      } else {
        const files = this.getModulesFiles(e.subChild);
        modules = modules.concat(files);
      }
    });

    return modules;
  }

  private updateOrCreateFile(filename: string, content: string) {
    const newDisplayName: string = filename;
    const file = true;
    const rootNode = this.context.getHierarchicalData()[0];
    const newId: string = `${rootNode.id}/${newDisplayName}?${this.context.myGit}`;
    const newName: string = `${rootNode.name}/${newDisplayName}?${this.context.myGit}`;
    const func: (newId: string) => boolean = file
      ? this.context.fileExists
      : this.context.folderExists;
    if (!func(newId)) {
      const docKey: string = file ? "files" : "emptyFolders";
      this.context.treeObj.addNodes(
        [
          new FileTreeNode(
            newId,
            newName,
            newDisplayName,
            [],
            file,
            false
          ),
        ],
        rootNode.id
      );
      this.context.repoMetadataDoc.submitOp({
        p: [docKey, this.context.myGit, 0],
        li: newId,
      });
      if (file) {
        this.collabService.createDocument(
          newId,
          content
        );
      }
      this.context.editEmptyDirectories(rootNode.id);
    } else {
      this.collabService.createOrUpdateDocument(newId, content, this.repoService.currentRepoUuid, this.context.myGit);
    }
  }
}
