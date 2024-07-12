import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { CodeReviewService } from "src/app/core/service/code-review.service";
import { CollabService, getFileNameFromDocID } from "src/app/core/service/collab.service";

@Component({
  selector: "app-code-review-popup",
  templateUrl: "./code-review-popup.component.html",
  styleUrls: ["./code-review-popup.component.scss"],
})
export class CodeReviewPopupComponent {
  @Input() public visible: boolean = false;
  @Input() public position: { x: number; y: number } = { x: 0, y: 0 };
  @Input() public selection: monaco.Selection;
  @Output() public onCancel: EventEmitter<void> = new EventEmitter<void>();

  public codeReviewForm: any;
  public comment: string = "";

  constructor(
    private formBuilder: UntypedFormBuilder,
    private codeReviewService: CodeReviewService,
    private collabService: CollabService
  ) {

  }

  ngOnInit(): void {
    this.codeReviewForm = this.formBuilder.group({
      comment: [this.comment, Validators.required],
    });
  }

  public async onSubmit() {
    await this.codeReviewService.createCodeReview(this.codeReviewForm.value.comment, this.selection);
    this.codeReviewForm.reset()
    this.onCancel.emit();

    const reviews = await this.collabService.getCodeReviews();

    this.codeReviewService.reviews = reviews.map((review) => {
      const fileName = getFileNameFromDocID(review.id);

      return {
        id: review.id,
        unopened: Object.values(review.reviews)?.reduce(
          (acc, curr) => !curr.opened && acc + 1,
          0
        ),
        fileName,
        reviews: Object.keys(review.reviews).map((reviewID) => ({
          ...review.reviews[reviewID],
          id: reviewID,
        })),
      };
    });

    if (this.codeReviewService.openedFile) {
      this.codeReviewService.openedFile = this.codeReviewService.reviews.find(
        (review) => review.id === this.codeReviewService.openedFile.id
      );
    }
  }

  public onClose(): void {
    this.codeReviewForm.reset()
    this.onCancel.emit();
  }
}
