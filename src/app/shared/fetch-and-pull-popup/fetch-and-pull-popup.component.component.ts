import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-fetch-and-pull-popup",
  templateUrl: "./fetch-and-pull-popup.component.html",
  styleUrls: ["./fetch-and-pull-popup.component.scss"],
})
export class FetchAndPullPopupComponent {
  @Input() public visible: boolean = false;
  @Output() public onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onCreate: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
  }

  public async onSubmit() {
    this.onCreate.emit();
    this.onCancel.emit();
  }

  public onClose(): void {
    this.onCancel.emit();
  }
}
