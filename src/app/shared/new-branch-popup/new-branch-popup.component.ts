import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-new-branch-popup",
  templateUrl: "./new-branch-popup.component.html",
  styleUrls: ["./new-branch-popup.component.scss"],
})
export class NewBranchPopupComponent {
  @Input() public visible: boolean = false;
  @Output() public onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onCreate: EventEmitter<void> = new EventEmitter<void>();

  public newBranchForm: any;
  public name: string = "";

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.newBranchForm = this.formBuilder.group({
      name: [this.name, Validators.required],
    });
  }

  public async onSubmit() {
    this.onCreate.emit(this.newBranchForm.value.name)
    this.newBranchForm.reset()
    this.onCancel.emit();
  }

  public onClose(): void {
    this.newBranchForm.reset()
    this.onCancel.emit();
  }
}
