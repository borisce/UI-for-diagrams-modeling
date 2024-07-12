import { Component, Inject, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FilesService } from "src/app/core/fileSystem/Filer/files.service";
import { ZipSingleTaskInterface } from "src/app/core/fileSystem/ZipWorker/zip-single-task.interface";
import { ZipService } from "src/app/core/fileSystem/ZipWorker/zip.service";
import { Repository } from "src/app/api/models/repository";
import { RepositoryService } from "src/app/core/service/repository.service";
import { EditorComponentComponent } from "src/app/modules/editor/editor-component/editor-component.component";
import {
  onMonacoLoaded,
  onMonacoLoadObservable,
} from "src/app/modules/editor/monacoOnLoad";
import { AuthenticationService } from "src/app/core/service";
import { EducationService } from "src/app/core/service/education.service";

@Component({
  selector: "app-modal-create-assignment",
  templateUrl: "./modal-create-assignment.component.html",
  styleUrls: ["./modal-create-assignment.component.scss"],
})
export class ModalCreateAssignmentComponent implements OnInit {
  public createAssignment: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;
  public actualDateTime: string;
  public zipTasks: Array<ZipSingleTaskInterface> =
    new Array<ZipSingleTaskInterface>();
  public context = EditorComponentComponent;
  public repositories: Repository[];
  public testNumberIndex = 2;

