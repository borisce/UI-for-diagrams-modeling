import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Repository } from "src/app/api/models/repository";
import { CollabService } from "src/app/core/service/collab.service";

@Component({
  selector: "app-simulation-files-card",
  templateUrl: "./simulation-files-card.component.html",
  styleUrls: ["./simulation-files-card.component.scss"],
})
export class SimulationFilesCardComponent implements OnInit {
  @Input() repositories: Repository[];
  @Input() testNumber: number = 0;
  @Input() parentForm: UntypedFormGroup;

  public pointsFrom: UntypedFormGroup;
  public showTooltip: boolean = false;
  public showCode: string = "";
  public repoMetadataDoc: any;
  public allFiles: string[];
  public tbFileCode: string = "";

  constructor(
    private collabService: CollabService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.pointsFrom = this.formBuilder.group({
      filesCheckbox: [false],
      repository: ["", Validators.required],
      testBenchFile: ["", Validators.required],
      testOutput: ["", Validators.required],
      tbFileCode: [""],
    });

    this.pointsFrom.get("repository").valueChanges.subscribe(async (repo) => {
      if (repo) {
        await this.getAllRepoFiles(repo.uuid);
      }
    });

    this.pointsFrom
      .get("testBenchFile")
      .valueChanges.subscribe(async (path) => {
        let code = await this.collabService.getDocContents(path.fullPath);

        this.pointsFrom.controls.tbFileCode.patchValue(code);
      });

    this.pointsFrom.valueChanges.subscribe(() => {
      Object.values(this.pointsFrom.controls).forEach((control) => {
        control.markAsTouched();
      });

      Object.values(this.parentForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    });

    this.updateParentForm();
  }

  public async changeCode(fullPath) {
    this.showTooltip = true;
    this.showCode = await this.collabService.getDocContents(fullPath);
  }

  public async getAllRepoFiles(repoUuid: any) {
    this.repoMetadataDoc = await this.collabService.getRepoMetadataDoc(
      repoUuid
    );
    this.repoMetadataDoc.subscribe(async (err) => {
      await setTimeout(async () => {}, 500);
      this.allFiles = this.repoMetadataDoc.data.files.master.map((str) => {
        let splitArray = str.split("/");
        splitArray = splitArray.length > 1 ? splitArray.slice(1).join("/") : "";
        return { path: splitArray.split("?")[0], fullPath: str };
      });
    });
  }

  updateParentForm() {
    const newArray = this.parentForm.get("simulationFiles").value.slice(); // Copy the current array
    newArray[this.testNumber - 1] = this.pointsFrom; // Add a new element
    this.parentForm.get("simulationFiles").setValue(newArray);
  }
}
