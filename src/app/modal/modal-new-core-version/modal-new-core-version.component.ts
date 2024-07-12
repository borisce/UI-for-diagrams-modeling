import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Core} from "../../core/model/core";
import {CoreService} from "../../core/service/core.service";
import {CoreVersion} from "../../core/model/core-version";
import {StatusMessageService} from "../../core/service/status-message.service";
import {UUID} from "antlr4ts/misc/UUID";

@Component({
  selector: 'app-modal-new-core-version',
  styleUrls: ['./modal-new-core-version.component.scss'],
  templateUrl: './modal-new-core-version.component.html'
})
export class ModalNewCoreVersionComponent {
  public form: FormGroup;
  public core: Core = null;
  public error: string = null;
  public loadingState: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalNewCoreVersionComponent>,
    public coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: { coreUuid: UUID },
    private statusMessageService: StatusMessageService,
  ) {
    this.form = this.fb.group({
      major: ['', Validators.required],
      minor: ['', Validators.required],
      patch: ['', Validators.required],
      changelog: [''],
      active: [true, Validators.required],
    });
    this.getCoreDetail();
  }

  public isVersionGreater(): boolean {
    const parts: string[] = this.core.latest_version.version_number.split('.');
    const major: number = parseInt(parts[0], 10);
    const minor: number = parseInt(parts[1], 10);
    const patch: number = parseInt(parts[2], 10);
    const majorV: number = parseInt(this.form.value.major, 10);
    const minorV: number = parseInt(this.form.value.minor, 10);
    const patchV: number = parseInt(this.form.value.patch, 10);
    if (majorV < major) {
      return false;
    } else if (majorV === major) {
      if (minorV < minor) {
        return false;
      } else if (minorV === minor) {
        if (patchV <= patch) {
          return false;
        }
      }
    }
    return true;
  }

  public async onSubmit(): Promise<void> {
    if (this.form.invalid || !this.isVersionGreater()) {
      return;
    }
    this.error = null;
    this.loadingState = true;
    this.coreService.createCoreVersion(
      this.core.uuid,
      {
        major: parseInt(this.form.value.major, 10),
        minor: parseInt(this.form.value.minor, 10),
        patch: parseInt(this.form.value.patch, 10),
        change_log: this.form.value.changelog,
        active: this.form.value.active,
      }
    )
      .subscribe((cv: CoreVersion) => {
          this.loadingState = false;
          this.statusMessageService
            .addSuccess(`Core version ${cv.version_number} has been created.`);
          this.dialogRef.close(true);
        },
        (e) => {
          this.loadingState = false;
          this.error = e;
        });
  }

  public getCoreDetail(): void {
    this.coreService.getMyCore(this.data.coreUuid)
      .subscribe((c: Core) => {
        this.core = c;
        const [major, minor, patch]: string[] =
          this.core.latest_version.version_number.split('.');
        this.form.patchValue({
          major: parseInt(major, 10),
          minor: parseInt(minor, 10),
          patch: parseInt(patch, 10) + 1,
          changelog: '',
          active: true,
        });
      }, (error) => {
        this.statusMessageService.addError(error);
      });
  }

  public closeDialog(e: MouseEvent): void {
    e.preventDefault();
    this.dialogRef.close(undefined);
  }
}