  public testBenchFile: any;
  public documentationFile: File;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalCreateAssignmentComponent>,
    private fileService: FilesService,
    private zipWorker: ZipService,
    private repositoryService: RepositoryService,
    private authenticationService: AuthenticationService,
    private educationService: EducationService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    onMonacoLoadObservable.subscribe(() => {
      onMonacoLoaded(null, null, null, null, null, null);
    });
  }

  get f(): any {
    return this.createAssignment.controls;
  }

  get total(): number {
    return (
      this.f.descriptionPoints.value +
      this.f.simulation.value +
      this.f.code.value
    );
  }

  public async ngOnInit() {
    this.getRepos();

    let actualDate = new Date();
    this.actualDateTime = actualDate.toISOString().substring(0, 16);

    this.createAssignment = this.formBuilder.group({
      name: ["", Validators.required],
      dueDate: [this.actualDateTime, Validators.required],
      description: ["", Validators.required],
      descriptionPoints: [0, Validators.required],
      simulation: [
        { value: 0, disabled: true },
        [Validators.required, Validators.min(1)],
      ],
      code: [0, Validators.required],
      topModuleFile: ["main", Validators.required],
      filesCheckbox: [false],
      simulationFiles: [[]],
    });

    this.setValueChangedForFormGroup();
  }

  public async onSubmit() {
    this.submitted = true;
    if (this.checkTestFroms() && this.createAssignment.valid) {
      const isFilesChecked = this.f.filesCheckbox.value;
      const assignmentForm = await this.createAssignmentFrom(isFilesChecked);

      await this.educationService
        .createNewAssignment(this.data.uuid, assignmentForm)
        .toPromise()
        .then(async (newAssignment: any) => {
          let i = 0;
          for (const studentRepo of newAssignment.repoList) {
            // Updating files for student repository
            this.setRepositoryForCollab(studentRepo);
            await this.setFiles(studentRepo);
            await this.zipFiles();
            await this.repositoryService
              .updateAuthor(studentRepo.uuid, this.data.students[i].user.uuid)
              .toPromise();
            localStorage.removeItem("myDir");
            i++;
          }

          const file = new FormData();
          file.append("file", this.documentationFile);

          await this.educationService
            .createAssignmentDescription(
              this.data.uuid,
              file,
              newAssignment.uuid
            )
            .toPromise()
            .then((data) => {});
          this.dialogRef.close(newAssignment);
        });
    }
  }

  async updateChonesFiles(simFileForm) {
    this.setRepositoryForCollab(simFileForm.repository.value);
    await this.zipWorker.zipEntries([
      {
        data: {
          fileName: "//" + simFileForm.testBenchFile.value.path,
          text: simFileForm.tbFileCode.value,
        },
      },
    ]);
  }

  async createAssignmentFrom(includeFiles) {
    let simulationConfigurationForm = [];

    if (includeFiles) {
      for (let i = 0; i < this.f.simulationFiles.value.length; i++) {
        const simFileFrom = this.f.simulationFiles.value[i];
        if (simFileFrom.enabled) {
          simulationConfigurationForm.push({
            simulator: "IVERILOG",
            use_all_design_files: false,
            top_module_file: this.f.topModuleFile.value,
            testbench_file: simFileFrom.controls.testBenchFile.value.path,
            selected_files_action: "exclude",
            output_folder: "-",
            output_filename: "-",
            dump_waveform: true,
            dump_waveform_filename: "-",
            dump_level: "1",
            dump_modules: "-",
            teacher_repo_uuid: simFileFrom.controls.repository.value.uuid,
            test_output: simFileFrom.controls.testOutput.value,
          });
          await this.updateChonesFiles(simFileFrom.controls);
        }
      }
    }

    return {
      name: this.f.name.value,
      dueDate: new Date(this.f.dueDate.value)
        .toISOString()
        .replace("Z", "+0000"),
      description: this.f.description.value,
      descriptionPoints: this.f.descriptionPoints.value,
      simulationPoints: this.f.simulation.value,
      codePoints: this.f.code.value,
      updateSimulationConfigurationForm: simulationConfigurationForm,
    };
  }

  public async zipFiles(): Promise<any> {
    // Get all files as zip Tasks.
    await this.getAllDirs("/");
    // Zip files and upload them to server
    await this.zipWorker.zipEntries(this.zipTasks);
    this.zipTasks = [];
  }

  public async getAllDirs(dirName: string): Promise<any> {
    await this.fileService.readDir(dirName).then(async (file) => {
      for (const singleFile of file) {
        // @ts-ignore
        const stats: any = await this.fileService.getStat(
          dirName + "/" + singleFile
        );
        if (stats.type === "dir") {
          // @ts-ignore
          this.zipTasks.push({
            data: { fileName: dirName + "/" + singleFile, text: null },
          });
          await this.getAllDirs(dirName + "/" + singleFile);
        } else {
          // @ts-ignore
          this.zipTasks.push({
            data: {
              fileName: dirName + "/" + singleFile,
              // @ts-ignore
              text: await this.fileService.readFiles(
                dirName + "/" + singleFile
              ),
            },
          });
        }
      }
    });
  }

  public async getRepos() {
    this.repositoryService
      .getRepos(this.authenticationService.currentUser.username, 0, 1000)
      .toPromise()
      .then((res: any) => {
        this.repositories = res.content;
      });
  }

  public onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // Here we use only the first file (single file)
    if (file.type.includes("pdf")) {
      this.documentationFile = file;
      this.createAssignment.patchValue({ description: file.name });
    }
  }

  public setRepositoryForCollab(repo: Repository) {
    this.repositoryService.currentRepo = repo;
    this.fileService.init();
  }

  public getAssignmentHeader() {
    return (
      (
        "Name: " +
        this.f.name.value +
        "\n" +
        "Due date: " +
        this.f.dueDate.value.toLocaleDateString("en-GB") +
        "\n\n" +
        "Description: \n" +
        this.f.description.value +
        "\n\nThis is the main file of this assignment and it should be not renamed or moved."
      )
        .split("\n")
        .map((line) => `// ${line}`)
        .join("\n") +
      `


module ${this.f.topModuleFile.value}();

endmodule : ${this.f.topModuleFile.value}
`
    );
  }

  public async setFiles(repo) {
    localStorage.setItem("myDir", "/temp_" + repo.name);
    await this.fileService.createDir("/temp_" + repo.name);
    await this.fileService.createDir("/temp_" + repo.name + "/src");
    await this.fileService.createDir("/temp_" + repo.name + "/sim");
    await this.fileService.createDir("/temp_" + repo.name + "/impl");
    await this.fileService.createDir("/temp_" + repo.name + "/doc");
    if (this.f.filesCheckbox) {
      await this.fileService.createFile(
        "/temp_" + repo.name + `/src/${this.f.topModuleFile.value}.sv`,
        this.getAssignmentHeader()
      );
    }
  }

  private setValueChangedForFormGroup() {
    this.createAssignment
      .get("filesCheckbox")
      .valueChanges.subscribe((checked) => {
        if (!checked) {
          // If checkbox is checked, disable other fields
          this.createAssignment.get("simulation").disable();
          this.testNumberIndex = 2;
          this.createAssignment.patchValue({ simulation: 0 });
        } else {
          // If checkbox is unchecked, enable other fields
          this.createAssignment.get("simulation").enable();
          this.createAssignment.patchValue({ simulation: 1 });
        }
      });
  }

  checkTestFroms() {
    let isValid = true;
    const simulationFilesForms = this.f.simulationFiles.value;
    for (let i = 0; i < simulationFilesForms.length; i++) {
      Object.values(simulationFilesForms[i].controls).forEach(
        (control: UntypedFormGroup) => {
          control.markAsTouched();
        }
      );
      if (!simulationFilesForms[i].valid && simulationFilesForms[i].enabled) {
        isValid = false;
      }
    }
    return isValid;
  }

  addTest() {
    if (this.testNumberIndex > 1) {
      this.testNumberIndex = 2;
    }
    if (this.testNumberIndex < 1) {
      this.testNumberIndex = 1;
    }
    const simulationFiles = this.createAssignment
      .get("simulationFiles")
      .value.slice(); // Copy the current array
    simulationFiles[this.testNumberIndex].enable();
    this.testNumberIndex++;
  }

  removeTest() {
    if (this.testNumberIndex > 1) {
      this.testNumberIndex = 2;
    }
    if (this.testNumberIndex < 1) {
      this.testNumberIndex = 1;
    }
    const simulationFiles = this.createAssignment
      .get("simulationFiles")
      .value.slice();
    simulationFiles[this.testNumberIndex].disable(); // Copy the current array
    this.testNumberIndex--;
  }
}
