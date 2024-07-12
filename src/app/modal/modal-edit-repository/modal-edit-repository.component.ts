import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RepositoryService } from '../../core/service/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-modal-edit-repository',
  templateUrl: './modal-edit-repository.component.html',
  styleUrls: ['./modal-edit-repository.component.scss']
})
/**
 * Modal for editing repostiory.
 */
export class ModalEditRepositoryComponent implements OnInit {

  public repoEditForm: UntypedFormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public returnUrl: string;
  public name: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private repositoryService: RepositoryService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModalEditRepositoryComponent>
  ) {
  }

  /**
   * Close modal
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Better access for form variables.
   */
  get f(): any {
    return this.repoEditForm.controls;
  }

  /**
   * Creating form for changing repo name.
   */
  public ngOnInit(): any {
    this.repoEditForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/editUser/repository';
  }

  /**
   * Update repo informactions.
   */
  public onSubmit(): any {
    this.submitted = true;

    if (this.repoEditForm.invalid) {
      return;
    }

    this.loading = true;
    this.repositoryService.updateRepo(this.name, this.repoEditForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.dialogRef.close();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        });
  }
}
