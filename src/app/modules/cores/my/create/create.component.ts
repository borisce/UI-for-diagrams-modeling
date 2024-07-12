import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoreService} from "../../../../core/service/core.service";
import {CoreCategory} from "../../../../core/model/core-category";
import {RepositoryService} from "../../../../core/service/repository.service";
import {Repository} from "../../../../api/models/repository";
import {Page} from "../../../../core/model/page";
import {RepoModule} from "../../../../core/model/repo-module";
import {Core} from "../../../../core/model/core";
import {endsWithValidator} from "../validators/endsWith.validator";
import {AuthenticationService} from "../../../../core/service";
import {StatusMessageService} from "../../../../core/service/status-message.service";
import {OrganizationService} from "../../../../core/service/organization.service";

@Component({
  selector: 'app-core-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})

export class CoreCreateComponent implements OnInit {

  public coreForm: FormGroup;
  public loadingState: boolean = false;
  public loadingModulesState: boolean = true;
  public categories: CoreCategory[] = [];
  public repositories: Repository[] = [];
  public modules: RepoModule[] = [];
  public pdfDoc: File = null;

  constructor(
    private repositoryService: RepositoryService,
    private router: Router,
    private coreService: CoreService,
    private repoService: RepositoryService,
    public authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private statusMessageService: StatusMessageService,
    private organizationService: OrganizationService,
  ) {

    this.coreForm = this.fb.group({
      name: ['', Validators.required],
      top_module: ['', Validators.required],
      short_description: ['', Validators.required],
      description: ['', Validators.required],
      repository_uuid: ['', Validators.required],
      category_uuid: ['', Validators.required],
      pdf_documentation: ['', endsWithValidator('.pdf')],
      price_without_updates: [''],
      price_with_updates: [''],
      upgrade_price: [0],
      active: [true],
      create_as_organization: [false]
    }, {
      validator: this.priceValidator
    });
    this.coreForm.get('create_as_organization')
      .valueChanges.subscribe(() => this.createAsOrgChange());
    this.coreForm.get('price_with_updates').valueChanges.subscribe(() => this.priceChange());
    this.coreForm.get('price_without_updates').valueChanges.subscribe(() => this.priceChange());

    if (typeof this.repositoryService.currentRepoUuid === 'string') {
      this.coreForm.controls['repository_uuid'].setValue(this.repositoryService.currentRepoUuid);
      this.updateModules();
    }
  }

  public ngOnInit(): void {
    this.getCategories();
    this.getRepositories();
  }

  public createCore(e: Event): void {
    e.preventDefault();
    this.loadingState = true;
    this.coreService.createCore({
      name: this.coreForm.value.name,
      top_module: this.coreForm.value.top_module,
      description: this.coreForm.value.description,
      short_description: this.coreForm.value.short_description,
      repository_uuid: this.coreForm.value.repository_uuid,
      category_uuid: this.coreForm.value.category_uuid,
      price_without_updates: this.coreForm.value.price_without_updates || 0,
      price_with_updates: this.coreForm.value.price_with_updates || 0,
      upgrade_price: this.coreForm.value.upgrade_price || 0,
      active: this.coreForm.value.active,
      create_as_organization: this.coreForm.value.create_as_organization,
      pdf_documentation: this.pdfDoc !== null ? this.pdfDoc : null
    }).subscribe((c: Core) => {
      this.loadingState = false;
      this.coreForm.reset();
      this.statusMessageService.addSuccess(`Core "${c.name}" has been created.`);
      this.router.navigate(['/cores/my']);
    }, (error) => {
      this.loadingState = false;
      this.statusMessageService.addError(error);
    });
  }

  public getCategories(): void {
    this.coreService.getCategories().subscribe((cats: CoreCategory[]) => {
      this.categories = cats;
      this.coreForm.patchValue({
        category_uuid: this.categories[0].uuid
      });
    }, (error) => {
      this.statusMessageService.addError(error);
    });
  }

  public getRepositories(): void {
    if (this.coreForm.controls['create_as_organization'].value) {
      this.organizationService.getOrganizationRepos(0, 9999)
        .subscribe(
          (page: Page<Repository>) => {
            this.repositories = page.content;
          },
          (error) => {
            this.statusMessageService.addError(error);
          }
        );
    } else {
      this.repoService.getAssociatedRepos(0, 9999).subscribe((page: Page<Repository>) => {
        this.repositories = page.content;
      }, (error) => {
        this.statusMessageService.addError(error);
      });
    }
  }

  public updateModules(): void {
    this.loadingModulesState = true;
    this.repoService
      .getRepositoryModules(this.coreForm.value['repository_uuid'])
      .subscribe((mods: RepoModule[]) => {
        this.modules = mods;
        this.loadingModulesState = false;
      }, (error) => {
        this.loadingModulesState = false;
        this.statusMessageService.addError(error);
      });
  }

  public pdfDocFileChanged(e: Event): void {
    this.pdfDoc = (e.target as HTMLInputElement).files[0];
  }

  public clearPdfDocFile(): void {
    this.pdfDoc = null;
    this.coreForm.patchValue({
      pdf_documentation: ''
    });
  }

  public isFormInvalid(): boolean {
    return this.modules.length === 0 || this.coreForm.invalid
      || this.loadingState
      || !(
        this.coreForm.controls['price_without_updates'].value > 0
        ||
        this.coreForm.controls['price_with_updates'].value > 0
      );
  }

  private priceChange(): void {
    if (this.coreForm.controls['price_without_updates'].value > 0
      &&
      this.coreForm.controls['price_with_updates'].value > 0) {
      this.coreForm.controls['upgrade_price']
        .addValidators([Validators.required, Validators.min(0.01)]);
    } else {
      this.coreForm.controls['upgrade_price'].clearValidators();
    }
  }

  private priceValidator(formGroup: FormGroup): any {
    const price_without_updates: number =
      parseFloat(formGroup.controls['price_without_updates'].value) || 0;
    const price_with_updates: number =
      parseFloat(formGroup.controls['price_with_updates'].value) || 0;
    if (formGroup.controls['price_without_updates'].touched || formGroup.controls['price_with_updates'].touched) {
      formGroup.controls['price_with_updates'].markAsTouched();
      formGroup.controls['price_without_updates'].markAsTouched();
      if (price_without_updates === 0 && price_with_updates === 0) {
        return {one_price_required: true};
      }
    }
    return null;
  }

  private createAsOrgChange(): any {
    this.coreForm.patchValue({
      top_module: '',
      repository_uuid: ''
    });
    this.getRepositories();
  }
}
