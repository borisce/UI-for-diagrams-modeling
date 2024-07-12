import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoreService} from "../../../../core/service/core.service";
import {CoreCategory} from "../../../../core/model/core-category";
import {RepositoryService} from "../../../../core/service/repository.service";
import {Repository} from "../../../../api/models/repository";
import {RepoModule} from "../../../../core/model/repo-module";
import {Core} from "../../../../core/model/core";
import {endsWithValidator} from "../validators/endsWith.validator";
import {AuthenticationService} from "../../../../core/service";
import {UUID} from "antlr4ts/misc/UUID";
import {StatusMessageService} from "../../../../core/service/status-message.service";

@Component({
  selector: 'app-core-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

export class MyCoreEditComponent implements OnInit {

  public core: Core;
  public coreForm: FormGroup;
  public loadingState: boolean = false;
  public loadingModulesState: boolean = true;
  public categories: CoreCategory[] = [];
  public repositories: Repository[] = [];
  public modules: RepoModule[] = [];
  public pdfDoc: File = null;
  public uuid: UUID;

  constructor(
    private router: Router,
    private coreService: CoreService,
    private repoService: RepositoryService,
    public authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private statusMessageService: StatusMessageService,
  ) {
    this.route.params.subscribe((params) => {
      if (this.uuid === null) {
        this.uuid = params.uuid;
      } else {
        if (params.uuid !== this.uuid) {
          this.uuid = params.uuid;
          this.getCoreDetail();
        }
      }
    });

    this.coreForm = this.fb.group({
      name: ['', Validators.required],
      short_description: ['', Validators.required],
      description: ['', Validators.required],
      category_uuid: ['', Validators.required],
      pdf_documentation: ['', endsWithValidator('.pdf')],
      price_without_updates: [0],
      price_with_updates: [0],
      upgrade_price: [''],
      active: [true],
      have_pdf_documentation: [false]
    }, {
      validator: this.priceValidator
    });
    this.coreForm.get('price_with_updates').valueChanges.subscribe(() => this.priceChange());
    this.coreForm.get('price_without_updates').valueChanges.subscribe(() => this.priceChange());

  }

  public async ngOnInit(): Promise<void> {
    this.getCategories();
    this.getCoreDetail();
  }

  public async updateCore(e: Event): Promise<void> {
    e.preventDefault();
    this.loadingState = true;
    this.coreService.updateCore(this.uuid, {
      name: this.coreForm.value.name,
      description: this.coreForm.value.description,
      short_description: this.coreForm.value.short_description,
      category_uuid: this.coreForm.value.category_uuid,
      price_without_updates: this.coreForm.value.price_without_updates || 0,
      price_with_updates: this.coreForm.value.price_with_updates || 0,
      upgrade_price: this.coreForm.value.upgrade_price || 0,
      active: this.coreForm.value.active,
      pdf_documentation: this.pdfDoc !== null ? this.pdfDoc : null,
      remove_pdf_documentation: this.coreForm.value.have_pdf_documentation === false
        && this.pdfDoc === null
    }).subscribe((c: Core) => {
      this.core = c;
      this.loadingState = false;
      this.statusMessageService.addSuccess('Changes saved.');
    }, (error) => {
      this.loadingState = false;
      this.statusMessageService.addError(error);
    });
  }

  public async updateCoreAndGoBack(): Promise<void> {
    this.loadingState = true;
    this.coreService.updateCore(this.uuid, {
      name: this.coreForm.value.name,
      description: this.coreForm.value.description,
      short_description: this.coreForm.value.short_description,
      category_uuid: this.coreForm.value.category_uuid,
      price_without_updates: this.coreForm.value.price_without_updates || 0,
      price_with_updates: this.coreForm.value.price_with_updates || 0,
      upgrade_price: this.coreForm.value.upgrade_price || 0,
      active: this.coreForm.value.active,
      pdf_documentation: this.pdfDoc !== null ? this.pdfDoc : null,
      remove_pdf_documentation: this.coreForm.value.have_pdf_documentation === false
        && this.pdfDoc === null
    }).subscribe((c: Core) => {
      this.core = c;
      this.loadingState = false;
      this.statusMessageService.addSuccess('Changes saved.');
      this.router.navigate(['/cores/my']);
    }, (error) => {
      this.loadingState = false;
      this.statusMessageService.addError(error);
    });
  }

  public getCategories(): void {
    this.coreService.getCategories().subscribe((c: CoreCategory[]) => {
      this.categories = c;
    }, (error) => {
      this.statusMessageService.addError(error);
    });
  }

  public getCoreDetail(): void {
    this.loadingState = true;
    this.coreService.getMyCore(this.uuid)
      .subscribe((c: Core) => {
        this.core = c;
        this.coreForm.patchValue({
          name: this.core.name,
          description: this.core.description,
          short_description: this.core.short_description,
          category_uuid: this.core.category.uuid,
          price_without_updates: this.core.price_without_updates || '',
          price_with_updates: this.core.price_with_updates || '',
          upgrade_price: this.core.upgrade_price || '',
          active: this.core.active,
          have_pdf_documentation: this.core.have_pdf_documentation
        });
        this.loadingState = false;
      }, (error) => {
        this.loadingState = false;
        this.statusMessageService.addError(error);
      });
  }

  public pdfDocFileChanged(e: Event): void {
    this.pdfDoc = (e.target as HTMLInputElement).files[0];
  }

  public clearPdfDocFile(): void {
    this.pdfDoc = null;
    this.coreForm.patchValue({
      have_pdf_documentation: false,
      pdf_documentation: ''
    });
  }

  public isFormInvalid(): boolean {
    return this.coreForm.invalid
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
}
