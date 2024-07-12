import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Core} from "../../core/model/core";
import {CoreService} from "../../core/service/core.service";
import {CoreVersion} from "../../core/model/core-version";
import {Page} from "../../core/model/page";
import {StatusMessageService} from "../../core/service/status-message.service";

@Component({
  selector: 'app-modal-edit-core-version',
  styleUrls: ['./modal-edit-core-version.component.scss'],
  templateUrl: './modal-edit-core-version.component.html'
})
export class ModalEditCoreVersionComponent implements OnInit {
  public form: FormGroup;
  public loadingState: boolean = false;
  public coreVersions: CoreVersion[] = null;
  public error: string = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditCoreVersionComponent>,
    public coreService: CoreService,
    private statusMessageService: StatusMessageService,
    @Inject(MAT_DIALOG_DATA) public data: {
      core: Core,
      coreVersion: CoreVersion
    }
  ) {
    const [major, minor, patch]: string[] =
      data.coreVersion.version_number.split('.');
    this.form = this.fb.group({
      major: [major, Validators.required],
      minor: [minor, Validators.required],
      patch: [patch, Validators.required],
      changelog: [data.coreVersion.change_log],
      active: [data.coreVersion.active, Validators.required],
    });
  }


  public async ngOnInit(): Promise<void> {
    this.coreService.getMyCoreVersions(this.data.core.uuid, 0, 9999)
      .subscribe((page: Page<CoreVersion>) => {
          this.coreVersions = page.content;
          if (this.coreVersions.length === 1 ||
            this.coreVersions[0].uuid !== this.data.coreVersion.uuid) {
            this.form.controls['major'].clearValidators();
            this.form.controls['minor'].clearValidators();
            this.form.controls['patch'].clearValidators();
          }
        },
        (error) => {
          this.statusMessageService.addError(error);
          this.dialogRef.close(undefined);
        });
  }

  public isVersionGreater(): boolean {
    if (this.coreVersions.length > 1) {
      const parts: string[] = this.coreVersions[1].version_number.split('.');
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
    return false;
  }

  public async onSubmit(): Promise<void> {
    if (this.form.invalid ||
      (this.data.coreVersion.version_number !== '1.0.0' && !this.isVersionGreater())) {
      return;
    }
    this.loadingState = true;
    this.coreService.updateCoreVersion(
      this.data.core.uuid,
      this.data.coreVersion.uuid,
      {
        major: parseInt(this.form.value.major, 10),
        minor: parseInt(this.form.value.minor, 10),
        patch: parseInt(this.form.value.patch, 10),
        change_log: this.form.value.changelog,
        active: this.form.value.active,
      }
    ).subscribe((cv: CoreVersion) => {
      this.loadingState = false;
      this.statusMessageService.addSuccess(`Core version ${cv.version_number} has been updated.`);
      this.dialogRef.close(cv);
    }, (e) => {
      this.loadingState = false;
      this.error = e;
    });
  }

  public closeDialog(e: MouseEvent): void {
    e.preventDefault();
    this.dialogRef.close(undefined);
  }
}
